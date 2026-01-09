# 🔒 Sistema de Type Safety do Oráculo

> Proveniência e Autoria: Este documento integra o projeto Oráculo (licença MIT).
> Documentação atualizada em: 29 de novembro de 2025

## 📋 Visão Geral

O Oráculo possui um sistema inteligente de detecção e correção de tipos inseguros (`any`, `unknown`) que:

1. **Detecta** uso de tipos inseguros no código TypeScript
2. **Categoriza** automaticamente se o uso é legítimo ou problemático
3. **Sugere** alternativas específicas baseadas no contexto
4. **Corrige** automaticamente quando solicitado (comando `fix-types`)

## 🎯 Arquitetura

### Componentes Principais

```
src/analistas/
├── detectores/
│   └── detector-tipos-inseguros.ts      # Detector principal
├── corrections/
│   ├── type-safety/
│   │   ├── context-analyzer.ts          # Análise contextual inteligente
│   │   ├── type-analyzer.ts             # Análise de tipos
│   │   └── index.ts                     # Exports públicos
│   └── quick-fixes/
│       ├── fix-any-to-proper-type.ts    # Correção de 'any'
│       └── fix-unknown-to-specific-type.ts # Correção de 'unknown'
```

### Fluxo de Processamento

```
1. DETECÇÃO
   ├─→ Scan do código fonte (regex + AST)
   ├─→ Identificação de padrões (: any, : unknown, as any, <any>)
   └─→ Filtragem de strings/comentários

2. ANÁLISE CONTEXTUAL
   ├─→ categorizarUnknown() / isAnyInGenericFunction()
   ├─→ Categorização: 'legitimo' | 'melhoravel' | 'corrigir'
   └─→ Nível de confiança: 0-100%

3. FILTRAGEM INTELIGENTE
   ├─→ Confiança ≥95% → PULAR (legítimo)
   ├─→ Confiança 60-94% → AVISO (melhorável)
   └─→ Confiança <60% → ERRO (corrigir)

4. CORREÇÃO (opcional, via --auto-fix)
   ├─→ Análise de uso da variável
   ├─→ Inferência de tipo específico
   └─→ Aplicação de quick-fix
```

## 🔍 Tipos de Detecção

### 1. Tipo Inseguro: `any`

**Padrão:** `: any`

**Categoria:** `tipo-inseguro-any`

**Contextos Detectados:**

| Contexto          | Exemplo                         | Sugestão                               |
| ----------------- | ------------------------------- | -------------------------------------- |
| Catch block       | `catch (error: any)`            | `catch (error: unknown)`               |
| Callback param    | `callback: (data: any) => void` | Definir interface do callback          |
| Event handler     | `onClick: (e: any) => void`     | `MouseEvent`, `KeyboardEvent`, etc     |
| Índice extensível | `[key: string]: any`            | `[key: string]: unknown` ou union type |
| Record            | `Record<string, any>`           | `Record<string, unknown>` ou interface |
| Array             | `Array<any>` ou `any[]`         | `string[]`, `CustomType[]`, etc        |

**Mensagens:**

```typescript
// Genérico
"Tipo 'any' em 'varName' desabilita verificação de tipos";
'💡 Analise uso da variável e defina tipo específico ou use unknown com type guards';

// Catch block
"'any' em catch block 'error' - TypeScript recomenda 'unknown'";
'💡 Substitua por: catch (error: unknown) { ... }';
```

### 2. Type Assertions: `as any`

**Padrão:** `as any`

**Categoria:** `tipo-inseguro-any-assertion`

**Nível:** `erro` (mais severo que declaração)

**Contextos:**

```typescript
// Retorno de função
const result = someFunction() as any;

// Propriedade
const value = obj.property as any;

// Parâmetro
someFunction(param as any);
```

**Mensagem:**

```
"Type assertion 'as any' desabilita verificação de tipos completamente"
"💡 Substitua por tipo específico ou use unknown com validação runtime"
"🚨 CRÍTICO: Type safety completamente desabilitado"
```

### 3. Angle Bracket Casting: `<any>`

**Padrão:** `<any>`

**Categoria:** `tipo-inseguro-any-cast`

**Nível:** `erro`

**Mensagem:**

```
"Type casting '<any>' (sintaxe legada) desabilita type safety"
"💡 Use sintaxe 'as' moderna e tipo específico"
"🚨 CRÍTICO: Migrar para sintaxe moderna e tipo correto"
```

### 4. Tipo Inseguro: `unknown`

**Padrão:** `: unknown`

**Categoria:** `tipo-inseguro-unknown`

**Sistema de Categorização Inteligente:**

#### Categorias de Confiança

| Categoria    | Confiança | Nível              | Ação                     |
| ------------ | --------- | ------------------ | ------------------------ |
| `legitimo`   | 95-100%   | info ou **pulado** | Uso correto de `unknown` |
| `melhoravel` | 60-94%    | aviso              | Pode ser mais específico |
| `corrigir`   | <60%      | erro               | Deve ser corrigido       |

#### Casos Legítimos (Confiança ≥95%)

Estes casos são **automaticamente pulados** pelo detector:

```typescript
// 1. Type Guards (100%)
function isString(obj: unknown): obj is string {
  return typeof obj === 'string';
}

// 2. Catch Blocks (100%)
catch (error: unknown) {
  // Padrão recomendado pelo TypeScript
}

// 3. Índice Extensível (100%)
interface Config {
  version: string;
  [key: string]: unknown;  // Permite propriedades adicionais
}

// 4. Record/Map Genéricos (100%)
const data: Record<string, unknown> = {};
const map: Map<string, unknown> = new Map();

// 5. Arrays Genéricos (100%)
const items: Array<unknown> = [];
const values: unknown[] = [];

// 6. Parâmetros Opcionais (95%)
function process(options?: unknown) { }

// 7. Serialização/Persistência (95%)
function saveData(dados: unknown) { }
function stringifyJson(value: unknown) { }

// 8. Validação (95%)
function validarNumero(v: unknown): number | null { }

// 9. Acesso Dinâmico Protegido (95%)
function safeGet<T, K>(obj: T, key: K): unknown { }

// 10. Replacer/Reviver JSON (95%)
const replacer = (key: string, value: unknown) => { };

// 11. Wrappers de AST/Parsing (95%)
function wrapAst(rawAst: unknown): BabelFile { }

// 12. Error Handling (95%)
function extrairMensagemErro(error: unknown): string { }

// 13. Mock/Test Utilities (95%)
const mockFn: (...args: unknown[]) => unknown;

// 14. CLI Framework Callbacks (95%)
function aplicarFlagsGlobais(opts: unknown) {
  // Commander.js não tipa, validar downstream
}

// 15. Type Assertions Compatibilidade (95%)
const fs = require('fs') as unknown as { writeFile?: unknown };
```

#### Casos Melhoráveis (60-94%)

Geram avisos com sugestões contextuais:

```typescript
// AST/Babel nodes (80%)
function parseFile(ast: unknown) {}
// 💡 import type { Node } from "@babel/types"

// Callbacks genéricos (70%)
function onChange(opts: unknown) {}
// 💡 Definir interface específica: OnChangeOptions

// Filter/Map (75%)
const filtered = items.filter((item: unknown) => {});
// 💡 Tipar array pai: items: Item[]

// Relatórios (70%)
interface Relatorio {
  data: unknown; // Melhorável
}
// 💡 Criar interface específica: RelatorioData
```

#### Casos a Corrigir (<60%)

Geram erros e devem ser corrigidos:

```typescript
// Guardian error details (90% confiança de ser erro)
interface GuardianResult {
  guardian: unknown; // ❌ Estrutura conhecida
}
// ✏️ Criar interface GuardianErrorDetails

// Contextos genéricos sem validação (60%)
function processData(input: unknown) {
  // Sem validação = perigoso
}
// ✏️ Adicionar type guard ou validação runtime
```

## 🛠️ Comandos e Uso

### 1. Diagnóstico Simples

```bash
# Ver todos os tipos inseguros

oraculo diagnosticar

# Focar apenas em tipos inseguros (any/unknown)

oraculo fix-types --dry-run
```

### 2. Análise Detalhada

```bash
# Modo completo com contexto

oraculo diagnosticar --full

# JSON estruturado para CI

oraculo diagnosticar --json

# Export de relatórios detalhados (JSON e Markdown) para pasta relatorios/

oraculo --export diagnosticar
```

### 3. Correção Automática

```bash
# Preview das correções disponíveis (não aplica)

oraculo diagnosticar --show-fixes

# Auto-fix conservador (mais seguro)

oraculo diagnosticar --auto-fix --auto-fix-mode conservative

# Auto-fix mais agressivo

oraculo diagnosticar --auto-fix --auto-fix-mode aggressive

# Comando dedicado fix-types

oraculo fix-types --interactive
```

### 4. Modo Interativo

```bash
# Escolher quais correções aplicar

oraculo fix-types --interactive

# Ajustar confiança mínima (0-100)

oraculo fix-types --interactive --confidence 90
```

## 📊 Métricas e Estatísticas

### Redução de Falsos Positivos

**Antes da otimização:**

- `tipo-inseguro-unknown`: 15 ocorrências
- Muitos falsos positivos (type guards, validações, etc)

**Depois da otimização:**

- `tipo-inseguro-unknown`: 7 ocorrências (53% de redução ✨)
- Apenas casos que realmente precisam de análise

### Padrões Detectados

| Padrão        | Categoria       | Total Detectado |
| ------------- | --------------- | --------------- |
| Type Guards   | Legítimo (100%) | ~8 casos        |
| Catch Blocks  | Legítimo (100%) | ~2 casos        |
| Record/Map    | Legítimo (100%) | ~2 casos        |
| Serialização  | Legítimo (95%)  | ~3 casos        |
| CLI Callbacks | Legítimo (95%)  | ~1 caso         |
| Melhoráveis   | Aviso (60-94%)  | ~7 casos        |

## 🔧 Configuração

### oraculo.config.json

```json
{
  "TYPE_SAFETY": {
    "enabled": true,
    "strictMode": false,
    "autoFixMode": "conservative",
    "skipLegitimate": true,
    "confidenceThreshold": 95
  },
  "filtroConfig": {
    "tipo-inseguro-any": {
      "habilitado": true,
      "nivelPadrao": "aviso",
      "categoria": "code-quality"
    },
    "tipo-inseguro-unknown": {
      "habilitado": true,
      "nivelPadrao": "info",
      "categoria": "code-quality"
    }
  }
}
```

### Variáveis de Ambiente

```bash
# Ativar/desativar detector

export TYPE_SAFETY_ENABLED=true

# Modo de auto-fix

export AUTO_FIX_MODE=conservative  # conservative|permissive

# Limiar de confiança para pular casos legítimos

export TYPE_SAFETY_CONFIDENCE_THRESHOLD=95

# Debug do sistema

export DEBUG_TYPE_SAFETY=true
```

## 📚 API e Extensibilidade

### Importar Funções

```typescript
import {
  categorizarUnknown,
  isAnyInGenericFunction,
  isUnknownInGenericContext,
  isInStringOrComment,
  extractVariableName,
} from '@analistas/corrections/type-safety/context-analyzer.js';

// Categorizar uso de unknown
const resultado = categorizarUnknown(codigoFonte, caminhoArquivo, linhaContexto);

console.log(resultado);
// {
//   categoria: 'legitimo' | 'melhoravel' | 'corrigir',
//   confianca: 95,
//   motivo: 'Type guard padrão TypeScript - unknown é a escolha correta',
//   sugestao?: 'Opcional: sugestão de melhoria',
//   variantes?: ['Opção 1', 'Opção 2']
// }
```

### Criar Quick-Fix Customizado

```typescript
import type { QuickFix } from '@tipos/analistas';

const meuQuickFix: QuickFix = {
  tipo: 'tipo-customizado',
  descricao: 'Minha correção',
  aplicar: async (ocorrencia, codigo) => {
    // Lógica de correção
    return {
      sucesso: true,
      codigoCorrigido: novoCodeigo,
      mensagem: 'Corrigido com sucesso',
    };
  },
};
```

## 🧪 Testes

### Executar Testes do Sistema

```bash
# Todos os testes de type-safety

npm test -- detector-tipos-inseguros
npm test -- context-analyzer
npm test -- fix-any-to-proper-type
npm test -- fix-unknown-to-specific-type

# Com cobertura

npm run coverage -- --grep "type-safety"
```

### Casos de Teste Importantes

```typescript
describe('categorizarUnknown', () => {
  it('detecta type guard como legítimo (100%)', () => {
    const codigo = 'function isX(obj: unknown): obj is X';
    const resultado = categorizarUnknown(codigo, 'file.ts', codigo);

    expect(resultado.categoria).toBe('legitimo');
    expect(resultado.confianca).toBe(100);
  });

  it('detecta catch block como legítimo (100%)', () => {
    const codigo = 'catch (error: unknown) {';
    const resultado = categorizarUnknown(codigo, 'file.ts', codigo);

    expect(resultado.categoria).toBe('legitimo');
    expect(resultado.confianca).toBe(100);
  });

  it('sugere melhorias para callbacks genéricos (70%)', () => {
    const codigo = 'function onChange(opts: unknown) {';
    const resultado = categorizarUnknown(codigo, 'file.ts', codigo);

    expect(resultado.categoria).toBe('melhoravel');
    expect(resultado.confianca).toBe(70);
    expect(resultado.sugestao).toBeDefined();
  });
});
```

## 🐛 Debug e Troubleshooting

### Logs Detalhados

```bash
# Ver decisões do categorizador

DEBUG_TYPE_SAFETY=true oraculo --verbose diagnosticar

# Ver regex matches

DEBUG_DETECTOR=true oraculo diagnosticar
```

### Problemas Comuns

#### 1. Muitos Falsos Positivos

**Problema:** Detector reporta casos legítimos como problemas

**Solução:**

```bash
# Verificar confiança dos casos

oraculo diagnosticar --filtro tipo-inseguro-unknown --full

# Ajustar threshold

export TYPE_SAFETY_CONFIDENCE_THRESHOLD=90
```

#### 2. Correção Automática Falha

**Problema:** Auto-fix não consegue inferir tipo

**Solução:**

```typescript
// Adicionar type annotation explícita
const data: MinhaInterface = parseData(input);

// Ou usar type guard
if (isMinhaInterface(data)) {
  // TypeScript infere automaticamente
}
```

#### 3. Performance Lenta

**Problema:** Análise de tipos está lenta

**Solução:**

```bash
# Reduzir escopo

oraculo diagnosticar --include "src/**/*.ts" --exclude "**/*.test.ts"

# Desabilitar análise profunda

export TYPE_SAFETY_DEEP_ANALYSIS=false
```

## 📖 Referências e Leituras Adicionais

### Documentação Relacionada

- [Guia de Comandos](GUIA_COMANDOS.md)
- [Sistema de Mensagens](../src/core/messages/README.md)
- [Analistas](../src/analistas/README.md)
- [Quick Fixes](../src/analistas/corrections/README.md)

### TypeScript Official

- [TypeScript Handbook - Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript - any vs unknown](https://www.typescriptlang.org/docs/handbook/2/any.html#unknown)
- [TypeScript - Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)

### Padrões e Best Practices

- Sempre prefira `unknown` a `any` quando tipo é desconhecido
- Use type guards para refinar tipos `unknown`
- Evite type assertions exceto quando absolutamente necessário
- Em catch blocks, sempre use `unknown` (padrão TypeScript 4.4+)
- Para objetos genéricos, use `Record<string, unknown>`

## 🎯 Roadmap e Melhorias Futuras

### Próximas Funcionalidades

- [ ] Auto-fix inteligente com Machine Learning
- [ ] Integração com Language Server Protocol (LSP)
- [ ] Sugestões baseadas em contexto de projeto
- [ ] Dashboard interativo de type-safety
- [ ] Plugin para VS Code
- [ ] Análise de drift de tipos ao longo do tempo

### Contribuindo

Para contribuir com melhorias no sistema de type-safety:

1. Leia [CONTRIBUTING.md](../CONTRIBUTING.md)
2. Adicione testes para novos padrões de detecção
3. Documente regras de categorização em `context-analyzer.ts`
4. Mantenha compatibilidade com sistema existente

---

**Última atualização:** 29 de novembro de 2025
**Versão do documento:** 1.0.0
**Autor:** Equipe Oráculo
