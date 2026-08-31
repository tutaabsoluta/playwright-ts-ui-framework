import { expect } from "@playwright/test";
import { test } from "../../fixtures/existingUser.fixture";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Products", () => {
    test("Should view product details", async ({ page, testUser }) => {
        await page.goto('/')
        const loginPage = new LoginPage(page)
        // Navigate to login page
        await loginPage.clickSignUpLink();

        // Login
        await loginPage.fillLoginEmail(testUser.email);
        await loginPage.fillLoginPassword(testUser.password);
        await loginPage.clickLoginButton();

        const productsNavLink = page.locator('[href="/products"]')
        await productsNavLink.click()

        const viewProductCta = page.locator('[href="/product_details/1"]')
        await viewProductCta.click()

        // product details
        const productDetailsContainer = page.locator('.product-details')
        await expect(productDetailsContainer.locator('h2')).toHaveText('Blue Top')
        await expect(productDetailsContainer.locator('p').first()).toHaveText('Category: Women > Tops')
        await expect(productDetailsContainer.getByText('Rs. 500')).toBeVisible()
        await expect(productDetailsContainer.locator('p').nth(1)).toHaveText('Availability: In Stock')

    });
});