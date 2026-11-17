import { APIResponse } from '@playwright/test';

// The API always answers HTTP 200 (as text/html); the real status is the `responseCode` field in the JSON body.
export type ApiResult<T = object> = { responseCode: number; message?: string } & T;

export async function parseApiResponse<T = object>(response: APIResponse): Promise<ApiResult<T>> {
    const body = await response.text();
    try {
        return JSON.parse(body) as ApiResult<T>;
    } catch {
        throw new Error(
            `${response.url()} returned HTTP ${response.status()} and a non-JSON body: ${body.slice(0, 200)}`,
        );
    }
}
