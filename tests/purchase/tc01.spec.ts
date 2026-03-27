import { expect, test } from '../../fixtures/test-fixture';
import { userSchema } from '../../schemas/user.schema';

test.use(
     { schema: userSchema }
);

test("tc01- user can purchase an item successfully", async ({ testData, schema, step, basePage, loginPage, electronicComponentsSupplierPage, itemPreviewPage, checkoutPage }) => {

     console.log(testData);
     await step('User logs in to the application', async () => {
          await basePage.navigate('https://demo.testarchitect.com/my-account/');
          //await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
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
          expect(await checkoutPage.itemInCart(testData.itemName, testData.itemPrice), 'VP: Item should be in cart').toBeVisible();
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