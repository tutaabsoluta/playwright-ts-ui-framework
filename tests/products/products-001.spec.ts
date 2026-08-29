import { expect } from "@playwright/test";
import { test } from "../../fixtures/existingUser.fixture";
import { LoginPage } from "../../pages/LoginPage";


test.describe("Products", () => {
    test("Should view all products", async ({ page, testUser }) => {

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

        const productCards = page.locator('.single-products')
        await expect(productCards).not.toHaveCount(0)

        const firstProduct = productCards.first()
        await expect(firstProduct.locator('img').first()).toBeVisible()
        await expect(firstProduct.locator('h2').first()).toBeVisible()
        await expect(firstProduct.locator('p').first()).toBeVisible()
        await expect(firstProduct.locator('.add-to-cart').first()).toBeVisible()
    });
});