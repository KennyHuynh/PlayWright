import { expect, test } from '../../fixtures/test-fixture';

test("tc02- user can log in successfully", async ({ page, testData, loginPage }) => {


    // const basePage = new BasePage(page);
    loginPage.navigate

    console.log(testData);

    await loginPage.navigate('https://demo.testarchitect.com/my-account/');
    await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
});