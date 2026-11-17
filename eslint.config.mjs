// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
    {
        ignores: [
            'node_modules/',
            'playwright-report/',
            'test-results/',
            'blob-report/',
            'allure-results/',
            'allure-report/',
            'allure-history/',
        ],
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // A missing `await` on a Playwright action is the most common cause of flaky tests
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',
        },
    },
    {
        files: ['tests/**/*.ts'],
        ...playwright.configs['flat/recommended'],
        rules: {
            ...playwright.configs['flat/recommended'].rules,
            // Fixtures such as `loggedInUser` are requested only for their setup and may go unused
            '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
        },
    },
    {
        files: ['**/*.mjs'],
        extends: [tseslint.configs.disableTypeChecked],
    },
    prettier,
);
