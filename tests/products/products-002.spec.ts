import { test, expect } from '../../fixtures';

test.describe('Products', () => {
    test('Should view product details', async ({ productsPage, productDetailsPage, loggedInUser }) => {
        await productsPage.header.goToProducts();
        await productsPage.viewProduct('1');

        await expect(productDetailsPage.name).toHaveText('Blue Top');
        await expect(productDetailsPage.category).toHaveText('Category: Women > Tops');
        await expect(productDetailsPage.price).toHaveText('Rs. 500');
        await expect(productDetailsPage.availability).toHaveText('Availability: In Stock');
    });
});
