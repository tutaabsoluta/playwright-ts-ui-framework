import { APIRequestContext } from "@playwright/test";
import { User } from "../types/User";



export class UserService {

    constructor(
        private readonly user: User
    ) { }

    async registerUser(request: APIRequestContext) {
        const url = 'https://automationexercise.com/api/createAccount';
        const response = await request.post(url, {
            form: {
                ...this.user
            }
        })
        return response.json()
    }

    async deleteUser(request: APIRequestContext) {
        const url = 'https://automationexercise.com/api/deleteAccount'
        const response = await request.delete(url, {
            data: {
                email: this.user.email,
                password: this.user.password
            }
        })
    }
}