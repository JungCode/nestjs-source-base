// @ts-check
import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import unicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    plugins: {
      perfectionist,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      unicorn: unicorn,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      // TypeScript interface & type keys
      'perfectionist/sort-interfaces': ['error', { type: 'natural' }],

      // JSX props
      'perfectionist/sort-jsx-props': ['error', { type: 'natural' }],

      'perfectionist/sort-object-types': ['error', { type: 'natural' }],

      // Object literal keys
      'perfectionist/sort-objects': ['error', { type: 'natural' }],
      'simple-import-sort/exports': 'error',

      // Import / export ordering
      'simple-import-sort/imports': 'error',

      // AUTO REMOVE UNUSED IMPORTS
      'unused-imports/no-unused-imports': 'error',

      // --- RECOMMENDED UNICORN RULES ---
      // Improve and optimize regular expressions
      'unicorn/better-regex': 'error',
      // Enforce explicit length check (e.g., arr.length > 0) instead of implicit truthiness
      'unicorn/explicit-length-check': 'error',
      // Enforce the use of 'new' for built-in objects like Array, Object, etc.
      'unicorn/new-for-builtins': 'error',
      // Use Array.isArray() instead of instanceof Array for better reliability
      'unicorn/no-instanceof-array': 'error',
      // Prevent confusing use of 'new Array()'
      'unicorn/no-new-array': 'error',
      // Use .find() instead of .filter()[0] for better performance and readability
      'unicorn/prefer-array-find': 'error',
      // Use .includes() instead of .indexOf() !== -1 for clearer intent
      'unicorn/prefer-includes': 'error',
      // Enforce 'node:' protocol when importing built-in Node.js modules (modern standard)
      'unicorn/prefer-node-protocol': 'error',
      // Use Number.parseInt instead of the global parseInt for stricter typing
      'unicorn/prefer-number-properties': 'error',
      // Use .slice() instead of the deprecated .substr() or .substring()
      'unicorn/prefer-string-slice': 'error',
      // Ensure 'Error' is always instantiated with 'new'
      'unicorn/throw-new-error': 'error',
    },
  },
);
