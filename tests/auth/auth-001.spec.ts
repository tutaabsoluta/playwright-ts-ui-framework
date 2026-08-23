import { expect } from "@playwright/test";

import { test } from "../../fixtures/userFactory.fixture";

test.describe("User registration", () => {
  test("Should register a new user successfully", async ({ page, testUser }) => {
    // Navigate to the homepage
    await page.goto("https://automationexercise.com/");

    const titleLocator = page.locator(".logo.pull-left");
    await expect(titleLocator).toBeVisible();

    // Navigate to the signup/login page
    const signUpLink = page.locator('[href="/login"]');
    await signUpLink.click();

    // Start the user registration process
    const signupNameTextbox = page.locator('[data-qa="signup-name"]');
    await signupNameTextbox.fill("Sergio");

    const emailInput = page.locator('[data-qa="signup-email"]');
    await emailInput.fill(testUser.email);

    const signUpButton = page.locator('[data-qa="signup-button"]');
    await signUpButton.click();

    // Verify the account information form is displayed
    const signUpPageHeader = page.getByText("Enter Account Information");
    await expect(signUpPageHeader).toBeVisible();

    // Complete account information
    const titleRadio = page.locator("#id_gender1");
    await titleRadio.check();

    const passwordInput = page.locator('[data-qa="password"]');
    await passwordInput.fill(testUser.password);

    // Set date of birth
    await page.locator("#days").selectOption({ value: "15" });
    await page.locator("#months").selectOption({ value: "1" });
    await page.locator("#years").selectOption({ value: "2020" });

    // Provide address information
    const companyInput = page.locator("#company");
    await companyInput.fill("Company");

    const addressInput = page.locator('[data-qa="address"]');
    await addressInput.fill("New York");

    await page.locator("#country").selectOption("United States");

    const stateInput = page.locator("#state");
    await stateInput.fill("New York");

    const cityInput = page.locator("#city");
    await cityInput.fill("New York");

    const zipcodeInput = page.locator("#zipcode");
    await zipcodeInput.fill("10019");

    const phoneInput = page.locator("#mobile_number");
    await phoneInput.fill("777-7777-7777");

    // Submit the registration form
    const createAccountCta = page.locator('[data-qa="create-account"]');
    await createAccountCta.click();

    // Verify the account was created successfully
    const accountCreatedMessage = page.getByText("Account Created!");
    await expect(accountCreatedMessage).toBeVisible();
  });
});