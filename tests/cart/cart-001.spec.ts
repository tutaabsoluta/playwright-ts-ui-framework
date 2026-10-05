import { expect } from "@playwright/test";
import { test } from "../../fixtures/existingUser.fixture";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Cart", () => {
    test("Should add a product to cart", async ({ page, testUser }) => {
        const loginPage = new LoginPage(page)

        await page.goto('/')

        // Navigate to login page
        await loginPage.clickSignUpLink();

        // Login
        await loginPage.fillLoginEmail(testUser.email);
        await loginPage.fillLoginPassword(testUser.password);
        await loginPage.clickLoginButton();

        // Click products
        const productsNavLink = page.locator('[href="/products"]')
        await productsNavLink.click()

        // Add product to cart
        const addToCartCta = page.locator('.btn.btn-default.add-to-cart')
        await addToCartCta.first().click()

        const addedToCartModal = page.locator('.modal-content')
        await expect(addedToCartModal).toBeVisible()

    });
});