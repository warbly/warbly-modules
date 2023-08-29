module.exports = {
  env: {
    'node': true,
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  plugins: ['jest'],
  rules: {
    'quote-props': ['error', 'consistent'],
  },
  overrides: [
    {
      files: ['mocks/**/*.js'],
      rules: {
        'class-methods-use-this': 'off',
        'getter-return': 'off',
        'no-empty-function': 'off',
      },
    },
  ],
};
