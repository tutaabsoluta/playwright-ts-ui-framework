import { Locator, Page } from '@playwright/test';

export class CartModalComponent {
    public readonly container: Locator;
    public readonly continueShoppingButton: Locator;
    public readonly viewCartLink: Locator;

    constructor(private readonly page: Page) {
        this.container = page.locator('#cartModal .modal-content');
        this.continueShoppingButton = this.container.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartLink = this.container.getByRole('link', { name: 'View Cart' });
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async viewCart() {
        await this.viewCartLink.click();
        // The cart's "Proceed To Checkout" handler is bound by an inline script at the end of the page:
        // wait for the DOM to be parsed, otherwise a fast click on it does nothing.
        await this.page.waitForURL(/\/view_cart$/, { waitUntil: 'domcontentloaded' });
    }
}
