# playwright-ts-ui-framework

[![Playwright Tests](https://github.com/tutaabsoluta/playwright-ts-ui-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/tutaabsoluta/playwright-ts-ui-framework/actions/workflows/playwright.yml)
[![Allure Report](https://img.shields.io/badge/Allure-report-orange?logo=qameta)](https://tutaabsoluta.github.io/playwright-ts-ui-framework/)

📊 **Latest test report:** https://tutaabsoluta.github.io/playwright-ts-ui-framework/

End-to-end UI automation framework for [automationexercise.com](https://automationexercise.com), built with **Playwright** and **TypeScript**. It uses the Page Object Model, custom Playwright fixtures that manage test data through the site's API, and runs on GitHub Actions across Chromium, Firefox and WebKit.

## Framework overview

- **Playwright Test** as the runner, with web-first, auto-retrying assertions.
- **Page Object Model**: page classes expose `Locator`s and small action methods; assertions stay in the specs.
- **API-backed test data**: every test gets its own throwaway user, created through the public API before the test and deleted after it. Tests are therefore independent and run fully in parallel.
- **Cross-browser**: Chromium, Firefox and WebKit projects are configured in `playwright.config.ts`.
- **UI + API**: besides the UI flows, the site's public REST API is tested in a browserless `api` project.
- **Tagged test sets**: `@smoke` (critical flows, run on every push and pull request) and `@regression` (everything, run nightly).
- **CI/CD**: GitHub Actions runs each suite as a parallel job and publishes an Allure dashboard with history to GitHub Pages.

## Tech stack

| Tool                                           | Purpose                                       |
| ---------------------------------------------- | --------------------------------------------- |
| [@playwright/test](https://playwright.dev)     | Test runner, browser automation, API requests |
| TypeScript                                     | Typed tests, page objects and services        |
| [uuid](https://www.npmjs.com/package/uuid)     | Unique emails for generated users             |
| [dotenv](https://www.npmjs.com/package/dotenv) | Loads optional variables from `.env`          |
| ESLint + `eslint-plugin-playwright`            | Linting, including Playwright best practices  |
| Prettier                                       | Code formatting                               |
| Allure Report 3 + `allure-playwright`          | Test report dashboard with history and trends |
| GitHub Actions + GitHub Pages                  | Continuous integration, report hosting        |

## Architecture

```
├── playwright.config.ts        # baseURL, browser projects, retries, reporter
├── adapters/
│   └── UUIDAdapter.ts          # wraps uuid v4 so it can be swapped or mocked
├── utils/
│   └── UserFactory.ts          # builds a User with a unique email (user<uuid>@mail.com)
├── types/
│   ├── User.ts                 # User interface, mirrors the createAccount API fields
│   ├── PaymentCard.ts          # card details for the payment form
│   └── Api.ts                  # API response models: Product, Brand, UserDetail
├── data/
│   └── paymentCards.ts         # test card built from the user's name
├── services/
│   ├── AutomationExerciseApi.ts # typed client for every endpoint of the public API
│   ├── UserService.service.ts  # create/delete the test users (checks responseCode)
│   └── parseApiResponse.ts     # shared JSON parsing with clear errors
├── fixtures/
│   ├── index.ts                # single entry point: mergeTests(pages, users, api) + expect
│   ├── base.fixture.ts         # overrides page to block third-party ad requests
│   ├── pages.fixture.ts        # one fixture per page object
│   ├── users.fixture.ts        # newUser, testUser, loggedInUser
│   └── api.fixture.ts          # api (AutomationExerciseApi)
├── pages/
│   ├── BasePage.ts             # header, navigate(), wait for page scripts after navigation
│   ├── components/
│   │   ├── HeaderComponent.ts  # nav links, "Logged in as", goToProducts/goToCart/goToSignupLogin
│   │   └── CartModalComponent.ts # "Added!" modal: Continue Shopping / View Cart
│   ├── LoginPage.ts            # login form and error
│   ├── RegisterPage.ts         # signup form, account information form, "Account Created!"
│   ├── ProductsPage.ts         # product grid, search, add to cart, view product
│   ├── ProductDetailsPage.ts   # name, category, price, availability, quantity
│   ├── CartPage.ts             # cart rows, quantities, Proceed To Checkout
│   ├── CheckoutPage.ts         # address details, order review, comment, Place Order
│   ├── PaymentPage.ts          # card form, Pay and Confirm Order
│   └── OrderPlacedPage.ts      # order confirmation
├── tests/
│   ├── api/                    # browserless, runs in the `api` project
│   ├── auth/
│   ├── products/
│   ├── cart/
│   └── checkout/
├── allurerc.mjs                # Allure report name, grouping and history
├── eslint.config.mjs
└── .github/workflows/playwright.yml
```

### How the layers fit together

```
UUIDAdapter ──► UserFactory ──► User ──► UserService (API) ──► Fixture ──► Spec ──► Page Objects
```

1. **Adapter → Factory**: `UUIDAdapter` is injected into `UserFactory`, which returns a fully populated `User` with a unique email.
2. **Service**: `UserService` uses Playwright's `APIRequestContext` to create and delete the account through the site's API. The API always answers HTTP 200, so it checks the `responseCode` in the JSON body and throws a clear error when setup fails.
3. **Fixtures** own the data lifecycle and are combined with `mergeTests` in `fixtures/index.ts`:
   - `testUser` → register via API → run the test → delete the user.
   - `loggedInUser` → `testUser` already logged in through the UI, so specs start on the home page as a signed-in user.
   - `newUser` → user data that is not registered, so the test can register through the UI → deleted afterwards.
   - `loginPage`, `productsPage`, `cartPage`, … → one fixture per page object.
   - `api` → typed client for the site's API, used by the API tests.
   - `base.fixture` → blocks ad requests that otherwise make clicks flaky.
4. **Page objects** extend `BasePage`, expose `public readonly` locators and action methods, and share the `header` component. Navigation methods wait until the new page's scripts are loaded, because many buttons on the site only get their click handlers at the end of the page. Assertions stay in the specs.
5. **Specs** import `test` and `expect` from `fixtures` and request only the fixtures they need:

```ts
import { test, expect } from '../../fixtures';

test('Should view cart', async ({ productsPage, cartPage, loggedInUser }) => {
  await productsPage.header.goToProducts();
  const productId = await productsPage.addProductToCart(0);
  await productsPage.cartModal.continueShopping();
  await productsPage.header.goToCart();

  await expect(cartPage.productRow(productId)).toBeVisible();
});
```

### Conventions

- Spec files are named `tests/<feature>/<feature>-NNN.spec.ts`, with one `describe` per file. UI specs have one `test` per file; API specs group the positive and negative cases of one endpoint.
- Every `describe` is tagged `@regression`; critical flows are also tagged `@smoke` (`test('…', { tag: '@smoke' }, …)`). API specs are also tagged `@api`.
- Selector priority: `data-qa` attributes → ids → `getByRole` / `getByText` → CSS classes.
- Navigation uses relative paths (`navigate('/')`); `baseURL` comes from the config.

## Covered test suites

Specs marked 🔥 are part of the `@smoke` set; every spec is part of `@regression`.

### UI (Chromium, Firefox, WebKit)

| Suite        | Spec              | Scenario                                         | Assertions                                                                       |
| ------------ | ----------------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| **Auth**     | `auth-001`        | Register a new user through the UI               | "Enter Account Information" form visible; `Account Created!` shown               |
|              | `auth-002` 🔥     | Log in with valid credentials                    | "Logged in as" shows the user's name                                             |
|              | `auth-003`        | Log in with invalid credentials                  | Error `Your email or password is incorrect!` shown                               |
| **Products** | `products-001` 🔥 | View all products                                | Product grid not empty; first card shows image, name, price and Add to cart      |
|              | `products-002`    | View product details                             | `Blue Top`, `Category: Women > Tops`, `Rs. 500`, `Availability: In Stock`        |
|              | `products-003`    | Search for a product                             | Searching `shirt` returns results containing "shirt"                             |
| **Cart**     | `cart-001` 🔥     | Add a product to the cart                        | "Added!" modal visible                                                           |
|              | `cart-002`        | View the cart                                    | Empty-cart message hidden; row of the added product visible                      |
|              | `cart-003`        | Set quantity on the product page and add to cart | Cart row shows the selected quantity                                             |
| **Checkout** | `checkout-001`    | Proceed to checkout                              | URL `/checkout`; Address Details, Review Your Order and delivery address visible |
|              | `checkout-002` 🔥 | Place an order and pay                           | URL `/payment_done/...`; `Order Placed!` shown                                   |
|              | `checkout-003`    | Order confirmation page                          | `Order Placed!`, confirmation message, Download Invoice and Continue visible     |

### API (`api` project, no browser)

| Spec         | Endpoint                       | Cases                                                                                     |
| ------------ | ------------------------------ | ----------------------------------------------------------------------------------------- |
| `api-001` 🔥 | `/api/productsList`            | GET returns all products (first one fully checked); POST → 405                            |
| `api-002`    | `/api/brandsList`              | GET returns all brands with `id` and `brand`; PUT → 405                                   |
| `api-003`    | `/api/searchProduct`           | POST `top` returns only matching products; missing parameter → 400                        |
| `api-004`    | `/api/verifyLogin`             | Valid credentials → 200; invalid → 404; missing email → 400; DELETE → 405                 |
| `api-005`    | create / get / update / delete | Full account lifecycle in steps: create → read → update → read → delete → not found (404) |

The API always answers HTTP 200; the specs assert the `responseCode` and `message` fields of the JSON body.

## Getting started

### Prerequisites

- Node.js (LTS)
- npm

### Installation

```bash
npm ci
npx playwright install --with-deps
```

No environment variables are required: test users are created on the fly through the API.

### Running tests

```bash
npm test                                   # all tests, Chromium only
npm run test:all                           # all tests on Chromium, Firefox and WebKit (as in CI)
npm run test:headed                        # Chromium, with the browser visible
npm run test:ui                            # Playwright UI mode
npm run test:smoke                         # @smoke set, all browsers + API
npm run test:regression                    # @regression set (everything)
npm run test:api                           # API tests only
npx playwright test tests/cart             # a single suite
npm run report                             # open the last Playwright HTML report
npm run allure:generate                    # build the Allure report from allure-results/
npm run allure:open                        # serve the generated Allure report
```

### Code quality

```bash
npm run lint          # ESLint (TypeScript + Playwright rules, e.g. missing awaits)
npm run lint:fix
npm run format        # Prettier, writes changes
npm run format:check
npm run typecheck     # tsc --noEmit
```

> automationexercise.com is a shared public site and can answer with "queue full" or 520 errors under load, and its hosting shows a "One moment, please..." bot check to clients that send too many requests. That's why CI runs `@smoke` on push and the full `@regression` set only nightly. If many tests fail at once when running everything locally, limit parallelism with `--workers=2` (the value CI uses).

## CI/CD

The workflow in [.github/workflows/playwright.yml](.github/workflows/playwright.yml) runs the test set that fits each trigger:

| Trigger                             | Test set                          |
| ----------------------------------- | --------------------------------- |
| Pull request to `main`/`master`     | `@smoke`                          |
| Push to `main`/`master`             | `@smoke`                          |
| Nightly schedule (03:00 UTC)        | `@regression`                     |
| Manual (**Actions → Run workflow**) | choose suite and smoke/regression |

- **Container**: jobs run in the official `mcr.microsoft.com/playwright` image, which already contains the browsers and their system dependencies. Its tag must match the `@playwright/test` version in `package-lock.json`.
- **Install job**: runs `npm ci` once and caches `node_modules` (keyed on `package-lock.json`). The other jobs only restore that cache.
- **Quality job**: Prettier check, ESLint and `tsc --noEmit`. The test jobs only start if it passes.
- **Matrix**: one job per suite (`api`, `auth`, `cart`, `checkout`, `products`), filtered by the tag above, with 2 workers. At most 2 suites run at the same time (`max-parallel: 2`), because the site answers "queue full" (503) when too many sessions hit it at once. UI suites run on all three browsers. `fail-fast` is off, so one failing suite doesn't cancel the others.
- **Reports**: each job uploads its Playwright HTML report as `playwright-report-<suite>` (kept for 30 days) and its raw Allure results as `allure-results-<suite>`.
- **Allure on GitHub Pages**: on full regression runs on `main`/`master` (nightly, or manual with suite `all` and `regression`), the `allure-report` job merges the results of all suites into one Allure report, and `deploy-report` publishes it to [GitHub Pages](https://tutaabsoluta.github.io/playwright-ts-ui-framework/). It runs even when tests fail. The Allure history is kept in the Actions cache, so the report shows trends, retries and flaky tests across runs. Failed tests include a screenshot, a video and, on retries, the Playwright trace.

> One-time setup: in the repository go to **Settings → Pages** and set **Source** to **GitHub Actions**.

On CI the config enables `forbidOnly`, 2 retries, and traces on the first retry.

## Roadmap

- A `Dockerfile` to run the suite locally in the same Playwright image CI uses.
- Upgrade to Playwright ≥ 1.62 (CI image tag included) to use the latest `allure-playwright`.
- More flows: logout, duplicate email signup, remove from cart, contact form, invoice download.
