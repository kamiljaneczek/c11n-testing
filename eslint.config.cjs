const typescript = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const prettier = require("eslint-plugin-prettier");
const importPlugin = require("eslint-plugin-import");
const unusedImports = require("eslint-plugin-unused-imports");

module.exports = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,

      prettier: prettier,
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      ...typescript.configs["recommended"].rules,
    },
    ignores: [
      "node_modules/*",
      "dist/*",
      "packages/*/dist/*",
      "packages/*/node_modules/*",
      "**/dist/*",
      "**/node_modules/*",
      "**/.eslintrc.js",
      "prettier.config.js",
      "config/cucumber.js",
      ".cursorrules",
    ],
  },
];
