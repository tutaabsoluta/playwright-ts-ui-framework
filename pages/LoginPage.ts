import { Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly page: Page;

    public readonly titleLocator: Locator;
    public readonly signUpLink: Locator;
    public readonly loginEmailInput: Locator;
    public readonly loginPasswordInput: Locator;
    public readonly loginButton: Locator;
    public readonly loggedInAs: Locator;
    public readonly loginError: Locator;

    constructor(page: Page) {
        this.page = page;

        this.titleLocator = page.locator(".logo.pull-left");
        this.signUpLink = page.locator('[href="/login"]');

        this.loginEmailInput = page.locator('[data-qa="login-email"]');
        this.loginPasswordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');

        this.loggedInAs = page.locator(".fa.fa-user");
        this.loginError = page.locator('[style="color: red;"]');
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async clickSignUpLink() {
        await this.signUpLink.click();
    }

    async fillLoginEmail(email: string) {
        await this.loginEmailInput.fill(email);
    }

    async fillLoginPassword(password: string) {
        await this.loginPasswordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
}