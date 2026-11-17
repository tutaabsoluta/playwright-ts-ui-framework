import { mergeTests } from '@playwright/test';
import { test as pagesTest } from './pages.fixture';
import { test as usersTest } from './users.fixture';

// Single entry point for specs: page objects + user lifecycle fixtures.
export const test = mergeTests(pagesTest, usersTest);
export { expect } from '@playwright/test';
