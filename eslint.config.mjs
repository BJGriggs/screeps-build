export default {
  root: true, // Specifies that this is the root ESLint configuration
  files: ['**/*.{js,ts,tsx}'], // Files to lint
  ignores: ['node_modules', 'dist'], // Paths to ignore
  languageOptions: {
    parser: '@typescript-eslint/parser', // Use the TypeScript parser
    parserOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      sourceType: 'module', // Enable ES modules
      project: './tsconfig.json', // Link to TypeScript config for type-checking
    },
  },
  plugins: {
    '@typescript-eslint': await import('@typescript-eslint/eslint-plugin'), // TypeScript rules
    prettier: await import('eslint-plugin-prettier'), // Prettier integration
  },
  rules: {
    'no-unused-vars': 'warn', // General rule
    '@typescript-eslint/no-explicit-any': 'warn', // Warn on `any` usage
    'prettier/prettier': ['error', { singleQuote: true, semi: false }], // Enforce Prettier formatting
  },
}
