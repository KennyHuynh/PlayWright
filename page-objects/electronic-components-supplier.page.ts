import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ElectronicComponentsSupplierPage extends BasePage {
    readonly activeGridModeGeneric: Locator;
    readonly gridModeGeneric: Locator;
    readonly activeListModeGeneric: Locator;
    readonly listModeGeneric: Locator;
    readonly randomItem: Locator;

    constructor(page: Page) {
        super(page)
        this.activeGridModeGeneric = page.locator('.switch-grid.switcher-active');
        this.gridModeGeneric = page.locator('.switch-grid');
        this.activeListModeGeneric = page.locator('.switch-list.switcher-active');
        this.listModeGeneric = page.locator('.switch-list');
        this.randomItem = page.locator('h2.product-title a');
    }

    async selectAnItem(item: string): Promise<void> {
        let firstItem = this.randomItem.filter({ hasText: item });
        firstItem.click()
        console.log(`Selected item: ${item}`);
    }
}