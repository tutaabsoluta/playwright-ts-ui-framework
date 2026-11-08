import { expect } from "@playwright/test";
import { test } from "../../fixtures/existingUser.fixture";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Checkout", () => {
    test("Should proceed to checkout", async ({ page, testUser }) => {
        const loginPage = new LoginPage(page)
        await loginPage.navigate('')

        // Navigate to login page
        await loginPage.clickSignUpLink();

        // Login
        await loginPage.fillLoginEmail(testUser.email);
        await loginPage.fillLoginPassword(testUser.password);
        await loginPage.clickLoginButton();
        await expect(loginPage.loggedInAs).toBeVisible()
        // Cart handlers are bound by a script at the end of the page; wait for it before clicking
        await page.waitForLoadState('domcontentloaded')

        const addToCartCta = page.locator('.btn.btn-default.add-to-cart')
        await addToCartCta.first().click()

        const continueShoppingModalCta = page.locator('[data-dismiss="modal"]')
        await continueShoppingModalCta.click()

        const cartNavLink = page.locator('header').getByRole('link', { name: 'Cart' })
        await cartNavLink.click()
        await expect(page).toHaveURL(/\/view_cart/)
        // Cart handlers are bound by a script at the end of the page; wait for it before clicking
        await page.waitForLoadState('domcontentloaded')

        const proceedToCheckoutCta = page.locator('.btn.btn-default.check_out')
        await proceedToCheckoutCta.click()

        // Verify checkout page
        await expect(page).toHaveURL(/\/checkout$/)
        await expect(page.getByRole('heading', { name: 'Address Details' })).toBeVisible()
        await expect(page.getByRole('heading', { name: 'Review Your Order' })).toBeVisible()

        const deliveryAddress = page.locator('#address_delivery')
        await expect(deliveryAddress).toContainText(`${testUser.firstname} ${testUser.lastname}`)
    });
});
