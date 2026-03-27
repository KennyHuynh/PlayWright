import { expect, test } from '../../fixtures/test-fixture';
import { loginSchema } from '../../schemas/login.schema';
import { purchaseSchema } from '../../schemas/purchase.schema';
import { Locator } from '@playwright/test';

test.use(
     { schema: [loginSchema, purchaseSchema] }
);

test("tc01- user can purchase an item successfully", async ({ testData, step, basePage, loginPage, electronicComponentsSupplierPage, itemPreviewPage, checkoutPage }) => {

     console.log(testData);
     await step('User logs in to the application', async () => {
          await basePage.navigate('https://demo.testarchitect.com/my-account/');
          await loginPage.login(testData.username, testData.password)
     });

     await step('Switch to list view mode', async () => {
          await basePage.openMenuItem('All departments -> Electronic Components & Supplies');
          await expect.soft(electronicComponentsSupplierPage.activeGridModeGeneric, 'VP: Grid mode should be active').toBeVisible();
          await electronicComponentsSupplierPage.switchToListMode();
          await expect(electronicComponentsSupplierPage.activeListModeGeneric, 'VP: List mode should be active').toBeVisible();
     });

     await step('Select an item, add to cart and proceed to checkout', async () => {
          await electronicComponentsSupplierPage.selectAnItem(testData.itemName);
          await itemPreviewPage.addToCart();
          await expect.soft(checkoutPage.getItemInCart(testData.itemName, testData.itemPrice), 'VP: Grid mode should be active').toBeVisible();
          await itemPreviewPage.openCart();
          await checkoutPage.proceedToCheckout();
     });

     await step('Filling bill information', async () => {
          await checkoutPage.fillBillingDetails({
               firstName: testData.firstName,
               lastName: testData.lastName,
               country: testData.country,
               streetAddress: testData.streetAddress,
               city: testData.city,
               state: testData.state,
               zipCode: testData.zipCode,
               phone: testData.phone,
               email: testData.email
          });
     });
});