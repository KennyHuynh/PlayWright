import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ItemPreview extends BasePage {
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.getByRole('button', { name: 'ADD TO CART' });
    }
}