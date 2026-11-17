import { test, expect } from '../../fixtures';

test.describe('API: brands list', { tag: ['@api', '@regression'] }, () => {
    test('GET /brandsList returns all brands', async ({ api }) => {
        const result = await api.getBrands();

        expect(result.responseCode).toBe(200);
        expect(result.brands.length).toBeGreaterThan(0);
        expect(result.brands.map((b) => b.brand)).toContain('Polo');
        for (const brand of result.brands) {
            expect(brand).toEqual({ id: expect.any(Number), brand: expect.any(String) });
        }
    });

    test('PUT /brandsList is not supported', async ({ api }) => {
        const result = await api.call('PUT', '/api/brandsList');

        expect(result.responseCode).toBe(405);
        expect(result.message).toBe('This request method is not supported.');
    });
});
