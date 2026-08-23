import { Locator, Page } from "@playwright/test";

export class RegisterPage {
    private readonly page: Page;

    public readonly titleLocator: Locator;
    public readonly signUpLink: Locator;
    public readonly signupNameTextbox: Locator;
    public readonly signupEmailTextbox: Locator;
    public readonly signupButton: Locator;

    public readonly signUpPageHeader: Locator;
    public readonly titleRadio: Locator;
    public readonly passwordInput: Locator;

    public readonly birthDaySelect: Locator;
    public readonly birthMonthSelect: Locator;
    public readonly birthYearSelect: Locator;

    public readonly companyInput: Locator;
    public readonly addressInput: Locator;
    public readonly countrySelect: Locator;
    public readonly stateInput: Locator;
    public readonly cityInput: Locator;
    public readonly zipcodeInput: Locator;
    public readonly phoneInput: Locator;

    public readonly createAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.titleLocator = page.locator(".logo.pull-left");
        this.signUpLink = page.locator('[href="/login"]');

        this.signupNameTextbox = page.locator('[data-qa="signup-name"]');
        this.signupEmailTextbox = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');

        this.signUpPageHeader = page.getByText("Enter Account Information");
        this.titleRadio = page.locator("#id_gender1");
        this.passwordInput = page.locator('[data-qa="password"]');

        this.birthDaySelect = page.locator("#days");
        this.birthMonthSelect = page.locator("#months");
        this.birthYearSelect = page.locator("#years");

        this.companyInput = page.locator("#company");
        this.addressInput = page.locator('[data-qa="address"]');
        this.countrySelect = page.locator("#country");
        this.stateInput = page.locator("#state");
        this.cityInput = page.locator("#city");
        this.zipcodeInput = page.locator("#zipcode");
        this.phoneInput = page.locator("#mobile_number");

        this.createAccountButton = page.locator('[data-qa="create-account"]');
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async clickSignUpLink() {
        await this.signUpLink.click();
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

    async selectBirthDate(
        birthDate: string,
        birthMonth: string,
        birthYear: string
    ) {
        await this.birthDaySelect.selectOption({ value: birthDate });
        await this.birthMonthSelect.selectOption({ value: birthMonth });
        await this.birthYearSelect.selectOption({ value: birthYear });
    }

    async fillAddressInformation(
        company: string,
        address: string,
        state: string,
        city: string,
        zipcode: string,
        phone: string
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