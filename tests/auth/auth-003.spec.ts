import { expect, test } from "@playwright/test";


test.describe('Invalid login flow', () => {
    test('Should fail the login with invalid credentials', async ({ page }) => {
        await page.goto('https://automationexercise.com/');

        const signUpLink = page.locator('[href="/login"]');
        await signUpLink.click();

        // login
        const emailInput = page.locator('[data-qa="login-email"]');
        await emailInput.fill('test@mail.com')

        const passwordInput = page.locator('[data-qa="login-password"]');
        await passwordInput.fill('password')

        const loginCta = page.locator('[data-qa="login-button"]')
        await loginCta.click();

        const errorMessage = page.locator('[style="color: red;"]')
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Your email or password is incorrect!')

    })
})