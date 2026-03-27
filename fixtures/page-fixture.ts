// fixtures/base-fixture.ts
import { test as base } from '../fixtures/data-fixture';
import { BasePage } from '../page-objects/base.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { ElectronicComponentsSupplierPage } from '../page-objects/electronic-components-supplier.page';
import { ItemPreviewPage } from '../page-objects/item-preview.page';
import { LoginPage } from '../page-objects/login.page';

type Fixtures = {
    step: (name: string, body: () => Promise<any>) => Promise<any>;
    basePage: BasePage;
    loginPage: LoginPage;
    electronicComponentsSupplierPage: ElectronicComponentsSupplierPage;
    itemPreviewPage: ItemPreviewPage;
    checkoutPage: CheckoutPage;
};

export const test = base.extend<Fixtures>({
    basePage: async ({ page, logger }, use, testInfo) => {
        const basePage = new BasePage(page, logger, testInfo);
        await use(basePage);
    },

    loginPage: async ({ page, logger }, use, testInfo) => {
        const loginPage = new LoginPage(page, logger, testInfo);
        await use(loginPage);
    },
    checkoutPage: async ({ page, logger }, use, testInfo) => {
        const checkoutPage = new CheckoutPage(page, logger, testInfo);
        await use(checkoutPage);
    },

    electronicComponentsSupplierPage: async ({ page, logger }, use, testInfo) => {
        const electronicComponentsSupplierPage = new ElectronicComponentsSupplierPage(page, logger, testInfo);
        await use(electronicComponentsSupplierPage);
    },
    itemPreviewPage: async ({ page, logger }, use, testInfo) => {
        const itemPreviewPage = new ItemPreviewPage(page, logger, testInfo);
        await use(itemPreviewPage);
    }
})

export const expect = test.expect;