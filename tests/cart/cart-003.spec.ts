import { expect } from "@playwright/test";
import { test } from "../../fixtures/existingUser.fixture";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Cart", () => {
    test("Should update product quantity", async ({ page, testUser }) => {
        const loginPage = new LoginPage(page)

        await page.goto('/')

        // Navigate to login page
        await loginPage.clickSignUpLink();

        // Login
        await loginPage.fillLoginEmail(testUser.email);
        await loginPage.fillLoginPassword(testUser.password);
        await loginPage.clickLoginButton();

        const productsNavLink = page.locator('[href="/products"]')
        await productsNavLink.click()
    });
});