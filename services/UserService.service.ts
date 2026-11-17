import { APIRequestContext, APIResponse } from '@playwright/test';
import { User } from '../types/User';

// The API always answers HTTP 200; the real status is the `responseCode` field in the JSON body.
type ApiResult = { responseCode: number; message: string };

export class UserService {
    constructor(private readonly user: User) {}

    async registerUser(request: APIRequestContext) {
        const response = await request.post('/api/createAccount', {
            form: {
                ...this.user,
            },
        });
        const result = await this.parse(response);
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
        const result = await this.parse(response);
        // 404 is fine: the test may have failed before the user was registered
        if (result.responseCode !== 200 && result.responseCode !== 404) {
            throw new Error(`Could not delete user ${this.user.email}: ${result.responseCode} ${result.message}`);
        }
        return result;
    }

    private async parse(response: APIResponse): Promise<ApiResult> {
        const body = await response.text();
        try {
            return JSON.parse(body);
        } catch {
            throw new Error(
                `${response.url()} returned HTTP ${response.status()} and a non-JSON body: ${body.slice(0, 200)}`,
            );
        }
    }
}
