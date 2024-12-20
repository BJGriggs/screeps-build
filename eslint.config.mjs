import eslintPluginPrettier from 'eslint-plugin-prettier'
import typescriptEslintParser from '@typescript-eslint/parser'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'

export default [
  {
    files: ['src/**/*.{js,ts,tsx}'], // Files to lint
    ignores: ['node_modules', 'dist'], // Paths to ignore
    languageOptions: {
      parser: typescriptEslintParser, // Use the TypeScript parser
      parserOptions: {
        ecmaVersion: 'latest', // Use the latest ECMAScript version
        sourceType: 'module', // Enable ES modules
        project: './tsconfig.json', // Link to TypeScript config for type-checking
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin, // TypeScript rules
      prettier: eslintPluginPrettier, // Prettier integration
    },
    rules: {
      'no-unused-vars': 'warn', // General rule
      '@typescript-eslint/no-explicit-any': 'warn', // Warn on `any` usage
      'prettier/prettier': ['error', { singleQuote: true, semi: false }], // Enforce Prettier formatting
    },
  },
]
