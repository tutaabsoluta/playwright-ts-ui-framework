import { LoginPage } from '../pages/LoginPage';
import { test as base } from '@playwright/test';


type Fixtures = {
    loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});