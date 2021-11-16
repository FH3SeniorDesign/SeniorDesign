module.exports = {
  root: true,
  extends: [
    "@react-native-community/eslint-config",
    "standard-with-typescript",
    "eslint-config-prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-native"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  env: {
    "react-native/react-native": true,
  },
  rules: {
    "no-unused-vars": "warn",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react-native/no-unused-styles": "warn",
    "react-native/no-inline-styles": "warn",
    "react-native/no-raw-text": "warn",
    "react-native/no-single-element-style-arrays": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/require-array-sort-compare": [
      "error",
      {
        ignoreStringArrays: true,
      },
    ],
    "eol-last": ["error", "always"],
    "no-multiple-empty-lines": "error",
    indent: ["error", 2],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
  },
};
