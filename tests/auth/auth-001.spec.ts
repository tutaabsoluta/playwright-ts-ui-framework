import { expect } from "@playwright/test";
import { RegisterPage } from "../../pages/RegisterPage";
import { test } from "../../fixtures/userFactory.fixture";

test.describe("User registration", () => {
  test("Should register a new user successfully", async ({ page, testUser }) => {
    const register = new RegisterPage(page);

    // Navigate to homepage
    await register.navigate('/');
    await expect(register.titleLocator).toBeVisible();

    // Navigate to signup/login
    await register.clickSignUpLink();

    // Start registration
    await register.fillSignUpName('Sergio');
    await register.fillSignUpEmail(testUser.email);
    await register.clickSignUpButton();

    // Verify account information form
    await expect(register.signUpPageHeader).toBeVisible();

    // Complete account information
    await register.selectTitle();
    await register.fillPassword(testUser.password);

    await register.selectBirthDate(
      '1',
      '1',
      '1994'
    );

    // Address information
    await register.fillAddressInformation(
      "Company",
      "New York",
      "New York",
      "New York",
      "10019",
      "777-7777-7777"
    );

    await register.selectCountry("United States");

    // Submit registration
    await register.clickCreateAccount();
  });
});