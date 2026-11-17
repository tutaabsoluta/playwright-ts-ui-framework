import { test, expect } from '../../fixtures';

test.describe('Login flow', () => {
    test('Should login successfully with valid credentials', async ({ loginPage, testUser }) => {
        // Navigate to login page
        await loginPage.navigate('/');
        await loginPage.header.goToSignupLogin();

        // Login
        await loginPage.login(testUser.email, testUser.password);

        // Verify user is logged in
        await expect(loginPage.header.loggedInAs).toBeVisible();
        await expect(loginPage.header.loggedInAs).toContainText(testUser.name);
    });
});
