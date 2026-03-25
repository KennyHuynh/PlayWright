import { DataLoader } from '../utility/data';
import Path from 'path';
import { test, expect } from './data-fixture';
import { BasePage } from '../page-objects/base.page';
import { fileURLToPath } from 'url';
import { CheckoutPage } from '../page-objects/checkout.page';
import { ElectronicComponentsSupplierPage } from '../page-objects/electronic-components-supplier.page';

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

export { expect };

export function data_provider(
    fullTitle: string,
    testLogic: (fixtures: any) => Promise<void>
) {
    const dataLoader = new DataLoader('');
    // Lấy ID làm key (giữ nguyên hoặc lowercase tùy quy ước của bạn)
    const caseId = fullTitle.split('-')[0].trim(); 

    const fullPath = dataLoader.findFile(`${caseId}.spec.ts`, Path.join(__dirname, '..'));
    if (!fullPath) {
        console.error(`❌ Không tìm thấy file spec cho ID: ${caseId}`);
        return;
    }

    const jsonPath = Path.join(Path.dirname(fullPath), 'data.json');
    const allData = dataLoader.getDataFromJson(jsonPath);
    const rawData = allData[caseId];

    if (!rawData) {
        console.warn(`⚠️ Không có dữ liệu cho ${caseId} trong ${jsonPath}`);
        return;
    }

    const dataSets = Array.isArray(rawData) ? rawData : [rawData];

    dataSets.forEach((item, index) => {
        const displayTitle = dataSets.length > 1 ? `${fullTitle} (Set ${index + 1})` : fullTitle;
         test.describe(() => {
            test.use({ data: item }); // Đây là cách Playwright "bơm" dữ liệu vào fixture

            test(displayTitle, async ({page, data, helloWorld1, helloWorld2}) => {
                // Bây giờ fixtures.data sẽ chứa nội dung của 'item'
                const allFixtures = { page, data, helloWorld1, helloWorld2 };
                await testLogic(allFixtures);
            });
        });
    });
}