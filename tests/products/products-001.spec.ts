import { test, expect } from '../../fixtures';

test.describe('Products', () => {
    test('Should view all products', async ({ productsPage, loggedInUser }) => {
        await productsPage.header.goToProducts();

        await expect(productsPage.productCards).not.toHaveCount(0);

        // First product card shows its main information
        const firstProduct = productsPage.productCard(0);
        await expect(firstProduct.image).toBeVisible();
        await expect(firstProduct.price).toBeVisible();
        await expect(firstProduct.name).toBeVisible();
        await expect(firstProduct.addToCartButton).toBeVisible();
    });
});
