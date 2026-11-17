import { test, expect } from '../../fixtures';

test.describe('API: user account lifecycle', { tag: ['@api', '@regression'] }, () => {
    test('Create, read, update and delete an account', async ({ api, newUser }) => {
        await test.step('POST /createAccount', async () => {
            const result = await api.createAccount(newUser);
            expect(result.responseCode).toBe(201);
            expect(result.message).toBe('User created!');
        });

        await test.step('GET /getUserDetailByEmail returns the new user', async () => {
            const result = await api.getUserDetailByEmail(newUser.email);
            expect(result.responseCode).toBe(200);
            expect(result.user).toMatchObject({
                name: newUser.name,
                email: newUser.email,
                first_name: newUser.firstname,
                last_name: newUser.lastname,
                city: newUser.city,
            });
        });

        const updatedUser = { ...newUser, city: 'Boston', company: 'Updated Company' };

        await test.step('PUT /updateAccount', async () => {
            const result = await api.updateAccount(updatedUser);
            expect(result.responseCode).toBe(200);
            expect(result.message).toBe('User updated!');
        });

        await test.step('GET /getUserDetailByEmail returns the updated data', async () => {
            const result = await api.getUserDetailByEmail(newUser.email);
            expect(result.user).toMatchObject({ city: 'Boston', company: 'Updated Company' });
        });

        await test.step('DELETE /deleteAccount', async () => {
            const result = await api.deleteAccount(newUser.email, newUser.password);
            expect(result.responseCode).toBe(200);
            expect(result.message).toBe('Account deleted!');
        });

        await test.step('GET /getUserDetailByEmail no longer finds the user', async () => {
            const result = await api.getUserDetailByEmail(newUser.email);
            expect(result.responseCode).toBe(404);
        });
    });
});
