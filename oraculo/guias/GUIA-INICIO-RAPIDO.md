# 🚀 Guia de Início Rápido do Oráculo

> Proveniência e Autoria: Este documento integra o projeto Oráculo (licença MIT).
> Última atualização: 03 de janeiro de 2026

---

## O que é o Oráculo?

O **Oráculo** é uma ferramenta de linha de comando (CLI) para analisar, diagnosticar e manter projetos JavaScript/TypeScript. Ele identifica problemas de código, verifica integridade de arquivos e sugere melhorias estruturais.

---

## Instalação

### Opção 1: Instalação Global (Recomendada)

```bash
# Clone o repositório

git clone https://github.com/ossmoralus/oraculo.git
cd oraculo

# Instale as dependências e compile

npm install
npm run build

# Link global (permite usar 'oraculo' de qualquer diretório)

npm link
```

### Opção 2: Instalação Local

```bash
# No diretório do seu projeto

npm install --save-dev /caminho/para/oraculo

# Use via npx

npx oraculo diagnosticar
```

---

## Primeiro Diagnóstico

Execute o comando básico no diretório do seu projeto:

```bash
oraculo diagnosticar
```

O Oráculo irá:

1. 📁 **Varrer** todos os arquivos do projeto
2. 🔍 **Analisar** código em busca de problemas
3. 📊 **Exibir** um resumo com ocorrências encontradas

### Saída Típica

```
✅ Varredura concluída: 120 arquivos em 15 diretórios

📊 Resumo das 25 ocorrências:

  📋 Principais tipos:
     • problemas-teste: 18
     • tipo-inseguro-any: 4
     • problema-documentacao: 3

  📁 Top arquivos:
     • src/services/api.ts (5)
     • src/utils/helpers.ts (3)
     • tests/unit/api.test.ts (2)

✔ Diagnóstico concluído.
```

---

## Comandos Essenciais

### 1. Diagnóstico do Projeto

```bash
# Diagnóstico básico (modo compacto)

oraculo diagnosticar

# Diagnóstico detalhado

oraculo diagnosticar --full

# Apenas visualizar arquivos (sem análise)

oraculo --scan-only diagnosticar
```

### 2. Exportar Resultados

```bash
# Saída JSON para CI/CD

oraculo diagnosticar --json

# Exportar relatório para arquivo

oraculo --export diagnosticar
```

### 3. Filtrar Análise

```bash
# Analisar apenas pasta src/

oraculo diagnosticar --include "src/**"

# Excluir testes

oraculo diagnosticar --exclude "**/*.test.ts"

# Combinação

oraculo diagnosticar --include "src/**" --exclude "**/*.test.ts"
```

### 4. Correção Automática

```bash
# Ver correções disponíveis (sem aplicar)

oraculo diagnosticar --show-fixes

# Aplicar correções conservadoras

oraculo diagnosticar --fix-safe
```

### 5. Verificação de Integridade (Guardian)

```bash
# Criar baseline de hashes

oraculo guardian

# Verificar alterações

oraculo guardian --diff

# Aceitar alterações atuais

oraculo guardian --accept-baseline
```

---

## Configuração Rápida

### Criar arquivo de configuração

```bash
# Criar oraculo.config.json na raiz do projeto

cat > oraculo.config.json << 'EOF'
{
  "INCLUDE_EXCLUDE_RULES": {
    "globalExcludeGlob": [
      "node_modules/**",
      "dist/**",
      "coverage/**"
    ]
  },
  "coverageGate": {
    "lines": 80,
    "functions": 80,
    "branches": 75,
    "statements": 80
  }
}
EOF
```

### Suprimir falsos positivos

Use comentários inline para suprimir ocorrências específicas:

```typescript
// @oraculo-disable-next-line tipo-inseguro-any
const dados: any = respostaExterna;

// @oraculo-disable hardcoded-secrets
const configKey = "chave_configuracao_publica";
```

---

## Opções de Linha de Comando

### Flags Principais

| Flag          | Descrição                           |
| ------------- | ----------------------------------- |
| `--full`      | Modo detalhado com mais informações |
| `--compact`   | Modo compacto (padrão)              |
| `--json`      | Saída em formato JSON               |
| `--export`    | Exportar relatório para arquivo     |
| `--scan-only` | Apenas varrer arquivos, sem análise |

### Filtros

| Flag                 | Descrição                                 |
| -------------------- | ----------------------------------------- |
| `--include "padrão"` | Incluir arquivos que correspondem ao glob |
| `--exclude "padrão"` | Excluir arquivos que correspondem ao glob |
| `--exclude-tests`    | Excluir arquivos de teste                 |

### Correções

| Flag              | Descrição                                      |
| ----------------- | ---------------------------------------------- |
| `--auto-fix`      | Ativar correções automáticas                   |
| `--auto-fix-mode` | Modo: `conservative`, `balanced`, `aggressive` |
| `--dry-run`       | Preview das correções sem aplicar              |

### Níveis de Log

| Flag                | Descrição     |
| ------------------- | ------------- |
| `--log-level info`  | Nível padrão  |
| `--log-level debug` | Mais detalhes |
| `--log-level warn`  | Apenas avisos |
| `--log-level error` | Apenas erros  |

---

## Casos de Uso Comuns

### Integração com CI/CD

```yaml
# .github/workflows/oraculo.yml

name: Oráculo CI

on: [push, pull_request]

jobs:
  diagnostico:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "24"

      - name: Instalar Oráculo
        run: |
          npm install
          npm run build

      - name: Executar Diagnóstico
        run: npx oraculo --export diagnosticar --json
```

### Monorepo

```bash
# Analisar um pacote específico

oraculo diagnosticar --include "packages/my-package/**"

# Analisar múltiplos pacotes

oraculo diagnosticar \
  --include "packages/core/**" \
  --include "packages/utils/**"
```

### Código Legado

```json
// oraculo.config.json
{
  "rules": {
    "tipo-inseguro": {
      "exclude": ["src/legacy/**"]
    }
  }
}
```

---

## Próximos Passos

1. 📖 Leia o [Guia de Comandos](guias/GUIA-COMANDOS.md) completo
2. ⚙️ Configure o [Guia de Configuração](guias/GUIA-CONFIGURACAO.md)
3. 🔒 Entenda a [Segurança](arquitetura/SEGURANCA.md) do sistema
4. 🧪 Explore o [Sistema de Type Safety](arquitetura/TYPE-SAFETY.md)

---

## Ajuda Rápida

```bash
# Ver todos os comandos disponíveis

oraculo --help

# Ajuda de um comando específico

oraculo diagnosticar --help

# Listar analistas disponíveis

oraculo analistas --listar
```

---

## Problemas Comuns

### "Comando não encontrado"

```bash
# Certifique-se de ter feito o link global

npm link

# Ou use npx

npx oraculo diagnosticar
```

### "Muitos falsos positivos"

1. Use `--exclude` para filtrar arquivos de teste
2. Configure `testPatterns.allowAnyType: true` para testes
3. Use `// @oraculo-disable-next-line` para casos específicos

### "Análise muito lenta"

```bash
# Use modo rápido

oraculo diagnosticar --fast

# Limite o escopo

oraculo diagnosticar --include "src/**"

# Aumente workers (paralelização)

WORKER_POOL_MAX_WORKERS=4 oraculo diagnosticar
```

---

**Versão:** 0.2.0 | **Licença:** MIT
