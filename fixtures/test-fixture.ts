// tests/fixtures/data-fixture.ts
import { test as base, expect, TestInfo, TestStepInfo } from '@playwright/test';
import { test as playwrighTest } from '@playwright/test'
import { DataLoader } from '../utility/data';
import { Logger } from '../utility/logger';  // Import Logger nếu bạn có một lớp Logger riêng
import Path from 'path';
import { BasePage } from '../page-objects/base.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { ElectronicComponentsSupplierPage } from '../page-objects/electronic-components-supplier.page';
import { ItemPreviewPage } from '../page-objects/item-preview.page';
import { LoginPage } from '../page-objects/login.page';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);
type TestData = Record<string, any>;

type TestMetaData = {
    parentStepNumber: number,
    childStepNumber: number
};

// Define the shape of your new fixtures
type Fixtures = {
    schema: any,
    testData: TestData;
    logger: Logger; // Replace 'any' with the actual type of your logger if available
    step: (name: string, body: () => Promise<any>) => Promise<any>;
    basePage: BasePage;
    loginPage: LoginPage;
    electronicComponentsSupplierPage: ElectronicComponentsSupplierPage;
    itemPreviewPage: ItemPreviewPage;
    checkoutPage: CheckoutPage;
    _stepCount: number;
    constants: TestMetaData;
};


// Extend the base test
export const test = base.extend<Fixtures>({

    schema: [undefined, { option: true }],

    testData: async ({ schema }, use, testInfo) => {
        let fullPath: string | null = null;
        // --- Setup (Initialization logic) ---
        let caseId = testInfo.title.split('-')[0].trim();
        const dataLoader = new DataLoader('');
        fullPath = dataLoader.findFile(`${caseId}.spec.ts`, Path.join(__dirname, '..'));
        const caseData = dataLoader.getDataFromJson(Path.dirname(fullPath?.toString() || '') + Path.sep + 'data' + `.jsonnet`);
        try {
            if (caseId in caseData) {
                console.log(`Loaded data for case ID: ${caseId}`);
                let realCaseData = caseData[caseId];
                if (schema) {
                    const result = schema.safeParse(realCaseData);

                    if (!result.success) {
                        console.log('\n❌ INVALID TEST DATA');
                        console.log(`Test: ${testInfo.title}\n`);

                        for (const issue of result.error.issues) {
                            const field = issue.path.join('.') || '(root)';

                            console.log(`👉 Field: ${field}`);
                            console.log(`   Error: ${issue.message}\n`);
                        }

                        throw new Error(`Invalid test data → ${testInfo.title}`);
                    }
                }
                await use(realCaseData);
            }
        } catch (error) {
            console.error(`No data created for: ${caseId}`, error);
            await use({} as TestData); // Provide an empty object or handle as needed
        }
        // Pass the initialized data to the actual test
    },

    context: async ({ browser }, use) => {
        // --- Setup (Initialization logic) ---
        const context = await browser.newContext();
        await use(context);
        // --- Teardown (Cleanup logic) ---
        await context.close();
    },

    page: async ({ context }, use) => {
        // --- Setup (Initialization logic) ---
        const page = await context.newPage();
        await use(page);

    },
    logger: async ({ }, use, testInfo) => {
        const logger = new Logger({ testInfo }); // Initialize your logger with test information
        await use(logger);
    },

    step: async ({ }, use, testInfo) => {
        // Khởi tạo counter nếu chưa có (mảng lưu [level1, level2, ...])
        if (!(testInfo as any)._stepCounter) {
            (testInfo as any)._stepCounter = [0];
        }

        let counter = (testInfo as any)._stepCounter;

        const customStep = async (name: string, body: () => Promise<any>) => {
            if (counter.length === 0) {
                counter.push(0);
            }
            counter[counter.length - 1]++; // Tăng số ở level hiện tại
            const id = counter.join('.');

            return await playwrighTest.step(`Step ${id}: ${name}`, async () => {
                counter.push(0); // Vào level con
                try {
                    return await body();
                } finally {
                    counter.pop(); // Thoát level con
                }
            });
        };

        await use(customStep);
    },

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
    },
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshot = await page.screenshot();
        if (testInfo) {
            await testInfo.attach('failure screenshot', {
                body: screenshot,
                contentType: 'image/png'
            });
        }
    }
});

export { expect } from '@playwright/test';