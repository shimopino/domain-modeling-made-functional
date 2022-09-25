/** @type {import('eslint/lib/shared/types').ConfigData} */
export default {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'neverthrow'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'neverthrow/must-use-result': 'error',
  },
};
