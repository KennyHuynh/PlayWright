import { expect, test } from '../../fixtures/data-fixture';
import { BasePage } from '../../page-objects/base.page';
import { LoginPage } from '../../page-objects/login.page';
import { ElectronicComponentsSupplierPage } from '../../page-objects/electronic-components-supplier.page';
import { ItemPreview } from '../../page-objects/item-preview';
import { CheckoutPage } from '../../page-objects/checkout.page';
import { config } from '../../configuration/config';

test("tc01- user can purchase an item successfully", async ({ page, getDataBeforeEach }) => {

    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    const electronicComponentsSupplierPage = new ElectronicComponentsSupplierPage(page);
    const itemPreview = new ItemPreview(page);
    const checkoutPage = new CheckoutPage(page);

    console.log(getDataBeforeEach);

    await basePage.navigate('https://demo.testarchitect.com/my-account/');
    await loginPage.login(config.TEST_USERNAME, config.TEST_PASSWORD);
    await basePage.openMenuItem('All departments -> Electronic Components & Supplies');

    await expect.soft(electronicComponentsSupplierPage.activeGridModeGeneric, 'element should be visible').toBeVisible();
    await electronicComponentsSupplierPage.listModeGeneric.click()
    await expect(electronicComponentsSupplierPage.activeListModeGeneric).toBeVisible();
    await electronicComponentsSupplierPage.selectAnItem(getDataBeforeEach.itemName);
    await itemPreview.addToCartButton.click();
    await itemPreview.clickToCart();
    await expect(checkoutPage.verifyItemInCart(getDataBeforeEach.itemName, getDataBeforeEach.itemPrice)).toBeTruthy();
    await checkoutPage.proceedToCheckout();

    await checkoutPage.fillBillingDetails({
        firstName: getDataBeforeEach.firstName,
        lastName: getDataBeforeEach.lastName,
        country: getDataBeforeEach.country,
        streetAddress: getDataBeforeEach.streetAddress,
        city: getDataBeforeEach.city,
        state: getDataBeforeEach.state,
        zipCode: getDataBeforeEach.zipCode,
        phone: getDataBeforeEach.phone,
        email: getDataBeforeEach.email
    });
});