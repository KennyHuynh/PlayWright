import { expect, test } from '../../fixtures/data-fixture';
import { BasePage } from '../../page-objects/base.page';
import { LoginPage } from '../../page-objects/login.page';

test("tc02- user can log in successfully", async ({ page, getDataBeforeEach }) => {

    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);

    console.log(getDataBeforeEach);

    await basePage.navigate('https://demo.testarchitect.com/my-account/');
    await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
});