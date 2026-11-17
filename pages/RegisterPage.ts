import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
    public readonly signupNameTextbox: Locator;
    public readonly signupEmailTextbox: Locator;
    public readonly signupButton: Locator;

    public readonly signUpPageHeader: Locator;
    public readonly titleRadio: Locator;
    public readonly passwordInput: Locator;

    public readonly birthDaySelect: Locator;
    public readonly birthMonthSelect: Locator;
    public readonly birthYearSelect: Locator;

    public readonly firstNameInput: Locator;
    public readonly lastNameInput: Locator;
    public readonly companyInput: Locator;
    public readonly addressInput: Locator;
    public readonly countrySelect: Locator;
    public readonly stateInput: Locator;
    public readonly cityInput: Locator;
    public readonly zipcodeInput: Locator;
    public readonly phoneInput: Locator;

    public readonly createAccountButton: Locator;
    public readonly accountCreatedHeader: Locator;

    constructor(page: Page) {
        super(page);

        this.signupNameTextbox = page.locator('[data-qa="signup-name"]');
        this.signupEmailTextbox = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');

        this.signUpPageHeader = page.getByText('Enter Account Information');
        this.titleRadio = page.locator('#id_gender1');
        this.passwordInput = page.locator('[data-qa="password"]');

        this.birthDaySelect = page.locator('#days');
        this.birthMonthSelect = page.locator('#months');
        this.birthYearSelect = page.locator('#years');

        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.companyInput = page.locator('#company');
        this.addressInput = page.locator('[data-qa="address"]');
        this.countrySelect = page.locator('#country');
        this.stateInput = page.locator('#state');
        this.cityInput = page.locator('#city');
        this.zipcodeInput = page.locator('#zipcode');
        this.phoneInput = page.locator('#mobile_number');

        this.createAccountButton = page.locator('[data-qa="create-account"]');
        this.accountCreatedHeader = page.locator('[data-qa="account-created"]');
    }

    async fillSignUpName(name: string) {
        await this.signupNameTextbox.fill(name);
    }

    async fillSignUpEmail(email: string) {
        await this.signupEmailTextbox.fill(email);
    }

    async clickSignUpButton() {
        await this.signupButton.click();
    }

    async selectTitle() {
        await this.titleRadio.check();
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async selectBirthDate(birthDate: string, birthMonth: string, birthYear: string) {
        await this.birthDaySelect.selectOption({ value: birthDate });
        await this.birthMonthSelect.selectOption({ value: birthMonth });
        await this.birthYearSelect.selectOption({ value: birthYear });
    }

    async fillFullName(firstName: string, lastName: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
    }

    async fillAddressInformation(
        company: string,
        address: string,
        state: string,
        city: string,
        zipcode: string,
        phone: string,
    ) {
        await this.companyInput.fill(company);
        await this.addressInput.fill(address);
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipcodeInput.fill(zipcode);
        await this.phoneInput.fill(phone);
    }

    async selectCountry(country: string) {
        await this.countrySelect.selectOption(country);
    }

    async clickCreateAccount() {
        await this.createAccountButton.click();
    }
}
