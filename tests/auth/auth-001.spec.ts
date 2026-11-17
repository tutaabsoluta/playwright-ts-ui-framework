import { test, expect } from '../../fixtures';

test.describe('User registration', () => {
    test('Should register a new user successfully', async ({ registerPage, newUser }) => {
        // Navigate to homepage
        await registerPage.navigate('/');
        await expect(registerPage.header.logo).toBeVisible();

        // Navigate to signup/login
        await registerPage.header.goToSignupLogin();

        // Start registration
        await registerPage.fillSignUpName(newUser.name);
        await registerPage.fillSignUpEmail(newUser.email);
        await registerPage.clickSignUpButton();

        // Verify account information form
        await expect(registerPage.signUpPageHeader).toBeVisible();

        // Complete account information
        await registerPage.selectTitle();
        await registerPage.fillPassword(newUser.password);
        await registerPage.selectBirthDate(newUser.birth_date, newUser.birth_month, newUser.birth_year);

        // Address information
        await registerPage.fillFullName(newUser.firstname, newUser.lastname);
        await registerPage.fillAddressInformation(
            newUser.company,
            newUser.address1,
            newUser.state,
            newUser.city,
            newUser.zipcode,
            newUser.mobile_number,
        );
        await registerPage.selectCountry(newUser.country);

        // Submit registration
        await registerPage.clickCreateAccount();

        // Verify account created
        await expect(registerPage.accountCreatedHeader).toHaveText('Account Created!');
    });
});
