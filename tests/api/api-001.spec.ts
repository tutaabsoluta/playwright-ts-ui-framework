import { test, expect } from '../../fixtures';

test.describe('API: products list', { tag: ['@api', '@regression'] }, () => {
    test('GET /productsList returns all products', { tag: '@smoke' }, async ({ api }) => {
        const result = await api.getProducts();

        expect(result.responseCode).toBe(200);
        expect(result.products.length).toBeGreaterThan(0);
        expect(result.products[0]).toEqual({
            id: 1,
            name: 'Blue Top',
            price: 'Rs. 500',
            brand: 'Polo',
            category: { usertype: { usertype: 'Women' }, category: 'Tops' },
        });
    });

    test('POST /productsList is not supported', async ({ api }) => {
        const result = await api.call('POST', '/api/productsList');

        expect(result.responseCode).toBe(405);
        expect(result.message).toBe('This request method is not supported.');
    });
});
