module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["jest", "cypress", "prettier"],
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": ["error"],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-console": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
