import { expect } from "@playwright/test";
import { test } from "../../fixtures/existingUser.fixture";
import { LoginPage } from "../../pages/LoginPage";


test.describe("Products", () => {
    test("Should search for a product", async ({ page, testUser }) => {
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

        // type input
        const searchInput = page.locator('[id="search_product"]')
        await searchInput.fill('shirt')

        // click search button
        const searchCta = page.locator('[id="submit_search"]')
        await searchCta.click()

        const productCards = page.locator(".single-products");

        await expect(productCards).not.toHaveCount(0);
        await expect(productCards.first()).toContainText(/shirt/i);
    });
});