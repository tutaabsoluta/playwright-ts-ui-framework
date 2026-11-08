import { expect } from "@playwright/test";
import { test } from "../../fixtures/existingUser.fixture";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Checkout", () => {
    test("Should verify order confirmation", async ({ page, testUser }) => {
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

        // Add comment and place order
        const commentTextarea = page.locator('textarea[name="message"]')
        await commentTextarea.fill('Please deliver between 9am and 5pm')

        const placeOrderCta = page.getByRole('link', { name: 'Place Order' })
        await placeOrderCta.click()

        // Payment
        await page.locator('[data-qa="name-on-card"]').fill(`${testUser.firstname} ${testUser.lastname}`)
        await page.locator('[data-qa="card-number"]').fill('4111111111111111')
        await page.locator('[data-qa="cvc"]').fill('123')
        await page.locator('[data-qa="expiry-month"]').fill('12')
        await page.locator('[data-qa="expiry-year"]').fill('2030')
        await page.locator('[data-qa="pay-button"]').click()

        // Verify order confirmation
        await expect(page.locator('[data-qa="order-placed"]')).toHaveText('Order Placed!')
        await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible()
        await expect(page.getByRole('link', { name: 'Download Invoice' })).toBeVisible()
        await expect(page.locator('[data-qa="continue-button"]')).toBeVisible()
    });
});
