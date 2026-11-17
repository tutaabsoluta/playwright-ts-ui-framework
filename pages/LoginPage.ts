import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    public readonly loginEmailInput: Locator;
    public readonly loginPasswordInput: Locator;
    public readonly loginButton: Locator;
    public readonly loginError: Locator;

    constructor(page: Page) {
        super(page);

        this.loginEmailInput = page.locator('[data-qa="login-email"]');
        this.loginPasswordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.loginError = page.locator('.login-form').getByText('Your email or password is incorrect!');
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

    async login(email: string, password: string) {
        await this.fillLoginEmail(email);
        await this.fillLoginPassword(password);
        await this.clickLoginButton();
    }
}
