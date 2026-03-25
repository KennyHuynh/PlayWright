import { expect, data_provider } from '../../fixtures/fake-data-provider';
import { BasePage } from '../../page-objects/base.page';
import { LoginPage } from '../../page-objects/login.page';
import { ElectronicComponentsSupplierPage } from '../../page-objects/electronic-components-supplier.page';
import { ItemPreviewPage } from '../../page-objects/item-preview.page';
import { CheckoutPage } from '../../page-objects/checkout.page';
import { Logger } from '../../utility/logger';
import test from 'node:test';

// 1. Chỉ truyền "tc01" để hàm tìm đúng key trong JSON
// 2. Tham số nhận vào là (data, { page }) - trong đó page lấy từ destructuring của Playwright
data_provider("tc03- purchase item", async ({ page, data, testInfo }) => {
    const logger = new Logger(testInfo.title);
    const loginPage = new LoginPage(page, logger);
    const basePage = new BasePage(page, logger);
    const electronicComponentsSupplierPage = new ElectronicComponentsSupplierPage(page, logger);
    const itemPreview = new ItemPreviewPage(page, logger);
    const checkoutPage = new CheckoutPage(page, logger);

    await basePage.navigate('https://demo.testarchitect.com/my-account/');
    await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
    await basePage.openMenuItem('All departments -> Electronic Components & Supplies');

    await expect.soft(electronicComponentsSupplierPage.activeGridModeGeneric, 'element should be visible').toBeVisible();
    await electronicComponentsSupplierPage.listModeGeneric.click();
    await expect(electronicComponentsSupplierPage.activeListModeGeneric).toBeVisible();
    
    // Thay thế getDataBeforeEach bằng data
    await electronicComponentsSupplierPage.selectAnItem(data.itemName);
    await itemPreview.addToCartButton.click();
    await itemPreview.clickToCart();
    
    await expect(await checkoutPage.itemInCart(data.itemName, data.itemPrice)).toBeVisible();
    await checkoutPage.proceedToCheckout();

    await checkoutPage.fillBillingDetails({
        firstName: data.firstName,
        lastName: data.lastName,
        country: data.country,
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        phone: data.phone,
        email: data.email
    });
});