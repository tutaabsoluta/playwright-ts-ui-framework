import { test } from "../../fixtures/existingUser.fixture";

import { env } from '../../env'
import { expect } from "@playwright/test";

test.describe('Login flow', () => {
    test('Should login successfully with valid credentials', async ({ page, testUser }) => {
        await page.goto('https://automationexercise.com/');
        const signUpLink = await page.locator('[href="/login"]');
        await signUpLink.click();

        // login
        const emailInput = page.locator('[data-qa="login-email"]');
        await emailInput.fill(testUser.email)

        const passwordInput = page.locator('[data-qa="login-password"]');
        await passwordInput.fill(testUser.password)

        const loginCta = page.locator('[data-qa="login-button"]')
        await loginCta.click();

        const loggedInAsLink = page.locator('.fa.fa-user');
        await expect(loggedInAsLink).toBeVisible();
    })
})