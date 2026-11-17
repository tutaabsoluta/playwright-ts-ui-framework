import { APIRequestContext } from '@playwright/test';
import { Brand, Product, UserDetail } from '../types/Api';
import { User } from '../types/User';
import { parseApiResponse } from './parseApiResponse';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

/** Client for the public API documented at https://automationexercise.com/api_list */
export class AutomationExerciseApi {
    constructor(private readonly request: APIRequestContext) {}

    getProducts() {
        return this.call<{ products: Product[] }>('GET', '/api/productsList');
    }

    getBrands() {
        return this.call<{ brands: Brand[] }>('GET', '/api/brandsList');
    }

    /** Omit `term` to send the request without the required parameter. */
    searchProduct(term?: string) {
        return this.call<{ products: Product[] }>(
            'POST',
            '/api/searchProduct',
            term === undefined ? undefined : { search_product: term },
        );
    }

    verifyLogin(credentials: { email?: string; password?: string }) {
        return this.call('POST', '/api/verifyLogin', credentials);
    }

    createAccount(user: User) {
        return this.call('POST', '/api/createAccount', { ...user });
    }

    updateAccount(user: User) {
        return this.call('PUT', '/api/updateAccount', { ...user });
    }

    deleteAccount(email: string, password: string) {
        return this.call('DELETE', '/api/deleteAccount', { email, password });
    }

    getUserDetailByEmail(email: string) {
        return this.call<{ user: UserDetail }>('GET', `/api/getUserDetailByEmail?email=${encodeURIComponent(email)}`);
    }

    /** Raw call, e.g. to check that an endpoint rejects an unsupported method. */
    async call<T = object>(method: Method, path: string, form?: Record<string, string>) {
        const response = await this.request.fetch(path, { method, form });
        return parseApiResponse<T>(response);
    }
}
