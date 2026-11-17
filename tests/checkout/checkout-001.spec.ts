import { test, expect } from '../../fixtures';

test.describe('Checkout', () => {
    test('Should proceed to checkout', async ({ productsPage, cartPage, checkoutPage, loggedInUser }) => {
        await productsPage.header.goToProducts();
        await productsPage.addProductToCart(0);
        await productsPage.cartModal.viewCart();

        await cartPage.proceedToCheckout();

        // Verify checkout page
        await expect(checkoutPage.addressDetailsHeading).toBeVisible();
        await expect(checkoutPage.reviewOrderHeading).toBeVisible();
        await expect(checkoutPage.deliveryAddress).toContainText(`${loggedInUser.firstname} ${loggedInUser.lastname}`);
    });
});
