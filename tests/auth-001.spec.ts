import test, { expect } from "@playwright/test";


test.describe('Should Register a new User. Verify that a new user can successfully register', () => {
    test('Should do auth flow',async ({ page }) => {
        await page.goto('https://automationexercise.com/')
        const titleLocator = await page.locator('.logo.pull-left');
        await expect(titleLocator).toBeVisible();

        // sign up locator
        const signUpLink = await page.locator('[href="/login"]');
        await signUpLink.click();

        // register flow
        const signupNameTextbox = await page.locator('[data-qa="signup-name"]');
        await signupNameTextbox.fill('Sergio');

        const signupEmailAddress = await page.locator('[data-qa="signup-email"]');
        await signupEmailAddress.fill('sergio@mail.com')

        const signUpCta = await page.locator('[data-qa="signup-button"]');
        await signUpCta.click();
        
        const signUpPageHeader = await page.getByText('Enter Account Information')
        await expect(signUpPageHeader).toBeVisible();
    })
})