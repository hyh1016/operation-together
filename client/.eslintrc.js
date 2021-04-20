module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'prettier/prettier': ['error'],
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
    'no-use-before-define': 0,
    'no-nested-ternary': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [
          ['@', './src'],
          ['@components', './src/components'],
        ],
      },
    },
  },
};
