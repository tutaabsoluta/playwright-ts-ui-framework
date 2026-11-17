import { test, expect } from "../../fixtures";

test.describe("Cart", () => {
    test("Should update product quantity", async ({ productsPage, productDetailsPage, cartPage, loggedInUser }) => {
        const productId = '1';
        const quantity = 4;

        await productsPage.header.goToProducts();
        await productsPage.viewProduct(productId);

        // Set quantity and add to cart
        await productDetailsPage.setQuantity(quantity);
        await productDetailsPage.addToCart();
        await productDetailsPage.cartModal.viewCart();

        // Verify quantity in cart row
        await expect(cartPage.productQuantity(productId)).toHaveText(String(quantity));
    });
});
