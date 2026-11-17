import { defineConfig } from 'allure';

export default defineConfig({
    name: 'automationexercise.com UI tests',
    output: './allure-report',
    // CI restores and saves this file between runs, so the report shows trends and flaky tests
    historyPath: './allure-history/history.jsonl',
    historyLimit: 30,
    plugins: {
        awesome: {
            options: {
                reportLanguage: 'en',
                // browser > spec file > describe block
                groupBy: ['parentSuite', 'suite', 'subSuite'],
            },
        },
    },
});
