import test, { expect } from "@playwright/test";


test.describe('User registration', () => {
    test('Should register a new user successfully',async ({ page }) => {
        await page.goto('https://automationexercise.com/')
        const titleLocator = await page.locator('.logo.pull-left');
        await expect(titleLocator).toBeVisible();

        // sign up locator
        const signUpLink = await page.locator('[href="/login"]');
        await signUpLink.click();

        // register flow
        const signupNameTextbox = page.locator('[data-qa="signup-name"]');
        await signupNameTextbox.fill('Sergio');

        const emailInput = page.locator('[data-qa="signup-email"]');
        await emailInput.fill('sergio@mail.com')

        const signUpButton = page.locator('[data-qa="signup-button"]');
        await signUpButton.click();
        
        const signUpPageHeader = page.getByText('Enter Account Information');
        await expect(signUpPageHeader).toBeVisible();

        // set password
        const passwordInput = page.locator('[data-qa="password"]');
        await passwordInput.fill('password')

        // date of birth steps
        // day
        // const dayPicker = page.locator('#days');
        // await dayPicker.click();
        await page.locator('#days').selectOption({ value: '15' });

        // month
        await page.locator('#months').selectOption({ value: '1' })

        // year
        await page.locator('#years').selectOption({ value: '2020' })
    })
})