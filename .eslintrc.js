module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "no-unused-expressions": "warn",
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
    "no-sequences": "warn",
  },
};
