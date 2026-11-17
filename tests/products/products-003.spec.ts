import { test, expect } from "../../fixtures";

test.describe("Products", () => {
    test("Should search for a product", async ({ productsPage, loggedInUser }) => {
        await productsPage.header.goToProducts();
        await productsPage.search('shirt');

        await expect(productsPage.productCards).not.toHaveCount(0);
        await expect(productsPage.productCards.first()).toContainText(/shirt/i);
    });
});
