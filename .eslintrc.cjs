module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "import", "unused-imports", "prettier", "check-file"],
  rules: {
    // Add custom rules here
  },
  ignorePatterns: [
    // ... any existing patterns ...
    "node_modules/*",
    "dist/*",
    "packages/*/dist/*",
    "packages/*/node_modules/*",
    "**/dist/*",
    "**/node_modules/*",
    "**/.eslintrc.js",
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
}; 