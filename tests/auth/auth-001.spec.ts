import { expect } from "@playwright/test";
import { test } from '../../fixtures/userFactory.fixture'

test.describe('User registration', () => {
    test('Should register a new user successfully', async ({ page, testUser }) => {



        // homepage actions
        await page.goto('https://automationexercise.com/')


        console.log(testUser)

        // const titleLocator = page.locator('.logo.pull-left');
        // await expect(titleLocator).toBeVisible();

        // // click signup/login
        // const signUpLink = page.locator('[href="/login"]');
        // await signUpLink.click();

        // // login page
        // const signupNameTextbox = page.locator('[data-qa="signup-name"]');
        // await signupNameTextbox.fill('Sergio');

        // const emailInput = page.locator('[data-qa="signup-email"]');
        // await emailInput.fill(process.env.USER_MAIL!)

        // const signUpButton = page.locator('[data-qa="signup-button"]');
        // await signUpButton.click();

        // // signup page
        // const signUpPageHeader = page.getByText('Enter Account Information');
        // await expect(signUpPageHeader).toBeVisible();

        // // Check title (Mr or Mrs)
        // const titleRadio = page.locator('#id_gender1');
        // await titleRadio.check();

        // // set password
        // const passwordInput = page.locator('[data-qa="password"]');
        // await passwordInput.fill(process.env.USER_PASSWORD!)

        // // date of birth steps
        // // day
        // await page.locator('#days').selectOption({ value: '15' });

        // // month
        // await page.locator('#months').selectOption({ value: '1' })

        // // year
        // await page.locator('#years').selectOption({ value: '2020' })

        // // company
        // const companyInput = page.locator('#company');
        // await companyInput.fill('Compamy');

        // // address
        // const addressInput = page.locator('[data-qa="address"]');
        // await addressInput.fill('New York');

        // // country
        // await page.locator('#country').selectOption('United States');

        // // state
        // const stateInput = page.locator('#state');
        // await stateInput.fill('New York');

        // // City
        // const cityInput = page.locator('#city');
        // await cityInput.fill('New York');

        // // zipcode
        // const zipcodeInput = page.locator('#zipcode');
        // await zipcodeInput.fill('10019');

        // // phone
        // const phoneInput = page.locator('#mobile_number');
        // await phoneInput.fill('777-7777-7777');

        // // submit registration
        // const createAccountCta = page.locator('[data-qa="create-account"]');
        // await createAccountCta.click();

    })
})