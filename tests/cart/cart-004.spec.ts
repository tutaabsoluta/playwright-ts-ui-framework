import { test, expect } from '../../fixtures';

test.describe('Cart', { tag: '@regression' }, () => {
    test('Should remove a product from cart', async ({ productsPage, cartPage, loggedInUser }) => {
        await productsPage.header.goToProducts();
        const productId = await productsPage.addProductToCart(0);
        await productsPage.cartModal.continueShopping();
        await productsPage.header.goToCart();
        await expect(cartPage.productRow(productId)).toBeVisible();

        await cartPage.removeProduct(productId);

        await expect(cartPage.productRow(productId)).toBeHidden();
        await expect(cartPage.emptyCartMessage).toBeVisible();
    });
});
