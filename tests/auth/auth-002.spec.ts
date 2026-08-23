import { expect } from "@playwright/test";

import { test } from "../../fixtures/existingUser.fixture";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Login flow", () => {
    test("Should login successfully with valid credentials", async ({ page, testUser }) => {
        const loginPage = new LoginPage(page);

        // Navigate to homepage
        await loginPage.navigate('/');

        // Navigate to login page
        await loginPage.clickSignUpLink();

        // Login
        await loginPage.fillLoginEmail(testUser.email);
        await loginPage.fillLoginPassword(testUser.password);
        await loginPage.clickLoginButton();

        // Verify user is logged in
        await expect(loginPage.loggedInAs).toBeVisible();
    });
});