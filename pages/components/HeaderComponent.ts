import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
    public readonly logo: Locator;
    public readonly productsLink: Locator;
    public readonly cartLink: Locator;
    public readonly signupLoginLink: Locator;
    public readonly loggedInAs: Locator;

    constructor(private readonly page: Page) {
        const header = page.locator('header');

        this.logo = header.locator('.logo.pull-left');
        this.productsLink = header.locator('[href="/products"]');
        this.cartLink = header.getByRole('link', { name: 'Cart' });
        this.signupLoginLink = header.locator('[href="/login"]');
        this.loggedInAs = header.locator('li').filter({ hasText: 'Logged in as' });
    }

    async goToProducts() {
        await this.productsLink.click();
        await this.page.waitForURL(/\/products/, { waitUntil: 'domcontentloaded' });
    }

    async goToCart() {
        await this.cartLink.click();
        await this.page.waitForURL(/\/view_cart/, { waitUntil: 'domcontentloaded' });
    }

    async goToSignupLogin() {
        await this.signupLoginLink.click();
        await this.page.waitForURL(/\/login/, { waitUntil: 'domcontentloaded' });
    }
}
