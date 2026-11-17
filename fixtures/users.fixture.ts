import { test as base } from './base.fixture';
import { LoginPage } from '../pages/LoginPage';
import { UserFactory } from '../utils/UserFactory';
import { UserService } from '../services/UserService.service';
import { UUIDAdapter } from '../adapters/UUIDAdapter';
import { User } from '../types/User';

type Users = {
    /** Fresh user data, NOT registered. The test registers it through the UI; deleted after the test. */
    newUser: User;
    /** User registered via API before the test; deleted after the test. */
    testUser: User;
    /** `testUser`, already logged in through the UI on the home page. */
    loggedInUser: User;
};

export const test = base.extend<Users>({
    newUser: async ({ request }, use) => {
        const user = new UserFactory(new UUIDAdapter()).generateUser();

        await use(user);
        await new UserService(user).deleteUser(request);
    },

    testUser: async ({ request }, use) => {
        const user = new UserFactory(new UUIDAdapter()).generateUser();
        const userService = new UserService(user);

        await userService.registerUser(request);
        await use(user);
        await userService.deleteUser(request);
    },

    loggedInUser: async ({ testUser, page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate('/login');
        await loginPage.login(testUser.email, testUser.password);
        await loginPage.header.loggedInAs.waitFor();

        await use(testUser);
    },
});
