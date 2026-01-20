// tests/fixtures/data-fixture.ts
import { test as base, expect } from '@playwright/test';
import { DataLoader } from '../utility/data';
import Path from 'path';

// Define the shape of your new fixtures
type DataFixture = {
    getDataBeforeEach: Record<string, any>;
};

// Initialize DataLoader with the path to your JSON data file


// Extend the base test
export const test = base.extend<DataFixture>({
    getDataBeforeEach: async ({ }, use, testInfo) => {
        let fullPath: string | null = null;
        // --- Setup (Initialization logic) ---
        let caseId = testInfo.title.split('-')[0].trim();
        const dataLoader = new DataLoader('');
        fullPath = dataLoader.findFile(`${caseId}.spec.ts`, Path.join(__dirname, '..'));
        const caseData = dataLoader.getDataFromJson(Path.dirname(fullPath?.toString() || '') + Path.sep + 'data' + `.json`);
        try {
            if (caseId in caseData) {
                console.log(`Loaded data for case ID: ${caseId}`);
                await use(caseData[caseId]);
            }
        } catch (error) {
            console.error(`No data created for: ${caseId}`, error);
            await use({});
        }
        // Pass the initialized data to the actual test
    },
});

export { expect } from '@playwright/test';