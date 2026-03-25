import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Logger } from '../utility/logger';
import { step } from '../utility/decorator';
import { TestInfo } from '@playwright/test';


export class ElectronicComponentsSupplierPage extends BasePage {
    readonly activeGridModeGeneric: Locator;
    readonly gridModeGeneric: Locator;
    readonly activeListModeGeneric: Locator;
    readonly listModeGeneric: Locator;
    readonly randomItem: Locator;

    constructor(page: Page, logger: Logger, testInfo: TestInfo) {
        super(page, logger, testInfo)
        this.activeGridModeGeneric = page.locator('.switch-grid.switcher-active');
        this.gridModeGeneric = page.locator('.switch-grid');
        this.activeListModeGeneric = page.locator('.switch-list.switcher-active');
        this.listModeGeneric = page.locator('.switch-list');
        this.randomItem = page.locator('h2.product-title a');
    }

    @step('Select the item: {0}')
    async selectAnItem(item: string): Promise<void> {
        let firstItem = this.randomItem.filter({ hasText: item });
        firstItem.click()
        this.logger?.debug(`Selected item: ${item}`);
    }

    @step('Switch to grid mode')
    async switchToGridMode(): Promise<void> {
        if (await this.activeGridModeGeneric.isVisible()) {
            this.logger?.debug('Already in grid mode.');
        } else {
            await this.gridModeGeneric.click();
            this.logger?.debug('Switched to grid mode.');
        }
    }

    @step('Switch to list mode')
    async switchToListMode(): Promise<void> {
        if (await this.activeListModeGeneric.isVisible()) {
            this.logger?.debug('Already in list mode.');
        } else {
            await this.listModeGeneric.click();
            this.logger?.debug('Switched to list mode.');
        }
    }
}