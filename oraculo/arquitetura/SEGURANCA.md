# 🛡️ Robustez e Segurança do Oráculo

> Proveniência e Autoria: Este documento integra o projeto Oráculo (licença MIT).
> Última atualização: 29 de novembro de 2025

## 📋 Visão Geral

O Oráculo implementa múltiplas camadas de segurança e robustez para garantir análises seguras e confiáveis em qualquer ambiente.

## 🔒 Modelo de Segurança

### Princípios Fundamentais

1. **Defense in Depth** - Múltiplas camadas de proteção
2. **Least Privilege** - Mínimos privilégios necessários
3. **Fail Secure** - Falhas seguras por padrão
4. **Input Validation** - Validação rigorosa de entradas
5. **Output Sanitization** - Sanitização de saídas

## 🎯 Modo Seguro (Safe Mode)

### Ativação

```bash
# Via flag

oraculo diagnosticar --safe-mode

# Via variável de ambiente

export SAFE_MODE=true
oraculo diagnosticar

# Via configuração

# oraculo.config.safe.json

{
  "SAFE_MODE": true
}
```

### Restrições do Modo Seguro

Quando `SAFE_MODE=true`:

- ❌ **Plugins externos desabilitados**
- ❌ **Execução de comandos bloqueada**
- ❌ **Modificações no filesystem limitadas**
- ❌ **Auto-fix estrutural desabilitado**
- ✅ **Apenas leitura e análise**
- ✅ **Relatórios JSON permitidos**

## 🔐 Sistema de Plugins

### Whitelist de Extensões

Apenas extensões aprovadas são carregadas:

```typescript
const EXTENSOES_PERMITIDAS = ['.js', '.mjs', '.cjs', '.ts'];
```

### Validação de Plugins

```typescript
// 1. Verificação de extensão
if (!EXTENSOES_PERMITIDAS.includes(ext)) {
  throw new Error('Extensão não permitida');
}

// 2. Sanitização de path
const safePath = path.normalize(pluginPath);
if (safePath.includes('..')) {
  throw new Error('Path traversal detectado');
}

// 3. Validação de contrato
if (!plugin.nome || !plugin.aplicar) {
  throw new Error('Plugin inválido');
}
```

### Exemplo de Plugin Seguro

```typescript
// plugins/meu-plugin.ts
import type { Analista } from '@tipos/tipos';

const plugin: Analista = {
  nome: 'meu-plugin',
  categoria: 'code-quality',
  descricao: 'Meu plugin seguro',

  test: (relPath: string) => {
    // Apenas leitura, sem side effects
    return relPath.endsWith('.ts');
  },

  aplicar: async (src: string, relPath: string) => {
    // Análise pura, sem modificações
    const problemas = analisarCodigo(src);
    return problemas.map((p) => ({
      tipo: 'meu-problema',
      nivel: 'aviso',
      mensagem: p.mensagem,
      relPath,
      linha: p.linha,
    }));
  },
};

export default plugin;
```

## 🛡️ Proteções de Filesystem

### Acesso Seguro

```typescript
import { lerEstado, salvarEstado } from '@shared/persistence/persistencia.js';

// ❌ NUNCA faça isso
import fs from 'fs';
fs.readFileSync('/etc/passwd');

// ✅ Use funções seguras
const dados = await lerEstado('meu-arquivo.json');
await salvarEstado('meu-arquivo.json', dados);
```

### Sanitização de Paths

```typescript
function sanitizePath(userPath: string): string {
  // Normaliza path
  const normalized = path.normalize(userPath);

  // Bloqueia path traversal
  if (normalized.includes('..')) {
    throw new Error('Path traversal não permitido');
  }

  // Resolve para absolute path
  const absolute = path.resolve(normalized);

  // Valida que está dentro do workspace
  const workspace = process.cwd();
  if (!absolute.startsWith(workspace)) {
    throw new Error('Acesso fora do workspace negado');
  }

  return absolute;
}
```

### Globs Seguros

```typescript
import { validateGlob } from '@shared/validation/validacao.js';

// Valida padrões glob antes de usar
function processGlob(pattern: string) {
  if (!validateGlob(pattern)) {
    throw new Error('Padrão glob inválido');
  }

  // Usa biblioteca segura
  const files = glob.sync(pattern, {
    cwd: process.cwd(),
    nodir: false,
    absolute: false,
  });

  return files;
}
```

## 🔍 Validação de Entrada

### Sanitização de Flags

```typescript
// src/shared/validation/validacao.ts
export function sanitizarFlags(flags: Record<string, unknown>): void {
  // Remove flags perigosos
  delete flags['eval'];
  delete flags['exec'];
  delete flags['script'];

  // Valida tipos
  if (flags.timeout && typeof flags.timeout !== 'number') {
    throw new Error('timeout deve ser número');
  }

  // Valida ranges
  if (flags.timeout && (flags.timeout < 0 || flags.timeout > 300)) {
    throw new Error('timeout fora do range permitido');
  }
}
```

### Validação de Argumentos

```typescript
import { validarNumeroPositivo } from '@shared/validation/validacao.js';

function processarTimeout(valor: unknown): number {
  const timeout = validarNumeroPositivo(valor, 'timeout');
  if (timeout === null) {
    throw new Error('timeout inválido');
  }
  return timeout;
}
```

## 📤 Sanitização de Saída

### Escape de Unicode

```typescript
import { stringifyJsonEscaped } from '@shared/helpers/json.js';

// Escapa caracteres não-ASCII
const jsonSeguro = stringifyJsonEscaped(dados, 2);

// Output: caracteres > U+007F são escapados como \uXXXX
// Exemplo: "😀" → "\ud83d\ude00"
```

### Sanitização de Logs

```typescript
import { stripLeadingSimbolos } from '@core/messages/log.ts';

// Remove símbolos potencialmente perigosos de logs
function logSeguro(mensagem: string) {
  const sanitizado = stripLeadingSimbolos(mensagem);
  console.log(sanitizado);
}
```

## ⏱️ Timeouts e Limites

### Timeout por Analista

```typescript
// Cada analista tem timeout individual
const TIMEOUT_PADRAO = 30000; // 30s

async function executarAnalistaComTimeout(analista: Analista, arquivo: string) {
  const timeout = process.env.ORACULO_ANALISE_TIMEOUT_POR_ANALISTA_MS || TIMEOUT_PADRAO;

  return Promise.race([
    analista.aplicar(arquivo),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout)),
  ]);
}
```

### Worker Pool Timeout

```typescript
// Workers têm timeout global
const WORKER_TIMEOUT = 30000; // 30s

// Configuração via env
export WORKER_POOL_TIMEOUT_MS=30000
```

### Heartbeat Monitoring

```typescript
// Workers enviam heartbeat para detectar travamentos
const HEARTBEAT_INTERVAL = 5000; // 5s

setInterval(() => {
  parentPort?.postMessage({ type: 'heartbeat' });
}, HEARTBEAT_INTERVAL);
```

## 🚦 Rate Limiting

### Limite de Arquivos

```typescript
const MAX_FILES = 10000;

function validarQuantidadeArquivos(files: string[]) {
  if (files.length > MAX_FILES) {
    throw new Error(`Máximo de ${MAX_FILES} arquivos permitido`);
  }
}
```

### Limite de Memória

```typescript
const MAX_MEMORY_MB = 512;

function monitorarMemoria() {
  const usage = process.memoryUsage();
  const usedMB = usage.heapUsed / 1024 / 1024;

  if (usedMB > MAX_MEMORY_MB) {
    throw new Error('Limite de memória excedido');
  }
}
```

## 🔐 Segurança em CI/CD

### Configuração Recomendada

```yaml
# .github/workflows/ci.yml

- name: Análise Oráculo
  run: |
    npm run build
    node dist/bin/index.js diagnosticar \
      --safe-mode \
      --json \
      --timeout 120
  env:
    SAFE_MODE: true
    ALLOW_PLUGINS: false
    ALLOW_EXEC: false
    REPORT_SILENCE_LOGS: true
    WORKER_POOL_MAX_WORKERS: 4
```

### Variáveis de Ambiente Seguras

```bash
# CI/CD environment variables

SAFE_MODE=true
ALLOW_PLUGINS=false
ALLOW_EXEC=false
ALLOW_MUTATE_FS=false
STRUCTURE_AUTO_FIX=false
NODE_ENV=production
```

## 🛡️ Proteção contra Ataques

### 1. Path Traversal

```typescript
// ❌ Vulnerável
const file = fs.readFileSync(userInput);

// ✅ Seguro
const safePath = sanitizePath(userInput);
const file = await lerEstado(safePath);
```

### 2. Command Injection

```typescript
// ❌ Vulnerável
exec(`git diff ${userBranch}`);

// ✅ Seguro
execFile('git', ['diff', userBranch]);
```

### 3. ReDoS (Regular Expression DoS)

```typescript
// ❌ Vulnerável - backtracking exponencial
const regex = /(a+)+$/;

// ✅ Seguro - sem backtracking
const regex = /a+$/;

// ✅ Com timeout
function safeRegexTest(pattern: RegExp, text: string, timeoutMs = 1000) {
  return Promise.race([
    Promise.resolve(pattern.test(text)),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Regex timeout')), timeoutMs)),
  ]);
}
```

### 4. Prototype Pollution

```typescript
// ❌ Vulnerável
function merge(target: any, source: any) {
  for (const key in source) {
    target[key] = source[key];
  }
}

// ✅ Seguro
function safeMerge(target: any, source: any) {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue; // Pula propriedades perigosas
      }
      target[key] = source[key];
    }
  }
}
```

## 🔍 Auditoria e Logging

### Logs Estruturados

```typescript
// Modo estruturado para análise
export LOG_ESTRUTURADO=true

// Output
{
  "timestamp": "2025-11-29T20:00:00.000Z",
  "level": "info",
  "message": "Análise iniciada",
  "context": {
    "arquivos": 100,
    "analistas": 15
  }
}
```

### Rastreamento de Ações

```typescript
function logAcao(acao: string, detalhes: Record<string, unknown>) {
  if (process.env.LOG_ESTRUTURADO === 'true') {
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        acao,
        ...detalhes,
      })
    );
  }
}
```

## 🧪 Testes de Segurança

### Testes de Sanitização

```typescript
describe('sanitização de paths', () => {
  it('bloqueia path traversal', () => {
    expect(() => sanitizePath('../../../etc/passwd')).toThrow('Path traversal não permitido');
  });

  it('bloqueia acesso fora do workspace', () => {
    expect(() => sanitizePath('/etc/passwd')).toThrow('Acesso fora do workspace negado');
  });
});
```

### Testes de Timeout

```typescript
describe('timeout de analistas', () => {
  it('cancela análise após timeout', async () => {
    const analistaLento = {
      aplicar: () => new Promise((resolve) => setTimeout(resolve, 60000)),
    };

    await expect(executarAnalistaComTimeout(analistaLento, 'file.ts')).rejects.toThrow('Timeout');
  });
});
```

## 📊 Métricas de Segurança

### Checklist de Segurança

- ✅ Modo seguro implementado
- ✅ Whitelist de plugins
- ✅ Sanitização de paths
- ✅ Validação de globs
- ✅ Timeouts configurados
- ✅ Rate limiting implementado
- ✅ Escape de unicode
- ✅ Proteção contra ReDoS
- ✅ Proteção contra prototype pollution
- ✅ Logs estruturados
- ✅ Testes de segurança

## 📖 Referências

### Documentação Relacionada

- [README Principal](../README.md)
- [Guia de Comandos](GUIA_COMANDOS.md)
- [Configuração Local](CONFIGURAR-ORACULO-LOCAL.md)

### Segurança Externa

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Snyk Security](https://snyk.io/learn/)

---

**Última atualização:** 29 de novembro de 2025
**Versão:** 1.0.0
