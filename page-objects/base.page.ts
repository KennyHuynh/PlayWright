import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
    private _page: Page;
    private readonly viewCartButton: Locator;

    constructor(page: Page) {
        this._page = page;
        this.viewCartButton = page.locator('//span[contains(@class,"et-cart-quantity et-quantity count-")]');
    }

    //getter
    get page(): Page {
        return this._page;
    }

    //setter
    set page(page: Page) {
        this._page = page;
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
        console.log(`Navigated to URL: ${url}`);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getUrl(): Promise<string> {
        return this.page.url();
    }

    async openLink(locator: Locator): Promise<void> {
        await locator.click();
        console.log(`Opened link with locator: ${locator}`);
    }

    async close() {
        await this.page.close();
        console.log(`Page closed`);
    }

    async openMenuItem(menuItem: string): Promise<void> {
        if (menuItem.includes('->')) {
            const parts: string[] = menuItem.split('->');
            const menu = parts[0].trim();

            const subMenus = parts.slice(1);
            for (const subMenu of subMenus) {
                await expect(async () => {
                    await this.page.getByText(menu).click(); // Perform the action that might reveal the element
                    await expect(this.page.getByRole('link', { name: subMenu }).first()).toBeVisible(); // Check the condition inside the loop
                }).toPass({ timeout: 10000 });
                await this.page.getByRole('link', { name: subMenu }).first().click();
            }
        }
        else {
            await this.page.getByText(menuItem).click();
        }
        console.log(`Navigated to menu item: ${menuItem}`);
    }

    async clickToCart(): Promise<void> {
        await this.viewCartButton.first().click();
        console.log(`Clicked to view cart`);
    }
}