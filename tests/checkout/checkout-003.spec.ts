import { test, expect } from "../../fixtures";
import { testCard } from "../../data/paymentCards";

test.describe("Checkout", () => {
    test("Should verify order confirmation", async ({ productsPage, cartPage, checkoutPage, paymentPage, orderPlacedPage, loggedInUser }) => {
        await productsPage.header.goToProducts();
        await productsPage.addProductToCart(0);
        await productsPage.cartModal.viewCart();

        await cartPage.proceedToCheckout();
        await checkoutPage.addComment('Please deliver between 9am and 5pm');
        await checkoutPage.placeOrder();
        await paymentPage.payAndConfirm(testCard(loggedInUser));

        // Verify order confirmation
        await expect(orderPlacedPage.orderPlacedHeading).toHaveText('Order Placed!');
        await expect(orderPlacedPage.confirmationMessage).toBeVisible();
        await expect(orderPlacedPage.downloadInvoiceLink).toBeVisible();
        await expect(orderPlacedPage.continueButton).toBeVisible();
    });
});
