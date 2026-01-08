import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'frontend/assets/**'],
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      eqeqeq: 'error',
      curly: 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'double'],
      indent: ['error', 2],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-debugger': 'error',
    },
    languageOptions: {
      globals: {
        // Node.js
        process: 'readonly',
        console: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        // Browser
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        crypto: 'readonly',
        URL: 'readonly',
      },
    },
  },
];
