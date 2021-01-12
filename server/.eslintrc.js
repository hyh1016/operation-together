module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'linebreak-style': 0,
    'prettier/prettier': ['error'],
    'import/no-unresolved': 0,
    'import/extensions': 0,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
