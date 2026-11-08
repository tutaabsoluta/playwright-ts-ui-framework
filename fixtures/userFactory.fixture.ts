import { test as base } from './base.fixture';
import { UserFactory } from '../utils/UserFactory'
import { UserService } from '../services/UserService.service';
import { UUIDAdapter } from "../adapters/UUIDAdapter";
import { User } from '../types/User';

type Fixtures = {
    testUser: User
}

export const test = base.extend<Fixtures>({
    testUser: async ({request}, use) => {
        const uuidAdapter = new UUIDAdapter()
        const dataFactory = new UserFactory(uuidAdapter)
        const user = dataFactory.generateUser()
        const userService = new UserService(user)

        await use(user);
        await userService.deleteUser(request)
    }
   
})
