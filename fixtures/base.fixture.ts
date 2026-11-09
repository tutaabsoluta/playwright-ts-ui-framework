import { test as base } from '@playwright/test';

// Third-party ad scripts on automationexercise.com inject overlays and slow down
// navigation, which makes clicks flaky (especially on WebKit). Block them.
const AD_HOSTS = /googlesyndication|doubleclick|googleadservices|adservice\.google|fundingchoicesmessages/;

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.route(AD_HOSTS, route => route.abort());
        await use(page);
    }
})
