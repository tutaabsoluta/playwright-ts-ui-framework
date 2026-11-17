import { Locator, Page } from '@playwright/test';

export class CartModalComponent {
    public readonly container: Locator;
    public readonly continueShoppingButton: Locator;
    public readonly viewCartLink: Locator;

    constructor(page: Page) {
        this.container = page.locator('#cartModal .modal-content');
        this.continueShoppingButton = this.container.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartLink = this.container.getByRole('link', { name: 'View Cart' });
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async viewCart() {
        await this.viewCartLink.click();
    }
}
