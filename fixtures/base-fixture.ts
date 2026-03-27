// fixtures/base-fixture.ts
import { test as base } from '@playwright/test';
import { Logger } from '../utility/logger';
import { test as playwrighTest } from '@playwright/test'

type Fixtures = {
    schema: any;
    logger: Logger;
    step: (name: string, body: () => Promise<any>) => Promise<any>;
};

export const test = base.extend<Fixtures>({
    schema: [undefined, { option: true }],

    logger: async ({ }, use, testInfo) => {
        const logger = new Logger({ testInfo }); // Initialize your logger with test information
        await use(logger);
    },
    step: async ({ }, use, testInfo) => {
        // Initialize the counter if it does not exist yet (array stores [level1, level2, ...])
        if (!(testInfo as any)._stepCounter) {
            (testInfo as any)._stepCounter = [0];
        }

        let counter = (testInfo as any)._stepCounter;

        const customStep = async (name: string, body: () => Promise<any>) => {
            if (counter.length === 0) {
                counter.push(0);
            }
            counter[counter.length - 1]++; // Increment the current level number
            const id = counter.join('.');

            return await playwrighTest.step(`Step ${id}: ${name}`, async () => {
                counter.push(0); // Enter child level
                try {
                    return await body();
                } finally {
                    counter.pop(); // Exit child level
                }
            });
        };

        await use(customStep);
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

    }
});
export const expect = base.expect;
