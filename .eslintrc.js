module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'prettier'],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',

    // General ESLint rules
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 'off', // Allow console in Node.js
    'no-debugger': 'error',
    'no-duplicate-imports': 'error',
    'no-unused-expressions': 'error',
    'prefer-const': 'error',
    'no-var': 'error',

    // Code style rules
    'object-shorthand': 'error',
    'prefer-template': 'error',
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'coverage/',
    '*.js',
    '!.eslintrc.js',
    '!jest.config.js',
  ],
};
