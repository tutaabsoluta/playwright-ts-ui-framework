import { expect } from "@playwright/test";
import { test } from "../../fixtures/existingUser.fixture";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Cart", () => {
    test("Should update product quantity", async ({ page, testUser }) => {
        const loginPage = new LoginPage(page)
        const quantity = '4'

        await page.goto('/')

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
        await expect(page).toHaveURL(/\/product_details\/1/)
        // Cart handlers are bound by a script at the end of the page; wait for it before clicking
        await page.waitForLoadState('domcontentloaded')

        // Set quantity and add to cart
        const quantityInput = page.locator('#quantity')
        await quantityInput.fill(quantity)

        const addToCartCta = page.locator('.product-details button.cart')
        await addToCartCta.click()

        const viewCartLink = page.locator('.modal-content').getByRole('link', { name: 'View Cart' })
        await viewCartLink.click()

        // Verify quantity in cart row
        const productQuantity = page.locator('[id="product-1"] .cart_quantity button')
        await expect(productQuantity).toHaveText(quantity)
    });
});
