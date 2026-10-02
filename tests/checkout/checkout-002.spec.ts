import { expect } from "@playwright/test";
import { test } from "../../fixtures/existingUser.fixture";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Checkout", () => {
    test("Should place an order successfully", async ({ page, testUser }) => {
        const loginPage = new LoginPage(page)
        await loginPage.navigate('')

        // Navigate to login page
        await loginPage.clickSignUpLink();

        // Login
        await loginPage.fillLoginEmail(testUser.email);
        await loginPage.fillLoginPassword(testUser.password);
        await loginPage.clickLoginButton();

        const addToCartCta = page.locator('.btn.btn-default.add-to-cart')
        await addToCartCta.first().click()

        const continueShoppingModalCta = page.locator('[data-dismiss="modal"]')
        await continueShoppingModalCta.click()

        const cartNavLink = page.getByRole('link', { name: ' Cart' })
        await cartNavLink.click()

        const proceedToCheckoutCta = page.locator('.btn.btn-default.check_out')
        await proceedToCheckoutCta.click()
    });
});