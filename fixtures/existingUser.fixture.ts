import { test as base } from '@playwright/test';
import { UUIDAdapter } from '../adapters/UUIDAdapter';
import { UserFactory } from '../utils/UserFactory';
import { UserService } from '../services/UserService.service';



// este fixture debe hacer lo  siguiente
// 1. Crear el usuario por medio del API
// 2. Exponerlo para usarlo en el login
// 3. Borrarlo en el teardown/cleanup

type Fixtures = {
    testUser: {
        name: string;
        email: string;
        password: string;
        title: string;
        birth_date: string;
        birth_month: string;
        birth_year: string;
        firstname: string;
        lastname: string;
        company: string;
        address1: string;
        address2: string;
        zipcode: string;
        state: string;
        city: string;
        mobile_number: string;
    }
}

export const test = base.extend<Fixtures>({
    testUser: async ({request}, use) => {
        const uuidAdapter = new UUIDAdapter();
        const dataFactory = new UserFactory(uuidAdapter);
        const user = dataFactory.generateUser();
        const userService = new UserService(user);

        await userService.registerUser(request);

        await use(user)
        await userService.deleteUser(request)
    }
})