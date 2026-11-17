import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartModalComponent } from './components/CartModalComponent';

export class ProductsPage extends BasePage {
    public readonly productCards: Locator;
    public readonly searchInput: Locator;
    public readonly searchButton: Locator;
    public readonly cartModal: CartModalComponent;

    constructor(page: Page) {
        super(page);

        this.productCards = page.locator('.features_items .single-products');
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.cartModal = new CartModalComponent(page);
    }

    productCard(index: number) {
        const info = this.productCards.nth(index).locator('.productinfo');

        return {
            image: info.locator('img'),
            price: info.locator('h2'),
            name: info.locator('p'),
            addToCartButton: info.locator('.add-to-cart'),
        };
    }

    async search(term: string) {
        await this.searchInput.fill(term);
        await this.searchButton.click();
        await this.waitForPage(/\/products\?search=/);
    }

    /** Adds the product at `index` to the cart and returns its product id. */
    async addProductToCart(index: number): Promise<string> {
        const addToCartButton = this.productCard(index).addToCartButton;
        const productId = await addToCartButton.getAttribute('data-product-id');
        if (!productId) throw new Error(`Product card ${index} has no data-product-id`);

        await addToCartButton.click();
        return productId;
    }

    async viewProduct(productId: string) {
        const link = this.page.locator(`.features_items [href="/product_details/${productId}"]`);
        const url = new RegExp(`/product_details/${productId}$`);

        // On WebKit the click sometimes lands while the card's hover overlay is animating and
        // no navigation starts. Retry the click until the details page loads.
        await expect(async () => {
            if (!url.test(this.page.url())) await link.click({ timeout: 5_000 });
            await this.page.waitForURL(url, { waitUntil: 'domcontentloaded', timeout: 5_000 });
        }).toPass({ timeout: 20_000 });
    }
}
