import { test, expect } from "../../fixtures";
import { testCard } from "../../data/paymentCards";

test.describe("Checkout", () => {
    test("Should place an order successfully", async ({ page, productsPage, cartPage, checkoutPage, paymentPage, orderPlacedPage, loggedInUser }) => {
        await productsPage.header.goToProducts();
        await productsPage.addProductToCart(0);
        await productsPage.cartModal.viewCart();

        await cartPage.proceedToCheckout();

        // Add comment and place order
        await checkoutPage.addComment('Please deliver between 9am and 5pm');
        await checkoutPage.placeOrder();

        // Payment
        await paymentPage.payAndConfirm(testCard(loggedInUser));

        // Verify order was placed
        await expect(page).toHaveURL(/\/payment_done\//);
        await expect(orderPlacedPage.orderPlacedHeading).toHaveText('Order Placed!');
    });
});
