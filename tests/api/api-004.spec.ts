import { test, expect } from '../../fixtures';

test.describe('API: verify login', { tag: ['@api', '@regression'] }, () => {
    test('POST /verifyLogin with valid credentials', async ({ api, testUser }) => {
        const result = await api.verifyLogin({ email: testUser.email, password: testUser.password });

        expect(result.responseCode).toBe(200);
        expect(result.message).toBe('User exists!');
    });

    test('POST /verifyLogin with invalid credentials', async ({ api }) => {
        const result = await api.verifyLogin({ email: 'nobody@mail.com', password: 'wrong-password' });

        expect(result.responseCode).toBe(404);
        expect(result.message).toBe('User not found!');
    });

    test('POST /verifyLogin without email is rejected', async ({ api }) => {
        const result = await api.verifyLogin({ password: 'Password123!' });

        expect(result.responseCode).toBe(400);
        expect(result.message).toBe('Bad request, email or password parameter is missing in POST request.');
    });

    test('DELETE /verifyLogin is not supported', async ({ api }) => {
        const result = await api.call('DELETE', '/api/verifyLogin');

        expect(result.responseCode).toBe(405);
        expect(result.message).toBe('This request method is not supported.');
    });
});
