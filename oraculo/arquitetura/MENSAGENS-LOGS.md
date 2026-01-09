# Guia de Centralização de Mensagens e Logs

> Proveniência e Autoria: Este documento integra o projeto Oráculo (licença MIT).
> Nada aqui implica cessão de direitos morais/autorais.
> Conteúdos de terceiros não licenciados de forma compatível não devem ser incluídos.
> Referências a materiais externos devem ser linkadas e reescritas com palavras próprias.

Este guia documenta como produzir saídas consistentes no Oráculo usando os módulos centralizados de mensagens e a API de logs.

## Onde estão as mensagens

- Diretório: `src/core/messages/`
- Entrypoint: `src/core/messages/index.ts` (use para importar tudo)
- Componentes principais:
  - `log`: API de logging (info, aviso, erro, sucesso), adaptada ao contexto (CLI/CI)
  - `ICONES_DIAGNOSTICO`: catálogo de ícones/textos padronizados
  - `CABECALHOS`: cabeçalhos e textos comuns por seção (analistas, diagnóstico, reestruturar)
  - Catálogos específicos (ex: `fix-types-messages.ts`)

## Boas práticas

- Saídas JSON: use `console.log(JSON.stringify(...))` apenas quando a CLI tem flag JSON; não prefixe com `log.*`.
- Saídas não-JSON: sempre use `log.*`.
- Ícones e textos: prefira `ICONES_DIAGNOSTICO` e `CABECALHOS` em vez de strings embutidas.
- Importações: importe sempre de `@core/messages/index.js` para evitar ciclos.

## Exemplos

### Importação

```ts
import { log, ICONES_DIAGNOSTICO, CABECALHOS } from '@core/messages/index.js';
```

### Emissão não-JSON

```ts
log.info(`${ICONES_DIAGNOSTICO.info} ${CABECALHOS.diagnostico.flagsAtivas}`);
```

### Emissão JSON

```ts
if (opts.json) {
  console.log(JSON.stringify({ total, itens }, null, 2));
  return;
}
```

### Mensagens de sucesso/erro específicas

```ts
import { MENSAGENS_ERRO, MENSAGENS_SUCESSO } from '@core/messages/fix-types-messages.js';

log.sucesso(MENSAGENS_SUCESSO.analiseConcluida);
log.erro(MENSAGENS_ERRO.modulosNaoEncontrados(modulos));
```

## Checklist ao migrar um comando

- [ ] Trocar `console.log` por `log.*` em não-JSON
- [ ] Manter `console.log(JSON.stringify(...))` em JSON
- [ ] Substituir strings por `CABECALHOS`/catálogos
- [ ] Importar via `@core/messages/index.js`
- [ ] Validar build e rodar lint (idealmente com `--fix`)

## Próximos passos

- Expandir `CABECALHOS` para outros domínios (guardian, atualizar, reverter)
- Consolidar mensagens comuns de warning/info em catálogos
- Aplicar um sweep de lint para ordenar importações e remover duplicidades
