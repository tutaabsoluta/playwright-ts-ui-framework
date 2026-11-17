import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartModalComponent } from './components/CartModalComponent';

export class ProductDetailsPage extends BasePage {
    public readonly name: Locator;
    public readonly category: Locator;
    public readonly price: Locator;
    public readonly availability: Locator;
    public readonly quantityInput: Locator;
    public readonly addToCartButton: Locator;
    public readonly cartModal: CartModalComponent;

    constructor(page: Page) {
        super(page);

        const info = page.locator('.product-information');
        this.name = info.locator('h2');
        this.category = info.locator('p').filter({ hasText: 'Category:' });
        this.price = info.getByText(/^Rs\. \d+$/);
        this.availability = info.locator('p').filter({ hasText: 'Availability:' });
        this.quantityInput = page.locator('#quantity');
        this.addToCartButton = info.getByRole('button', { name: 'Add to cart' });
        this.cartModal = new CartModalComponent(page);
    }

    async setQuantity(quantity: number) {
        await this.quantityInput.fill(String(quantity));
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}
