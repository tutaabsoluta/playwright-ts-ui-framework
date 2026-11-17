import { APIRequestContext } from '@playwright/test';
import { User } from '../types/User';
import { parseApiResponse } from './parseApiResponse';

export class UserService {
    constructor(private readonly user: User) {}

    async registerUser(request: APIRequestContext) {
        const response = await request.post('/api/createAccount', {
            form: {
                ...this.user,
            },
        });
        const result = await parseApiResponse(response);
        if (result.responseCode !== 201) {
            throw new Error(`Could not create user ${this.user.email}: ${result.responseCode} ${result.message}`);
        }
        return result;
    }

    async deleteUser(request: APIRequestContext) {
        const response = await request.delete('/api/deleteAccount', {
            form: {
                email: this.user.email,
                password: this.user.password,
            },
        });
        const result = await parseApiResponse(response);
        // 404 is fine: the test may have failed before the user was registered
        if (result.responseCode !== 200 && result.responseCode !== 404) {
            throw new Error(`Could not delete user ${this.user.email}: ${result.responseCode} ${result.message}`);
        }
        return result;
    }
}
