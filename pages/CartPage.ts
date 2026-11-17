import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    public readonly emptyCartMessage: Locator;
    public readonly proceedToCheckoutButton: Locator;

    constructor(page: Page) {
        super(page);

        this.emptyCartMessage = page.locator('#empty_cart');
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
    }

    productRow(productId: string): Locator {
        return this.page.locator(`#product-${productId}`);
    }

    productQuantity(productId: string): Locator {
        return this.productRow(productId).locator('.cart_quantity button');
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
        await this.waitForPage(/\/checkout$/);
    }
}
