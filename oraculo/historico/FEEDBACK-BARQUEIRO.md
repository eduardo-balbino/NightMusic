# Feedback e Sugestões para Oráculo CLI

> Proveniência e Autoria: Este documento integra o projeto Oráculo (licença MIT).
> Nada aqui implica cessão de direitos morais/autorais.
> Conteúdos de terceiros não licenciados de forma compatível não devem ser incluídos.
> Referências a materiais externos devem ser linkadas e reescritas com palavras próprias.

**Data:** 01/12/2025
**Projeto:** Barqueiro (Discord Bot)
**Versão do Oráculo:** 0.2.0

---

## 📊 Resumo Geral

O Oráculo foi uma ferramenta **muito útil** para identificar problemas de qualidade no código. Conseguimos reduzir de **301 para 93 ocorrências** (69% de redução) em algumas iterações. A ferramenta tem grande potencial, mas precisa de ajustes para reduzir falsos positivos.

**Pontos Fortes:**

- ✅ Interface clara e amigável no terminal
- ✅ Modo `--json` funciona bem para automação
- ✅ Categorização de problemas (segurança, documentação, testes)
- ✅ Detecção de tipos inseguros (`any`, `unknown`)
- ✅ Sugestões de reestruturação (mesmo que nem sempre aplicáveis)
- ✅ Performance excelente (60 arquivos em ~0.3s)

---

## 🐛 Falsos Positivos Críticos

### 1. **Hardcoded Secrets - Linha `squad_role_`**

**Arquivo:** `src/storage/config-mod.ts:224`
**Problema reportado:** `hardcoded-secrets` (nível: erro/crítico)

```typescript
const configKey = `squad_role_${squadType.toLowerCase()}`;
```

**Por que é falso positivo:**

- É uma string template para **chave de configuração dinâmica**
- Não contém nenhum segredo real (senha, token, API key)
- O padrão `_role_` é apenas parte da nomenclatura interna

**Sugestão de melhoria:**

- Adicionar heurística: se a string está em template literal com interpolação, reduzir severidade
- Ignorar padrões como `${variavel}` que claramente são dinâmicos
- Comentário `@oraculo-disable-next-line` deveria funcionar (não funcionou no teste)

---

### 2. **Unhandled Async em Event Handlers do Discord.js**

**Arquivos:** Múltiplos handlers (`admin.ts`, `config-canais.ts`, `embed.ts`, etc)
**Problema reportado:** `unhandled-async` (nível: aviso)

**Contexto:**

```typescript
collector.on('collect', async (i) => {
  await i.deferUpdate();
  // ... código ...
});
```

**Por que muitos são falsos positivos:**

- Discord.js **event handlers** (`on`, `once`) são fire-and-forget por design
- Não há como/necessidade de aguardar promises em listeners de eventos
- O próprio Discord.js trata erros internamente

**Sugestão de melhoria:**

- Detectar contexto de event listeners (`on`, `once`, `addEventListener`)
- Reduzir severidade ou criar categoria específica "async-event-listener"
- Sugerir `.catch()` apenas quando faz sentido (não em todos os casos)

---

### 3. **Magic Constants - Limites do Discord.js**

**Arquivos:** Vários handlers
**Problema reportado:** `magic-constants`

**Exemplos:**

```typescript
.slice(0, 25)  // Limite de opções em SelectMenu
.slice(0, 90)  // Limite de caracteres em label
.slice(0, 10)  // Limite de fields em embed
```

**Por que são falsos positivos:**

- São **limitações da API do Discord** (documentadas oficialmente)
- Criar constantes como `DISCORD_SELECT_MAX_OPTIONS = 25` é verboso demais
- Todo desenvolvedor Discord.js conhece esses limites

**Sugestão de melhoria:**

- Adicionar whitelist de limites conhecidos de APIs populares (Discord.js, Stripe, AWS SDK)
- Detectar quando número está em `.slice()`, `.take()`, `.limit()` com contexto de API
- Permitir configurar limites ignorados via `.oraculorc.json`

---

## 🤔 Sugestões de Reestruturação Questionáveis

### Problema: Mover Tests para dentro de `src/`

**Sugestão do Oráculo:**

```
src/storage/channel-config.ts → src/config/channel-config.ts
test/storage/channel-config.test.ts → src/config/channel-config.test.ts
```

**Por que não aplicamos:**

- Convenção universal: **testes ficam em `test/` ou `__tests__/`** (separados do código)
- Estrutura espelhada (`src/storage/X.ts` + `test/storage/X.test.ts`) é mais clara
- Build systems geralmente excluem `test/` automaticamente
- Jest, Vitest, Mocha esperam testes separados

**Sugestão de melhoria:**

- Respeitar convenções estabelecidas (Jest, Vitest, etc)
- Sugerir reestruturação apenas quando **realmente** melhora
- Adicionar opção `--respect-conventions` para seguir padrões da ferramenta de teste detectada

---

## ✨ Sugestões de Novas Features

### 1. **Suporte a `.oraculorc.json` para Configuração**

```json
{
  "ignorePatterns": {
    "magic-constants": [25, 90, 100, 300000],
    "hardcoded-secrets": ["_role_", "_config_", "_key_"]
  },
  "severity": {
    "unhandled-async-in-event-handlers": "info"
  },
  "respectConventions": {
    "testFramework": "vitest",
    "testLocation": "separate"
  }
}
```

### 2. **Modo Interativo para Review de Ocorrências**

```bash
npm run diagnosticar -- --interactive
```

- Mostrar uma ocorrência por vez
- Perguntar: "É falso positivo? [y/N]"
- Gerar arquivo `.oraculoignore` automaticamente
- Similar ao `git add -p`

### 3. **Integração com TSConfig/ESLint**

- Ler `tsconfig.json` para entender aliases (`@/`, `@barqueiro/`)
- Ler `.eslintrc` para respeitar regras já configuradas
- Não reportar problemas que ESLint já pega

### 4. **Sugestões de Fix Automático Mais Inteligentes**

Exemplo atual:

```
❌ Magic constant: 25
```

Sugestão melhorada:

```
💡 Magic constant: 25
   → Extrair para: const DISCORD_SELECT_MAX_OPTIONS = 25
   → Ou adicionar comentário: .slice(0, 25) // Discord API limit
   → Ou ignorar: // @oraculo-ignore magic-constants
```

### 5. **Detecção de Contexto de Framework**

Se detectar Discord.js:

- Ignorar limites conhecidos (25, 100, 4000, etc)
- Reduzir severidade de unhandled-async em event handlers
- Sugerir padrões específicos do Discord.js

Se detectar Express:

- Validar middleware chains
- Detectar erro handlers sem 4 parâmetros

### 6. **Modo `--watch` para Desenvolvimento**

```bash
npm run diagnosticar -- --watch
```

- Rodar diagnóstico automaticamente ao salvar arquivos
- Mostrar apenas problemas **novos** desde última execução
- Integrar com VS Code (extension?)

---

## 📝 Melhorias de UX

### 1. **Output mais Compacto por Padrão**

Atual:

```
INFO    • vulnerabilidade-seguranca: 28
INFO    • problema-documentacao: 26
```

Sugestão:

```
🔐 28 vulnerabilidades  |  📚 26 documentação  |  🧪 36 testes
```

### 2. **Links para Documentação**

```
❌ hardcoded-secrets encontrado
   📖 Saiba mais: https://oraculo.dev/docs/hardcoded-secrets
   💡 Como corrigir: Use variáveis de ambiente
```

### 3. **Comparação com Execução Anterior**

```
📊 Resumo:
   Total: 93 problemas (-8 desde última execução)
   ✅ Resolvidos: 12
   ⚠️ Novos: 4
```

### 4. **Exportar para Markdown Melhorado**

O modo `--export` atual gera MD muito básico. Sugestão:

```markdown
# Relatório Oráculo - 01/12/2025

## 🎯 Métricas

| Categoria    | Quantidade | Tendência |
| ------------ | ---------- | --------- |
| Segurança    | 28         | ⬇️ -5     |
| Documentação | 26         | ➡️ 0      |

## 🚨 Prioridades

### 1. [CRÍTICO] Hardcoded Secret

**Arquivo:** src/storage/config.ts:224
**Código:**
\`\`\`typescript
const key = "squad*role*"
\`\`\`
**Sugestão:** Use variáveis de ambiente
```

---

## 🎨 Sugestões de Nomenclatura

### Melhorar Nomes de Categorias

- `problemas-teste` → `test-quality` (mais claro)
- `problema-documentacao` → `code-clarity` (mais abrangente)
- `vulnerabilidade-seguranca` → `security` (mais conciso)
- `tipo-literal-inline-complexo` → `complex-inline-types` (padrão internacional)

---

## 🔧 Bugs e Inconsistências

### 1. **Comentário `@oraculo-disable-next-line` não funciona**

Testamos:

```typescript
// @oraculo-disable-next-line hardcoded-secrets
const configKey = `squad_role_${squadType.toLowerCase()}`;
```

**Resultado:** Ainda reportou o problema

**Esperado:** Deveria ignorar a próxima linha

### 2. **Modo `--json` mistura logs com JSON**

Output tem linhas `INFO` antes do JSON válido, quebrando parse:

```
[12:43:59] INFO    Arquivos analisados: 60/60
{"ocorrencias": [...]}
```

**Sugestão:** Em modo `--json`, silenciar **todos** os logs, retornar apenas JSON puro

### 3. **Exit Code Inconsistente**

- Com avisos: exit code 1
- Ideal: exit code 0 para avisos, 1 para erros, 2 para críticos

---

## 🌟 Casos de Uso que Funcionaram Muito Bem

1. ✅ **Detecção de `any` types** - Encontrou 63 ocorrências, todas válidas
2. ✅ **Auto-fix de type assertions** - `npm run fix-types` funcionou perfeitamente
3. ✅ **Interfaces inline** - Detectou corretamente 2 tipos que deveriam estar em `src/tipos/`
4. ✅ **Performance** - Analisou 60 arquivos em 0.3s
5. ✅ **Categorização** - Separação clara entre segurança, documentação, testes

---

## 🎯 Prioridade de Implementação (Nossa Opinião)

### Alta Prioridade:

1. ⭐⭐⭐ Configuração via `.oraculorc.json`
2. ⭐⭐⭐ Corrigir `@oraculo-disable-next-line`
3. ⭐⭐⭐ Modo `--json` puro (sem logs)
4. ⭐⭐ Reduzir falsos positivos de `unhandled-async` em event handlers

### Média Prioridade:

5. ⭐⭐ Detecção de contexto de framework (Discord.js, Express, etc)
6. ⭐⭐ Modo interativo para review
7. ⭐ Output mais compacto e visual

### Baixa Prioridade:

8. ⭐ Integração com VS Code
9. ⭐ Modo `--watch`
10. ⭐ Links para documentação

---

## 💚 Agradecimentos

Apesar dos pontos de melhoria, o Oráculo **já é uma ferramenta valiosa**. Conseguimos:

- Limpar 69% dos problemas de qualidade
- Identificar interfaces que deveriam estar em arquivos de tipos
- Padronizar magic constants para valores reutilizáveis
- Remover 63 type assertions inseguras

**Parabéns pelo trabalho!** 🎉 Estamos ansiosos para ver as próximas versões.

---

## 📞 Contato

- **Projeto:** [github.com/ossmoralus/barqueiro](https://github.com/ossmoralus/barqueiro)
- **Feedback gerado em:** 01/12/2025
- **Versão analisada:** Oráculo CLI v0.2.0
