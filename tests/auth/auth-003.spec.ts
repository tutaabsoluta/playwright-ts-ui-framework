import { test, expect } from '../../fixtures';

test.describe('Invalid login flow', () => {
    test('Should fail the login with invalid credentials', async ({ loginPage }) => {
        await loginPage.navigate('/');
        await loginPage.header.goToSignupLogin();

        await loginPage.login('test@mail.com', 'password');

        await expect(loginPage.loginError).toBeVisible();
        await expect(loginPage.loginError).toHaveText('Your email or password is incorrect!');
    });
});
