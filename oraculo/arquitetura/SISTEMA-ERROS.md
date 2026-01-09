# Sistema de Relatório de Erros Detalhado

> Proveniência e Autoria: Este documento integra o projeto Oráculo (licença MIT).
> Nada aqui implica cessão de direitos morais/autorais.
> Conteúdos de terceiros não licenciados de forma compatível não devem ser incluídos.
> Referências a materiais externos devem ser linkadas e reescritas com palavras próprias.

## Visão Geral

Sistema aprimorado de captura e relatório de erros que fornece **stack traces completos**, **contexto de arquivo** e **informações detalhadas** quando analistas falham durante a execução.

## Problema Resolvido

**Antes:**

```
❌ Erro no analista: tipo-inseguro
Detalhes: Análise falhou
```

**Depois:**

```
❌ Erro em 'detector-tipos-inseguros' para src/app.ts: TypeError: Cannot read property 'type' of undefined
Stack trace:
Error: TypeError: Cannot read property 'type' of undefined
    at analisarTipo (src/analistas/detectores/detector-tipos-inseguros.ts:145:21)
    at aplicar (src/analistas/detectores/detector-tipos-inseguros.ts:98:15)
    at executarAnalista (src/core/execution/executor.ts:420:35)
```

## Implementação

### 1. Captura de Stack Trace

Stack traces são agora capturados e armazenados em ocorrências de erro:

```typescript
// src/core/execution/executor.ts
catch (error) {
  const err = error as Error;

  ocorrencias.push(
    ocorrenciaErroAnalista({
      mensagem: `Falha na técnica '${tecnica.nome}' para ${entry.relPath}: ${err.message}`,
      relPath: entry.relPath,
      origem: tecnica.nome,
      stack: !isTimeout && err.stack ? err.stack : undefined,  // ✨ Novo
    }),
  );
}
```

### 2. Exibição Inteligente

Stack traces são exibidos apenas quando relevante:

```typescript
// Exibe stack trace em modo verbose ou debug
if (err.stack) {
  if (opts?.verbose || config.DEV_MODE) {
    log.info("Stack trace:");
    log.info(err.stack);
  }
}
```

### 3. Diferenciação de Erros

O sistema distingue entre diferentes tipos de falhas:

#### Erros de Análise

```typescript
❌ Erro em 'detector-seguranca' para src/auth.ts: ReferenceError: crypto is not defined
Stack trace: [completo]
```

#### Timeouts

```typescript
⏰ Timeout na técnica 'detector-complexidade' para src/large.ts: 30000ms excedido
[Sem stack trace - não é um erro de código]
```

### 4. Interface de Ocorrência

```typescript
// <typesDirectory>/comum/ocorrencias.ts (default: src/tipos)
export interface OcorrenciaErroAnalista extends OcorrenciaAnalista {
  tipo: "ERRO_ANALISTA";
  stack?: string; // ✨ Stack trace opcional
}

export function ocorrenciaErroAnalista(data: {
  mensagem: string;
  relPath: string;
  stack?: string; // ✨ Aceita stack trace
  origem?: string;
}): OcorrenciaErroAnalista;
```

## Uso

### Modo Normal

```bash
npm run diagnosticar
```

**Saída:** Mensagens de erro básicas (sem stack trace)

### Modo Verbose

```bash
npm run diagnosticar -- --verbose
```

**Saída:** Mensagens de erro + stack traces completos

### Modo Desenvolvimento

```bash
DEV_MODE=true npm run diagnosticar
```

**Saída:** Stack traces sempre exibidos

### Modo JSON

```bash
npm run diagnosticar -- --json > resultado.json
```

**Saída:** Stack traces incluídos no JSON quando disponíveis

```json
{
  "ocorrencias": [
    {
      "tipo": "ERRO_ANALISTA",
      "nivel": "erro",
      "mensagem": "Falha na técnica 'detector-tipos' para src/app.ts: TypeError",
      "relPath": "src/app.ts",
      "origem": "detector-tipos",
      "stack": "Error: TypeError\n    at analisar (detector-tipos.ts:42:10)\n    ..."
    }
  ]
}
```

## Benefícios

### Para Desenvolvedores

1. **Debugging Rápido**
   - Stack trace aponta diretamente para linha do erro
   - Contexto completo do caminho de execução

2. **Menos Tentativas e Erros**
   - Entende exatamente onde falhou
   - Identifica causa raiz imediatamente

3. **Melhor Suporte**
   - Pode compartilhar stack trace completo em issues
   - Facilita reprodução de problemas

### Para Mantenedores

1. **Diagnóstico Eficiente**
   - Identifica bugs em analistas rapidamente
   - Menos tempo investigando problemas reportados

2. **Qualidade de Issues**
   - Issues incluem informação necessária
   - Menos pedidos de "mais informações"

3. **Métricas de Confiabilidade**
   - Identifica analistas problemáticos
   - Prioriza correções baseado em frequência

## Exemplos Práticos

### Erro de Sintaxe no Código Analisado

```bash
$ npm run diagnosticar -- --verbose

❌ Erro em 'parser-js' para src/broken.ts: SyntaxError: Unexpected token
Stack trace:
SyntaxError: Unexpected token
    at Module._compile (node:internal/modules/cjs/loader:1198:18)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1252:10)
    at parse (src/analistas/parsers/parser-js.ts:89:12)
    at aplicar (src/analistas/detectores/detector-estrutura.ts:45:20)
```

### Null Reference em Analista

```bash
$ npm run diagnosticar -- --verbose

❌ Erro em 'detector-tipos-inseguros' para src/utils.ts: TypeError: Cannot read property 'type' of undefined
Stack trace:
TypeError: Cannot read property 'type' of undefined
    at analisarNo (src/analistas/detectores/detector-tipos-inseguros.ts:234:42)
    at visitarNos (src/analistas/detectores/detector-tipos-inseguros.ts:187:15)
    at aplicar (src/analistas/detectores/detector-tipos-inseguros.ts:98:10)
```

### Timeout (Sem Stack)

```bash
$ npm run diagnosticar -- --verbose

⏰ Timeout na técnica 'detector-duplicacoes' para src/massive.ts: 30000ms excedido
[Aviso] Considere aumentar ANALISE_TIMEOUT_POR_ANALISTA_MS ou usar --fast
```

## Configuração

### Ajustar Timeout

```json
// oraculo.config.json
{
  "ANALISE_TIMEOUT_POR_ANALISTA_MS": 60000 // 60 segundos
}
```

### Forçar Stack Traces

```bash
# Variável de ambiente

export DEV_MODE=true
npm run diagnosticar

# Ou inline

DEV_MODE=true npm run diagnosticar
```

### Desabilitar Stack Traces

```bash
# Modo normal (padrão)

npm run diagnosticar

# Ou explicitamente

VERBOSE=false npm run diagnosticar
```

## Testes

### Suite de Testes

```bash
npm test -- tests/auto/error-reporting.test.ts
```

**Cobertura:**

- ✅ Criação de ocorrências com stack trace
- ✅ Ocorrências sem stack (timeouts)
- ✅ Preservação de informações de origem
- ✅ Stack traces multi-nível
- ✅ Contexto de arquivo e linha

### Resultado

```
Test Files  1 passed (1)
Tests  8 passed (8)
```

## Comparação com Ferramentas Similares

| Ferramenta         | Stack Traces | Contexto de Arquivo | Modo Verbose |
| ------------------ | ------------ | ------------------- | ------------ |
| **Oráculo (novo)** | ✅           | ✅                  | ✅           |
| ESLint             | ✅           | ✅                  | ✅           |
| TypeScript         | ✅           | ✅                  | ⚠️ Limitado  |
| Oráculo (antigo)   | ❌           | ⚠️ Parcial          | ❌           |

## Próximos Passos

### Melhorias Futuras

1. **Source Maps**
   - Mapear stack trace para código TypeScript original
   - Mostrar linha do .ts ao invés do .js compilado

2. **Error Codes**

   ```
   ❌ [ORA-E001] Erro em 'detector-tipos-inseguros'...
   ```

   - Códigos de erro únicos
   - Link para documentação de erros

3. **Agregação de Erros**

   ```
   ❌ 5 arquivos falharam com mesmo erro:
   TypeError: Cannot read property 'type' of undefined
   Arquivos afetados: src/a.ts, src/b.ts, ...
   ```

4. **Análise de Padrões**
   - Detectar erros recorrentes
   - Sugerir correções baseado em histórico

## Documentação Relacionada

- [GUIA_COMANDOS.md](./GUIA_COMANDOS.md) - Comandos CLI
- [CONFIGURACAO-GRANULAR.md](./CONFIGURACAO-GRANULAR.md) - Configuração de regras
- [ROBUSTEZ_ORACULO.md](./ROBUSTEZ_ORACULO.md) - Tratamento de erros geral

## Contribuindo

Para melhorar o sistema de erros:

1. **Sempre capture stack traces**

   ```typescript
   try {
     // código
   } catch (error) {
     ocorrencias.push(
       ocorrenciaErroAnalista({
         mensagem: `Falha: ${(error as Error).message}`,
         relPath,
         stack: (error as Error).stack, // ✨ Importante
         origem: "meu-analista",
       })
     );
   }
   ```

2. **Mensagens descritivas**

   ```typescript
   // ❌ Ruim
   mensagem: "Erro";

   // ✅ Bom
   mensagem: `Falha ao analisar tipos em ${arquivo}: ${erro.message}`;
   ```

3. **Contexto relevante**
   ```typescript
   mensagem: `Falha em '${tecnica}' para ${arquivo} na linha ${linha}: ${erro}`;
   ```

---

**Implementado em:** Fase 6
**Problema resolvido:** #7 do feedback - Mensagens de erro genéricas
**Status:** ✅ Completo e testado
