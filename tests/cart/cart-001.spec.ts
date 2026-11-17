import { test, expect } from '../../fixtures';

test.describe('Cart', { tag: '@regression' }, () => {
    test('Should add a product to cart', { tag: '@smoke' }, async ({ productsPage, loggedInUser }) => {
        await productsPage.header.goToProducts();
        await productsPage.addProductToCart(0);

        await expect(productsPage.cartModal.container).toBeVisible();
    });
});
