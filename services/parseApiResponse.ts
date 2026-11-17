import { APIResponse } from '@playwright/test';

// The API always answers HTTP 200 (as text/html); the real status is the `responseCode` field in the JSON body.
export type ApiResult<T = object> = { responseCode: number; message?: string } & T;

export async function parseApiResponse<T = object>(response: APIResponse): Promise<ApiResult<T>> {
    const body = await response.text();
    try {
        return JSON.parse(body) as ApiResult<T>;
    } catch {
        // Error pages from the site ("queue full", the hosting's "One moment, please..." bot check)
        // are HTML: show their title or heading, which says what happened.
        const title = /<(?:title|h1|h2)[^>]*>([^<]+)</i.exec(body)?.[1].trim();
        const summary = title ? `an HTML page "${title}"` : `a non-JSON body: ${body.slice(0, 200)}`;
        throw new Error(`${response.url()} returned HTTP ${response.status()} and ${summary}`);
    }
}
