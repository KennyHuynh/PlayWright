import { step } from '../utility/decorator';
import { BasePage } from './base.page';

export class ItemPreviewPage extends BasePage {
    
    get addToCartButton() {
        return this.page.getByRole('button', { name: 'ADD TO CART' });
    }

    get cartToggle() {
        return this.page.locator('a.et-toggle', { hasText: "Cart" });
    }

    @step('Click on ADD TO CART button')
    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
        this.logger?.debug(`Clicked on 'ADD TO CART' button`);
    }

    @step('Open Cart')
    async openCart(): Promise<void> {
        await this.cartToggle.click();
        this.logger?.debug('Opened Cart toggle')
    }
}