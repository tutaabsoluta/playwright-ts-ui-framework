import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CartModalComponent } from "./components/CartModalComponent";

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
        await this.page.locator(`.features_items [href="/product_details/${productId}"]`).click();
        await this.waitForPage(new RegExp(`/product_details/${productId}$`));
    }
}
