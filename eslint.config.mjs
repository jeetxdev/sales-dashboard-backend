import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  // Ignore patterns for all files
  { ignores: ['**/.*', 'node_modules/', 'build/', 'drizzle/', 'coverage/'] },

  // Base JS configuration for all JavaScript files
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // TypeScript specific configuration
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // Include typescript-eslint recommended configuration
  ...tseslint.configs.recommended,

  // Apply prettier config to all files
  eslintConfigPrettier,
]);
