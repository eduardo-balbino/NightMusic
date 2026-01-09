# Resumo do Trabalho: Migração e Centralização de Mensagens

> Proveniência e Autoria: Este documento integra o projeto Oráculo (licença MIT).
> Nada aqui implica cessão de direitos morais/autorais.
> Conteúdos de terceiros não licenciados de forma compatível não devem ser incluídos.
> Referências a materiais externos devem ser linkadas e reescritas com palavras próprias.

Data: 2025-11-30

## Objetivo

Unificar e centralizar todas as mensagens e ícones do CLI em `src/core/messages/`, substituir `console.log` por API de logs (`log.*`) nas saídas não-JSON, e reduzir strings hardcoded nos comandos, mantendo compatibilidade com modos de saída JSON/CI.

## Principais Mudanças

- Centralização de mensagens:
  - `src/core/messages/index.ts`: ponto único de re-export para log, ícones, cabeçalhos e catálogos de mensagens.
  - `src/core/messages/diagnostico-messages.ts`: criado/expandido com `ICONES_DIAGNOSTICO` e `CABECALHOS` (analistas, diagnóstico, reestruturar), além de utilitários de formatação.
  - `src/core/messages/fix-types-messages.ts`: catálogo de mensagens de sucesso/erro para fix-types.
- Padronização de logs nos comandos:
  - Troca de `console.log` por `log.*` em caminhos não-JSON.
  - Preservação de `console.log` somente quando a saída é explicitamente JSON (piping/CI).
- Atualizações em comandos:
  - `src/cli/commands/comando-analistas.ts`: uso de `ICONES_DIAGNOSTICO` e `CABECALHOS`.
  - `src/cli/commands/comando-reestruturar.ts`: substituição de placeholders por `CABECALHOS`.
  - `src/cli/commands/comando-diagnosticar.ts`: não-JSON via `log.info`, cabeçalhos centralizados.
  - `src/cli/commands/comando-fix-types.ts`: consumo de `MENSAGENS_SUCESSO`/`MENSAGENS_ERRO`.
  - `src/cli/commands/comando-metricas.ts` e `src/cli/commands/comando-perf.ts`: confirmada manutenção de `console.log` apenas para JSON; demais via `log.*`.
  - `src/cli/commands/comando-podar.ts`, `src/cli/commands/comando-atualizar.ts`, `src/cli/commands/comando-reverter.ts`: ajustes pontuais de logs e mensagens.

## Problemas Enfrentados e Soluções

- Importações cíclicas: corrigido no `messages/index.ts` reexportando `log` do módulo local.
- Ícones ausentes: adicionada importação/reexport de `ICONES_DIAGNOSTICO`.
- Strings hardcoded: migradas para `CABECALHOS` e catálogos específicos.

## Estado Atual

- Build: compila com sucesso.
- Lint: há pendências de ordenação/duplicidade de imports em arquivos do projeto (preexistentes). Alterações focaram em escopo de mensagens/logs.
- Saídas JSON: intactas para compatibilidade com CI/pipes.

## Itens Pendentes

- Varredura final de mensagens hardcoded em comandos secundários e relatórios.
- Sweep de lint (ordenar imports e evitar duplicidades) — preferencialmente segmentado por diretórios.

## Roteiro de Continuidade

1. Consolidar catálogos de mensagens por domínio (guardian, reverter, atualizar) em `messages/`.
2. Adotar `CABECALHOS` nos comandos restantes e relatórios.
3. Executar `eslint --fix` segmentado e revisar casos não corrigíveis automaticamente.

## Referências

- `src/core/messages/index.ts`
- `src/core/messages/diagnostico-messages.ts`
- `src/core/messages/fix-types-messages.ts`
- Comandos em `src/cli/commands/*`
