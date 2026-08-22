import test from "@playwright/test";
import { env } from '../../env'

test.describe('Login flow', () => {
    test('Should login successfully with valid credentials', async ({ page }) => {
        await page.goto('https://automationexercise.com/');
        const signUpLink = await page.locator('[href="/login"]');
        await signUpLink.click();

        // login
        const emailInput = page.locator('[data-qa="login-email"]');
        await emailInput.fill(env.USER_MAIL)

        const passwordInput = page.locator('[data-qa="login-password"]');
        await passwordInput.fill(env.USER_PASSWORD)
    })
})