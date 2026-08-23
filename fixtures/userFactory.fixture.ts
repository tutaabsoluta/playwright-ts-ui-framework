import { test as base } from '@playwright/test';
import { UserFactory } from '../utils/UserFactory'
import { UUIDAdapter } from "../adapters/UUIDAdapter";

type Fixtures = {
    testUser: {
        email: string;
        password: string;
    }
}

export const test = base.extend<Fixtures>({
    testUser: async ({}, use) => {
        const uuidAdapter = new UUIDAdapter()
        const dataFactory = new UserFactory(uuidAdapter)

        const user = {
            email: dataFactory.generateUniqueEmail(),
            password: dataFactory.generatePassword(),
        }

        await use(user);
    }
   
})