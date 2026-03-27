// fixtures/base-fixture.ts
import { test as base } from '../fixtures/base-fixture';
import { DataLoader } from '../utility/data';
import Path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

type TestData = Record<string, any>;

type Fixtures = {
    testData: TestData;
};

export const test = base.extend<Fixtures>({
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
    }
});

export const expect = test.expect;

