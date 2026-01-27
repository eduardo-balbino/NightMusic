# ⚙️ Guia de Configuração do Oráculo

> Proveniência e Autoria: Este documento integra o projeto Oráculo (licença MIT).
> Última atualização: 03 de janeiro de 2026

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquivos de Configuração](#arquivos-de-configuração)
3. [Variáveis de Ambiente](#variáveis-de-ambiente)
4. [Filtros Include/Exclude](#filtros-includeexclude)
5. [Configuração Granular de Regras](#configuração-granular-de-regras)
6. [Configuração por Ambiente](#configuração-por-ambiente)
7. [Exemplos Práticos](#exemplos-práticos)
8. [Troubleshooting](#troubleshooting)

---

## Visão Geral

O Oráculo oferece um sistema flexível de configuração que permite adaptar a análise às necessidades específicas de cada projeto. A configuração pode ser feita através de:

- **Arquivos JSON** - Configuração persistente e versionável
- **Variáveis de ambiente** - Configuração dinâmica para CI/CD
- **Flags de linha de comando** - Configuração por execução

### Ordem de Precedência

A ordem de precedência (maior para menor prioridade):

1. **Argumentos CLI** - `--timeout 60`
2. **Variáveis de ambiente** - `ORACULO_ANALISE_TIMEOUT_POR_ANALISTA_MS=60000`
3. **oraculo.config.json** - Configuração local do projeto
4. **oraculo.config.safe.json** - Configurações de segurança
5. **Valores padrão do código** - Defaults internos

---

## Arquivos de Configuração

### 1. oraculo.config.json (Principal)

Arquivo de configuração principal na raiz do projeto.

```json
{
  "INCLUDE_EXCLUDE_RULES": {
    "globalExcludeGlob": [
      "node_modules/**",
      "**/node_modules/**",
      "dist/**",
      "coverage/**",
      "build/**",
      "**/*.log",
      "**/*.lock"
    ],
    "globalInclude": [],
    "globalExclude": [],
    "dirRules": {}
  },
  "ESTRUTURA_ARQUIVOS_RAIZ_MAX": 50,
  "REPO_ARQUETIPO": "meu-projeto",
  "STRUCTURE_AUTO_FIX": false,
  "REPORT_EXPORT_ENABLED": false,
  "coverageGate": {
    "lines": 80,
    "functions": 80,
    "branches": 75,
    "statements": 80
  },
  "TYPE_SAFETY": {
    "enabled": true,
    "strictMode": false,
    "autoFixMode": "conservative",
    "skipLegitimate": true,
    "confidenceThreshold": 95
  }
}
```

#### Campos Principais

| Campo                         | Tipo    | Descrição                                |
| ----------------------------- | ------- | ---------------------------------------- |
| `INCLUDE_EXCLUDE_RULES`       | object  | Controle de arquivos incluídos/excluídos |
| `ESTRUTURA_ARQUIVOS_RAIZ_MAX` | number  | Máximo de arquivos raiz exibidos         |
| `REPO_ARQUETIPO`              | string  | Arquétipo base do repositório            |
| `STRUCTURE_AUTO_FIX`          | boolean | Ativa correções automáticas estruturais  |
| `REPORT_EXPORT_ENABLED`       | boolean | Permite export de relatórios             |
| `coverageGate`                | object  | Limiares de cobertura de testes          |
| `TYPE_SAFETY`                 | object  | Configurações do sistema de type-safety  |

### 2. oraculo.config.safe.json (Modo Seguro)

Configurações de segurança para ambientes de produção e CI/CD.

```json
{
  "SAFE_MODE": true,
  "ALLOW_PLUGINS": false,
  "ALLOW_EXEC": false,
  "ALLOW_MUTATE_FS": false,
  "STRUCTURE_AUTO_FIX": false,
  "productionDefaults": {
    "NODE_ENV": "production",
    "WORKER_POOL_MAX_WORKERS": 2,
    "REPORT_SILENCE_LOGS": true
  }
}
```

| Campo             | Valor Recomendado | Descrição                   |
| ----------------- | ----------------- | --------------------------- |
| `SAFE_MODE`       | `true`            | Ativa modo seguro global    |
| `ALLOW_PLUGINS`   | `false`           | Desabilita plugins externos |
| `ALLOW_EXEC`      | `false`           | Impede execução de comandos |
| `ALLOW_MUTATE_FS` | `false`           | Bloqueia modificações no FS |

### 3. oraculo.repo.arquetipo.json (Perfil do Repositório)

Define a estrutura esperada do projeto para análise de conformidade.

```json
{
  "arquetipoOficial": "cli-modular",
  "descricao": "Projeto personalizado",
  "estruturaPersonalizada": {
    "arquivosChave": ["package.json", "README.md", "tsconfig.json"],
    "diretorios": ["src", "tests", "docs"],
    "padroesNomenclatura": {
      "tests": "*.test.*"
    }
  }
}
```

---

## Variáveis de Ambiente

### Exemplo de arquivo .env

```bash
# === Performance e Paralelização ===

ORACULO_WORKER_POOL_ENABLED=true
ORACULO_WORKER_POOL_MAX_WORKERS=0
ORACULO_WORKER_POOL_BATCH_SIZE=10

# === Tempo de Análise ===

ORACULO_ANALISE_TIMEOUT_POR_ANALISTA_MS=30000

# === Logs e Saída ===

ORACULO_LOG_LEVEL=info              # erro | aviso | info | debug
ORACULO_LOG_ESTRUTURADO=false

# === Segurança ===

ORACULO_SAFE_MODE=0
ORACULO_ALLOW_PLUGINS=0
ORACULO_ALLOW_EXEC=0

# === Cobertura (CI) ===

COVERAGE_GATE_LINES=90
COVERAGE_GATE_FUNCTIONS=90
COVERAGE_GATE_BRANCHES=90
COVERAGE_GATE_STATEMENTS=90
```

---

## Filtros Include/Exclude

### Regras Fundamentais

1. **`--include` TEM PRIORIDADE** sobre `--exclude` e ignores padrão
2. **Múltiplos `--include`** funcionam como OR (união)
3. **Padrões glob** seguem sintaxe comum de glob e são avaliados via [micromatch](https://github.com/micromatch/micromatch)

### Sintaxe de Padrões Glob

| Padrão  | Significado                  | Exemplo                                     |
| ------- | ---------------------------- | ------------------------------------------- |
| `*`     | Qualquer coisa (exceto /)    | `*.js` = todos .js no nível atual           |
| `**`    | Qualquer coisa (incluindo /) | `src/**/*.ts` = todos .ts em src/ recursivo |
| `?`     | Um caractere                 | `file?.ts` = file1.ts, fileA.ts             |
| `[abc]` | Um de a, b ou c              | `file[123].ts` = file1.ts, file2.ts         |
| `{a,b}` | Alternativas                 | `*.{js,ts}` = .js ou .ts                    |

### Exemplos de Filtros CLI

```bash
# Apenas TypeScript

oraculo diagnosticar --include "**/*.ts" --include "**/*.tsx"

# Apenas código fonte

oraculo diagnosticar --include "src/**"

# Excluir testes

oraculo diagnosticar --exclude "**/*.test.*" --exclude "**/*.spec.*"

# Código TypeScript sem testes

oraculo diagnosticar \
  --include "src/**/*.ts" \
  --exclude "**/*.test.ts"

# Monorepo - apenas um pacote

oraculo diagnosticar --include "packages/my-package/**"
```

### Configuração de Filtros via JSON

```json
{
  "INCLUDE_EXCLUDE_RULES": {
    "globalExcludeGlob": ["node_modules/**", "dist/**", "coverage/**"],
    "globalInclude": ["src/**/*.ts", "lib/**/*.ts"],
    "globalExclude": ["**/*.test.ts"],
    "dirRules": {
      "src/legacy": {
        "exclude": ["**/*"]
      },
      "src/experimental": {
        "include": ["*.ts"],
        "exclude": ["*.test.ts"]
      }
    }
  }
}
```

---

## Configuração Granular de Regras

O sistema permite configurar regras de análise de forma granular:

### Estrutura de Regras

```json
{
  "rules": {
    "tipo-inseguro": {
      "severity": "error",
      "exclude": ["test/**/*", "**/*.test.ts"]
    },
    "arquivo-orfao": {
      "severity": "warning",
      "allowTestFiles": true
    }
  },
  "testPatterns": {
    "files": ["**/*.test.*", "**/*.spec.*", "test/**/*"],
    "allowAnyType": true,
    "excludeFromOrphanCheck": true
  }
}
```

### Propriedades de Regra

| Propriedade      | Tipo     | Descrição                                 |
| ---------------- | -------- | ----------------------------------------- |
| `severity`       | string   | `"error"`, `"warning"`, `"info"`, `"off"` |
| `exclude`        | string[] | Padrões glob para excluir                 |
| `allowTestFiles` | boolean  | Excluir automaticamente arquivos de teste |

### Casos de Uso

**Permitir `any` em testes:**

```json
{
  "testPatterns": {
    "allowAnyType": true
  },
  "rules": {
    "tipo-inseguro": {
      "exclude": ["**/*.test.ts", "tests/**/*"]
    }
  }
}
```

**Desabilitar regra para código legado:**

```json
{
  "rules": {
    "tipo-inseguro": {
      "exclude": ["src/legacy/**"]
    }
  }
}
```

**Severidade reduzida:**

```json
{
  "rules": {
    "arquivo-orfao": {
      "severity": "warning"
    }
  }
}
```

---

## Configuração por Ambiente

### Desenvolvimento Local

```bash
# .env.development

NODE_ENV=development
ORACULO_DEV=true
ORACULO_LOG_LEVEL=debug
ORACULO_WORKER_POOL_MAX_WORKERS=2
ORACULO_SAFE_MODE=0
```

### CI/CD

```bash
# .env.ci

NODE_ENV=production
ORACULO_REPORT_SILENCE_LOGS=true
ORACULO_LOG_ESTRUTURADO=true
ORACULO_WORKER_POOL_MAX_WORKERS=4
COVERAGE_GATE_LINES=90
COVERAGE_GATE_FUNCTIONS=90
```

### Produção

```bash
# .env.production

NODE_ENV=production
ORACULO_ALLOW_PLUGINS=0
ORACULO_ALLOW_EXEC=0
ORACULO_REPORT_SILENCE_LOGS=true
```

---

## Exemplos Práticos

### Setup Inicial do Projeto

```bash
# 1. Criar configuração básica

cat > oraculo.config.json << 'EOF'
{
  "INCLUDE_EXCLUDE_RULES": {
    "globalExcludeGlob": ["node_modules/**", "dist/**", "coverage/**"]
  },
  "REPO_ARQUETIPO": "meu-projeto",
  "coverageGate": {
    "lines": 80,
    "functions": 80,
    "branches": 75,
    "statements": 80
  }
}
EOF

# 2. Criar .env

cat > .env << 'EOF'
ORACULO_WORKER_POOL_MAX_WORKERS=0
ORACULO_LOG_LEVEL=info
EOF

# 3. Adicionar ao .gitignore

echo ".env" >> .gitignore
```

### Configuração para Monorepo

```json
{
  "INCLUDE_EXCLUDE_RULES": {
    "globalInclude": ["packages/*/src/**/*.ts"],
    "globalExclude": ["packages/*/dist/**"],
    "dirRules": {
      "packages/legacy": {
        "exclude": ["**/*"]
      }
    }
  }
}
```

### Configuração para TypeScript Strict

```json
{
  "TYPE_SAFETY": {
    "enabled": true,
    "strictMode": true,
    "autoFixMode": "conservative",
    "skipLegitimate": true,
    "confidenceThreshold": 100
  },
  "filtroConfig": {
    "tipo-inseguro-any": {
      "habilitado": true,
      "nivelPadrao": "erro"
    }
  }
}
```

---

## Troubleshooting

### Configuração Não Carregada

```bash
# Verificar se arquivo existe

ls -la oraculo.config.json

# Validar JSON

cat oraculo.config.json | jq .

# Debug de carregamento

DEBUG=config oraculo diagnosticar
```

### Conflito de Variáveis

```bash
# Listar variáveis atuais

env | grep ORACULO

# Limpar todas env vars do Oráculo

unset $(env | grep ORACULO | cut -d= -f1)
```

### Debug de Filtros

```bash
# Visualizar arquivos que serão analisados

oraculo --verbose --scan-only diagnosticar

# Modo debug mostra decisões de filtro

oraculo --debug --scan-only diagnosticar
```

### Armadilhas Comuns

```bash
# ❌ Errado - apenas nível raiz de src/

oraculo diagnosticar --include "src/*.ts"

# ✅ Correto - recursivo em src/

oraculo diagnosticar --include "src/**/*.ts"
```

---

## Referências

- [Guia de Comandos](GUIA-COMANDOS.md)
- [Sistema de Type Safety](../arquitetura/TYPE-SAFETY.md)
- [Segurança e Robustez](../arquitetura/SEGURANCA.md)

---

**Última atualização:** 29 de dezembro de 2025
**Versão:** 2.0.0
