import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    public readonly addressDetailsHeading: Locator;
    public readonly reviewOrderHeading: Locator;
    public readonly deliveryAddress: Locator;
    public readonly commentInput: Locator;
    public readonly placeOrderLink: Locator;

    constructor(page: Page) {
        super(page);

        this.addressDetailsHeading = page.getByRole('heading', { name: 'Address Details' });
        this.reviewOrderHeading = page.getByRole('heading', { name: 'Review Your Order' });
        this.deliveryAddress = page.locator('#address_delivery');
        this.commentInput = page.locator('textarea[name="message"]');
        this.placeOrderLink = page.getByRole('link', { name: 'Place Order' });
    }

    async addComment(comment: string) {
        await this.commentInput.fill(comment);
    }

    async placeOrder() {
        await this.placeOrderLink.click();
        await this.waitForPage(/\/payment$/);
    }
}
