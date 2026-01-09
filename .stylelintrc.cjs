module.exports = {
  // Configuração mínima para evitar regras desconhecidas durante integração
  // Mantemos verificações essenciais e permitimos diretivas do Tailwind
  extends: [],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme'],
      },
    ],
  },
};
