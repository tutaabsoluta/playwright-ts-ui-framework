import { mergeTests } from '@playwright/test';
import { test as pagesTest } from './pages.fixture';
import { test as usersTest } from './users.fixture';
import { test as apiTest } from './api.fixture';

// Single entry point for specs: page objects + user lifecycle + API client fixtures.
export const test = mergeTests(pagesTest, usersTest, apiTest);
export { expect } from '@playwright/test';
