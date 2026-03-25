import { step } from '../utility/decorator';
import { BasePage } from './base.page';

export class ItemPreviewPage extends BasePage {
    
    get addToCartButton() {
        return this.page.getByRole('button', { name: 'ADD TO CART' });
    }

    @step('Click on ADD TO CART button')
    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
        this.logger.log(`Clicked on 'ADD TO CART' button`);
    }
}