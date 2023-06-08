module.exports = {
  extends: 'airbnb',
  plugins: [
    'jest', 'cypress',
  ],
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
