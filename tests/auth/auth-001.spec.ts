import { expect } from "@playwright/test";
import { RegisterPage } from "../../pages/RegisterPage";
import { test } from "../../fixtures/userFactory.fixture";

test.describe("User registration", () => {
  test("Should register a new user successfully", async ({ page, testUser }) => {
    const loginPage = new RegisterPage(page);

    // Navigate to homepage
    await loginPage.navigate('/');
    await expect(loginPage.titleLocator).toBeVisible();

    // Navigate to signup/login
    await loginPage.clickSignUpLink();

    // Start registration
    await loginPage.fillSignUpName('Sergio');
    await loginPage.fillSignUpEmail(testUser.email);
    await loginPage.clickSignUpButton();

    // Verify account information form
    await expect(loginPage.signUpPageHeader).toBeVisible();

    // Complete account information
    await loginPage.selectTitle();
    await loginPage.fillPassword(testUser.password);

    await loginPage.selectBirthDate(
      '1',
      '1',
      '1994'
    );

    // Address information
    await loginPage.fillAddressInformation(
      "Company",
      "New York",
      "New York",
      "New York",
      "10019",
      "777-7777-7777"
    );

    await loginPage.selectCountry("United States");

    // Submit registration
    await loginPage.clickCreateAccount();
  });
});