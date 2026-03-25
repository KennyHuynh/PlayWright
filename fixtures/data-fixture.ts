import { test as base, expect, TestInfo } from '@playwright/test'; // Thêm TestInfo ở đây
import Path from 'path';
import { DataLoader } from '../utility/data';

type MyFixtures = {
  data: any;
  helloWorld1: string;
  helloWorld2: string;
};

export const test = base.extend<MyFixtures>({
  // Định nghĩa kiểu tường minh cho 'use' và 'testInfo'
  data: async ({ }, use: (value: any) => Promise<void>, testInfo: TestInfo) => {
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
    },
  
    helloWorld1: async ({ }, use: (value: string) => Promise<void>) => {
      await use('H1');
    },

      helloWorld2: async ({ }, use: (value: string) => Promise<void>) => {
        await use('H2');
      },
});

export { expect };