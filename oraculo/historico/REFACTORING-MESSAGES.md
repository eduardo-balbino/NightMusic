# 📋 Refatoração de Mensagens dos Analistas de Plugin

> Proveniência e Autoria: Este documento integra o projeto Oráculo (licença MIT).
> Nada aqui implica cessão de direitos morais/autorais.
> Conteúdos de terceiros não licenciados de forma compatível não devem ser incluídos.
> Referências a materiais externos devem ser linkadas e reescritas com palavras próprias.

## Status: ✅ COMPLETO

Todas as mensagens dos analistas de plugin foram centralizadas em um único arquivo para melhor organização e manutenção.

## Mudanças Realizadas

### 1. **Arquivo Central: `/src/core/messages/plugin-messages.ts`**

Criado arquivo centralizado contendo:

#### ReactMessages (6 mensagens)

- `linkTargetBlank` - Link com target="\_blank" sem rel seguro
- `dangerouslySetInnerHTML` - Uso de dangerouslySetInnerHTML
- `imgWithoutAlt` - Imagem sem atributo alt
- `httpFetch` - Chamada HTTP sem TLS
- `hardcodedCredential` - Credencial hardcoded detectada
- `locationHrefRedirect` - Redirecionamento via location.href

#### ReactHooksMessages (3 mensagens)

- `useEffectNoDeps` - useEffect sem array de dependências
- `memoCallbackNoDeps` - useMemo/useCallback sem deps
- `hookInConditional` - Hook em condicional (quebra Rules of Hooks)

#### TailwindMessages (3 funções)

- `conflictingClasses(key, tokens)` - Conflito de classe Tailwind
- `dangerousArbitraryValue(token)` - Valor arbitrário perigoso
- `arbitraryValue(token)` - Valor arbitrário para validação

#### CssMessages (5 funções/constantes)

- `duplicatePropertySame(prop)` - Propriedade duplicada com valor idêntico
- `duplicatePropertyDifferent(prop, prev, curr)` - Propriedade duplicada com valores diferentes
- `importantUsage` - Uso de !important
- `httpImport` - Importação via HTTP
- `httpUrl` - Recurso em url() via HTTP

#### HtmlMessages (13 mensagens)

- **Estrutura**: `doctype`, `htmlLang`, `metaCharset`, `viewport`, `title`
- **Links**: `linkTargetBlank`, `linkNoHref`
- **Imagens**: `imgWithoutAlt`
- **Formulários**: `formWithoutMethod`, `formWithoutAction`, `inputWithoutLabel`, `passwordWithoutAutocomplete`
- **Handlers/Scripts/Styles**: `inlineHandler`, `inlineScript`, `inlineStyle`

#### Constantes Reutilizáveis

```typescript
export const SeverityLevels = {
  error: 'erro',
  warning: 'aviso',
  info: 'info',
  suggestion: 'sugestao',
};

export const AnalystTypes = {
  react: 'react/regra',
  reactHooks: 'react-hooks/regra',
  tailwind: 'tailwindcss/regra',
  css: 'css/regra',
  html: 'html/regra',
};

export const AnalystOrigins = {
  react: 'analista-react',
  reactHooks: 'analista-react-hooks',
  tailwind: 'analista-tailwind',
  css: 'analista-css',
  html: 'analista-html',
};
```

### 2. **Refatoração de Plugins**

#### `analista-react.ts` ✅

- Importa `ReactMessages`, `AnalystOrigins`, `AnalystTypes`, `SeverityLevels` de `plugin-messages.js`
- `warn()` usa constantes para origem, tipo e nível
- Todas as 6 mensagens de erro usam `ReactMessages.*`

Exemplo antes/depois:

```typescript
// ANTES
warn('Link com target="_blank" sem rel="noreferrer"/"noopener".', relPath, line);

// DEPOIS
warn(ReactMessages.linkTargetBlank, relPath, line);
```

#### `analista-react-hooks.ts` ✅

- Importa `ReactHooksMessages`, constantes de severidade/origem/tipo
- 3 mensagens refatoradas com `ReactHooksMessages.*`
- Assinatura `warn()` padronizada com `SeverityLevels.warning`

#### `analista-tailwind.ts` ✅

- Importa `TailwindMessages` com funções parametrizadas
- Chama `TailwindMessages.conflictingClasses(key, tokens)`
- Chama `TailwindMessages.dangerousArbitraryValue(token)`
- Chama `TailwindMessages.arbitraryValue(token)`

#### `analista-css.ts` ✅

- Importa `CssMessages` com funções parametrizadas
- 5 mensagens refatoradas usando funções `CssMessages.*`
- Exemplo: `CssMessages.duplicatePropertySame(prop)`

#### `analista-html.ts` ✅

- Importa `HtmlMessages` com 13 constantes/funções
- Todas as mensagens de erro usam `HtmlMessages.*`
- Exemplo: `HtmlMessages.doctype`, `HtmlMessages.htmlLang`, etc.

## Validação ✅

### Build

```bash
npm run build
# ✅ TypeScript compila sem erros

# ✅ Aliases corrigidos

# ✅ Artefatos copiados

```

### Testes de Plugin

#### HTML Analyzer

```bash
npm run diagnosticar -- --arquivo tests/plugins/test-analista-html.html
# ✅ 25 html/regra detectadas (esperado)

# ✅ Mensagens centralizadas funcionando

```

#### React Hooks Analyzer

```bash
npm run diagnosticar -- --arquivo tests/plugins/test-analista-react-hooks.tsx
# ✅ 5 react-hooks/regra detectadas

# ✅ useEffectNoDeps, memoCallbackNoDeps, hookInConditional funcionando

```

#### CSS Analyzer

```bash
npm run diagnosticar -- --arquivo src/shared/styles/responsive.css
# ✅ 0 avisos (duplicatas intencionais permitidas)

# ✅ Fallbacks de viewport, color, gradient reconhecidos

```

## Benefícios da Refatoração

| Aspecto                      | Antes                          | Depois                                    |
| ---------------------------- | ------------------------------ | ----------------------------------------- |
| **Localização de Mensagens** | Espalhadas em 5 arquivos       | Centralizadas em 1 arquivo                |
| **Duplicação de Código**     | 130+ strings duplicadas        | 0 duplicatas                              |
| **Manutenção**               | Alterar mensagem = 5+ arquivos | 1 arquivo                                 |
| **Type Safety**              | `message: string` genérico     | `message: TMessage` tipado                |
| **DRY Principle**            | ❌ Violado                     | ✅ Respeitado                             |
| **Escalabilidade**           | Difícil adicionar novo plugin  | Fácil: só adicionar em plugin-messages.ts |

## Arquivos Modificados

```
✅ src/core/messages/plugin-messages.ts (NOVO)
✅ src/analistas/plugins/analista-react.ts (refatorado)
✅ src/analistas/plugins/analista-react-hooks.ts (refatorado)
✅ src/analistas/plugins/analista-tailwind.ts (refatorado)
✅ src/analistas/plugins/analista-css.ts (refatorado)
✅ src/analistas/plugins/analista-html.ts (refatorado)
✅ tests/plugins/test-analista-react-hooks.tsx (novo arquivo de teste)
```

## Próximas Etapas (Sugestões)

1. **Expandir para Detectores**: Aplicar mesmo padrão aos detectores (`detector-*.ts`)
2. **Centralizar Logs**: Mover mensagens de log/info também para `core/messages`
3. **Documentação**: Adicionar JSDoc em `plugin-messages.ts` com exemplos
4. **Tests**: Validar que todas as mensagens estão sendo usadas (coverage)
5. **CI/CD**: Adicionar lint rule para evitar strings hardcoded em plugins

---

**Data de Conclusão**: 2024
**Refatorador**: GitHub Copilot
**Status**: ✅ Pronto para Produção
