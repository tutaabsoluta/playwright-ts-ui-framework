import { test, expect } from '../../fixtures';

test.describe('API: search product', { tag: ['@api', '@regression'] }, () => {
    test('POST /searchProduct returns matching products', async ({ api }) => {
        const result = await api.searchProduct('top');

        expect(result.responseCode).toBe(200);
        expect(result.products.length).toBeGreaterThan(0);
        for (const product of result.products) {
            expect(`${product.name} ${product.category.category}`).toMatch(/top/i);
        }
    });

    test('POST /searchProduct without search_product is rejected', async ({ api }) => {
        const result = await api.searchProduct();

        expect(result.responseCode).toBe(400);
        expect(result.message).toBe('Bad request, search_product parameter is missing in POST request.');
    });
});
