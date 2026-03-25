import { step } from '../utility/decorator';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {

    get usernameInput() {
        return this.page.getByRole('textbox', { name: 'username' });
    }

    get passwordInput() {
        return this.page.getByRole('textbox', { name: 'password' });
    }

    get loginButton() {
        return this.page.getByRole('button', { name: 'log in' });
    }

    @step('Log in with username: {0}')
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        this.logger?.log(`User logged in: ${username}`);
    }
}