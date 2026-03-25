import { expect, Locator, Page } from '@playwright/test';

import { Logger } from '../utility/logger.js';
import { step } from '../utility/decorator.js';
import { TestInfo } from '@playwright/test';


export class BasePage {
    protected _page: Page;
    private readonly viewCartButton: Locator;

    constructor(page: Page,
        protected logger: Logger,
        protected testInfo: TestInfo
    ) {
        this._page = page;
        this.viewCartButton = page.locator('//span[contains(@class,"et-cart-quantity et-quantity count-")]');
    }

    //getter
    get page(): Page {
        this.logger.log(`[DEBUG] Truy cập vào đối tượng Page lúc: ${new Date().toISOString()}`);
        if (this._page.isClosed()) {
            throw new Error("Lỗi: Bạn đang cố thao tác trên một trang đã đóng!");
        }
        return this._page;
    }

    //setter
    set page(page: Page) {
        this._page = page;
    }

    @step('Navigate to URL: {0}')
    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
        this.logger.log(`Navigated to URL: ${url}`);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getUrl(): Promise<string> {
        return this.page.url();
    }

    async openLink(locator: Locator): Promise<void> {
        await locator.click();
        this.logger.log(`Opened link with locator: ${locator}`);
    }

    async close() {
        await this.page.close();
        this.logger.log(`Page closed`);
    }

    @step('The menu item: {0} should display and be clickable')
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
        this.logger.log(`Navigated to menu item: ${menuItem}`);
    }

    async clickToCart(): Promise<void> {
        await this.viewCartButton.first().click();
        this.logger.log(`Clicked to view cart1231111`);
    }
}