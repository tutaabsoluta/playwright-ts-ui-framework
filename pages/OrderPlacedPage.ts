import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderPlacedPage extends BasePage {
    public readonly orderPlacedHeading: Locator;
    public readonly confirmationMessage: Locator;
    public readonly downloadInvoiceLink: Locator;
    public readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);

        this.orderPlacedHeading = page.locator('[data-qa="order-placed"]');
        this.confirmationMessage = page.getByText('Congratulations! Your order has been confirmed!');
        this.downloadInvoiceLink = page.getByRole('link', { name: 'Download Invoice' });
        this.continueButton = page.locator('[data-qa="continue-button"]');
    }
}
