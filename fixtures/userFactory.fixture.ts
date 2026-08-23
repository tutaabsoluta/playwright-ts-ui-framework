import { test as base } from '@playwright/test';
import { UserFactory } from '../utils/UserFactory'
import { UserService } from '../services/UserService.service';
import { UUIDAdapter } from "../adapters/UUIDAdapter";

type Fixtures = {
    testUser: {
        email: string;
        password: string;
    }
}

export const test = base.extend<Fixtures>({
    testUser: async ({request}, use) => {
        const uuidAdapter = new UUIDAdapter()
        const dataFactory = new UserFactory(uuidAdapter)
        const user = dataFactory.generateUser()
        const userService = new UserService(user)

        const credentials = {
            email: user.email,
            password: user.password,
        }

        await use(credentials);
        await userService.deleteUser(request)
    }
   
})