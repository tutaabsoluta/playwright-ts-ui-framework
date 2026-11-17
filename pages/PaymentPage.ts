import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { PaymentCard } from "../types/PaymentCard";

export class PaymentPage extends BasePage {
    public readonly nameOnCardInput: Locator;
    public readonly cardNumberInput: Locator;
    public readonly cvcInput: Locator;
    public readonly expiryMonthInput: Locator;
    public readonly expiryYearInput: Locator;
    public readonly payButton: Locator;

    constructor(page: Page) {
        super(page);

        this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
        this.cardNumberInput = page.locator('[data-qa="card-number"]');
        this.cvcInput = page.locator('[data-qa="cvc"]');
        this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
        this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
    }

    async fillCard(card: PaymentCard) {
        await this.nameOnCardInput.fill(card.nameOnCard);
        await this.cardNumberInput.fill(card.number);
        await this.cvcInput.fill(card.cvc);
        await this.expiryMonthInput.fill(card.expiryMonth);
        await this.expiryYearInput.fill(card.expiryYear);
    }

    async payAndConfirm(card: PaymentCard) {
        await this.fillCard(card);
        await this.payButton.click();
        await this.waitForPage(/\/payment_done\//);
    }
}
