import { Page } from "@playwright/test";
import { HeaderComponent } from "./components/HeaderComponent";

export abstract class BasePage {
    public readonly header: HeaderComponent;

    constructor(protected readonly page: Page) {
        this.header = new HeaderComponent(page);
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    // Many buttons on this site get their click handlers from scripts at the end of the page
    // (they have no href), so a click before the DOM is fully parsed does nothing.
    protected async waitForPage(url: RegExp) {
        await this.page.waitForURL(url, { waitUntil: 'domcontentloaded' });
    }
}
