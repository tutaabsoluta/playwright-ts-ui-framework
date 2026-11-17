import { test, expect } from "../../fixtures";

test.describe("Cart", () => {
    test("Should view cart", async ({ productsPage, cartPage, loggedInUser }) => {
        await productsPage.header.goToProducts();
        const productId = await productsPage.addProductToCart(0);
        await productsPage.cartModal.continueShopping();

        await productsPage.header.goToCart();

        await expect(cartPage.emptyCartMessage).not.toBeVisible();
        await expect(cartPage.productRow(productId)).toBeVisible();
    });
});
