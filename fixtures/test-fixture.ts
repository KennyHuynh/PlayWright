// tests/fixtures/data-fixture.ts
import { test as base } from '../fixtures/page-fixture';

export const test = base;

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

export const expect = test.expect;