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
    await register.fillSignUpName(testUser.name);
    await register.fillSignUpEmail(testUser.email);
    await register.clickSignUpButton();

    // Verify account information form
    await expect(register.signUpPageHeader).toBeVisible();

    // Complete account information
    await register.selectTitle();
    await register.fillPassword(testUser.password);

    await register.selectBirthDate(
      testUser.birth_date,
      testUser.birth_month,
      testUser.birth_year
    );

    // Address information
    await register.fillFullName(testUser.firstname, testUser.lastname);
    await register.fillAddressInformation(
      testUser.company,
      testUser.address1,
      testUser.state,
      testUser.city,
      testUser.zipcode,
      testUser.mobile_number
    );

    await register.selectCountry(testUser.country);

    // Submit registration
    await register.clickCreateAccount();

    // Verify account created
    const accountCreatedHeader = page.locator('[data-qa="account-created"]')
    await expect(accountCreatedHeader).toHaveText('Account Created!')
  });
});
