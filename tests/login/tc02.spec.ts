import { expect, test } from '../../fixtures/data-fixture';
import { BasePage } from '../../page-objects/base.page';
import { LoginPage } from '../../page-objects/login.page';

test("tc02- user can log in successfully", async ({ page, data }) => {

    const loginPage = new LoginPage(page, null as unknown as any);
    // const basePage = new BasePage(page);
    loginPage.navigate

    console.log(data);

    await loginPage.navigate('https://demo.testarchitect.com/my-account/');
    await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
});