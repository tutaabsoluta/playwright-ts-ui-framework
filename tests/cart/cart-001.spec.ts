import { test, expect } from "../../fixtures";

test.describe("Cart", () => {
    test("Should add a product to cart", async ({ productsPage, loggedInUser }) => {
        await productsPage.header.goToProducts();
        await productsPage.addProductToCart(0);

        await expect(productsPage.cartModal.container).toBeVisible();
    });
});
