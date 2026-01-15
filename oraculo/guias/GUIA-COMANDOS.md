# 📚 Guia de Comandos do Oráculo

> Proveniência e Autoria: Este documento integra o projeto Oráculo (licença MIT).
> Última atualização: 03 de janeiro de 2026

Este guia descreve os comandos e flags **existentes** no CLI atual. Exemplos usam a forma recomendada para flags globais: `oraculo <flags-globais> <comando> <flags-do-comando>`.

## ✅ Pré-requisitos

- Node.js: verifique o `engines.node` no `package.json` (atualmente `>=24.0.4`).
- Para rodar sem instalar globalmente: `npm install && npm run build` e use `node dist/bin/index.js ...`.

## ⚙️ Flags globais

Estas flags pertencem ao binário principal e devem vir **antes** do subcomando:

```bash
oraculo --silence --export diagnosticar --json
```

- `-s, --silence`: reduz logs (útil em CI)
- `-v, --verbose`: logs detalhados (ignorado se `--silence`)
- `-e, --export`: gera relatórios (JSON/Markdown) quando suportado pelo fluxo
- `--export-full`: também gera o relatório JSON completo (pode ser grande)
- `--debug`: habilita modo debug
- `--scan-only`: varredura e priorização sem AST/técnicas (quando suportado)
- `--log-estruturado`: logging estruturado
- `--incremental` / `--no-incremental`: alterna análise incremental
- `--metricas` / `--no-metricas`: alterna coleta de métricas
- `--historico`: imprime resumo do histórico e sai
- `--limpar-historico`: limpa histórico e sai

## diagnosticar

Análise completa do repositório.

```bash
oraculo diagnosticar
oraculo diagnosticar --json
oraculo diagnosticar --full
oraculo diagnosticar --executive
```

### Flags do comando

- `--json`, `--json-ascii`
- `--full`, `--compact`, `--executive`
- `--log-level <nivel>`: `erro|aviso|info|debug`
- `-g, --guardian-check`: roda verificação do Guardian no diagnóstico
- `--include <padrao>` (repetível), `--exclude <padrao>` (repetível), `--exclude-tests`
- `--fast`, `--trust-compiler`, `--verify-cycles`
- `--listar-analistas`
- `--criar-arquetipo`, `--salvar-arquetipo`
- Auto-fix:
  - `--auto-fix`, `--auto-fix-mode <modo>` (`conservative|balanced|aggressive`)
  - `--auto-fix-conservative`, `--fix`, `--fix-safe`
  - `--show-fixes` (mostra o que existe sem aplicar)

```bash
oraculo diagnosticar --fix-safe
oraculo diagnosticar --show-fixes
```

## guardian

Integridade por baseline/diff.

```bash
oraculo guardian
oraculo guardian --diff
oraculo guardian --json
```

- `-d, --diff`: mostra/valida alterações
- `-a, --accept-baseline`: aceita baseline atual (não permitido com `--full-scan`)
- `--full-scan`: ignora `GUARDIAN_IGNORE_PATTERNS` (não persiste baseline)
- `--json`: saída estruturada

```bash
oraculo guardian --diff --json
oraculo guardian --accept-baseline
```

## podar

Remove arquivos órfãos. Por padrão **pede confirmação**.

```bash
oraculo podar
oraculo podar --force
```

- `-f, --force`: remove sem confirmação (cuidado)
- `--include <padrao>` (repetível), `--exclude <padrao>` (repetível)

## reestruturar

Calcula e (opcionalmente) aplica um plano de reorganização.

```bash
oraculo reestruturar --somente-plano
oraculo reestruturar --auto
```

- `--somente-plano`: apenas mostra/exporta o plano (dry-run)
- `-a, --auto` (ou `--aplicar`): aplica sem perguntar
- `--preset <nome>`: `oraculo|node-community|ts-lib`
- `--domains`, `--flat`
- `--prefer-estrategista`
- `--categoria <chave=valor>` (repetível)

## atualizar

Atualiza o Oráculo após checar integridade.

```bash
oraculo atualizar
oraculo atualizar --global
```

## analistas

Lista analistas registrados.

```bash
oraculo analistas
oraculo analistas --json
oraculo analistas --doc docs/ANALISTAS.md
oraculo analistas --output .oraculo/analistas.json
```

## metricas

Mostra histórico de execuções e agregados.

```bash
oraculo metricas
oraculo metricas --json
oraculo metricas --limite 50
oraculo metricas --analistas
oraculo metricas --export metricas.json
```

## fix-types

Detecta e corrige tipos inseguros.

```bash
oraculo fix-types --dry-run
oraculo fix-types --target src --confidence 90
oraculo fix-types --interactive
```

- `--dry-run`
- `--target <path>`
- `--confidence <number>`
- `--verbose`, `--interactive`
- `--export`
- `--include <padrao>` (repetível), `--exclude <padrao>` (repetível)

## formatar

Aplica formatação nos arquivos suportados. Este comando existe para padronizações “mínimas” e/ou
para **harmonizar com o Prettier do projeto** (evitando divergência do tipo “um formatador desfaz o outro”).

```bash
oraculo formatar --check
oraculo formatar --write

# Preferir o Prettier do projeto (recomendado quando você já usa Prettier/ESLint)
oraculo formatar --engine prettier --write

# Auto (padrão): tenta Prettier do projeto; se não existir, cai no interno
oraculo formatar --engine auto --check
```

### Flags do comando

- `--check` (default) / `--write`
- `--include <padrao>` (repetível), `--exclude <padrao>` (repetível)
- `--engine <engine>`: `auto|interno|prettier`
  - `auto`: tenta usar o Prettier resolvido a partir do diretório do projeto (respeita `.prettierrc`, `prettier` no `package.json` e `.editorconfig`); se não houver Prettier, cai no motor interno.
  - `interno`: usa apenas o formatador mínimo do Oráculo.
  - `prettier`: exige Prettier disponível no projeto (senão não altera e reporta como não aplicável).

### Variável de ambiente

Você pode fixar o engine via env:

```bash
export ORACULO_FORMAT_ENGINE=prettier
oraculo formatar --write
```

## perf

Baseline e comparação de performance sintética.

```bash
oraculo perf --dir docs/perf baseline
oraculo perf --dir docs/perf compare
oraculo perf --dir docs/perf --json compare
```

- `-d, --dir <dir>`: diretório de snapshots
- `-j, --json`: saída JSON
- `-l, --limite <n>`: limite de regressão (%) (default 30)

## reverter

Gerencia o mapa de reversão para moves aplicados.

```bash
oraculo reverter listar
oraculo reverter arquivo src/foo.ts
oraculo reverter move <id>
oraculo reverter status
oraculo reverter limpar --force
```

## 🧩 Variáveis de ambiente (padrão ORACULO\_\*)

O carregamento de env segue o padrão `ORACULO_<CHAVE_DO_CONFIG>`.

Exemplos comuns:

```bash
export ORACULO_WORKER_POOL_MAX_WORKERS=4
export ORACULO_ANALISE_TIMEOUT_POR_ANALISTA_MS=60000
export ORACULO_LOG_LEVEL=debug

# segurança

export ORACULO_ALLOW_EXEC=0
export ORACULO_ALLOW_PLUGINS=0
```

```bash
# Aumentar timeout

oraculo diagnosticar --timeout 120

# Via variável

export ORACULO_ANALISE_TIMEOUT_POR_ANALISTA_MS=120000
oraculo diagnosticar
```

### Performance Lenta

```bash
# Reduzir workers

export WORKER_POOL_MAX_WORKERS=1
oraculo diagnosticar

# Restringir escopo

oraculo diagnosticar --include "src/**" --exclude "**/*.test.*"
```

---

## 📖 Referências

- [README Principal](../README.md)
- [Sistema de Type Safety](TYPE-SAFETY-SYSTEM.md)
- [Filtros Include/Exclude](GUIA_FILTROS_ORACULO.md)
- [Configuração Local](CONFIGURAR-ORACULO-LOCAL.md)

---

**Última atualização:** 29 de novembro de 2025
**Versão:** 1.0.0
