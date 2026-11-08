# playwright-ts-ui-framework

End-to-end UI automation framework for [automationexercise.com](https://automationexercise.com), built with **Playwright** and **TypeScript**. It uses the Page Object Model, custom Playwright fixtures that manage test data through the site's API, and runs on GitHub Actions across Chromium, Firefox and WebKit.

## Framework overview

- **Playwright Test** as the runner, with web-first, auto-retrying assertions.
- **Page Object Model**: page classes expose `Locator`s and small action methods; assertions stay in the specs.
- **API-backed test data**: every test gets its own throwaway user, created through the public API before the test and deleted after it. Tests are therefore independent and run fully in parallel.
- **Cross-browser**: Chromium, Firefox and WebKit projects are configured in `playwright.config.ts`.
- **CI/CD**: GitHub Actions runs the whole suite on every push and pull request to `main`/`master` and publishes the HTML report as an artifact.

## Tech stack

| Tool | Purpose |
|---|---|
| [@playwright/test](https://playwright.dev) | Test runner, browser automation, API requests |
| TypeScript | Typed tests, page objects and services |
| [uuid](https://www.npmjs.com/package/uuid) | Unique emails for generated users |
| [dotenv](https://www.npmjs.com/package/dotenv) | Loads optional variables from `.env` |
| GitHub Actions | Continuous integration |

## Architecture

```
├── playwright.config.ts        # baseURL, browser projects, retries, reporter
├── adapters/
│   └── UUIDAdapter.ts          # wraps uuid v4 so it can be swapped or mocked
├── utils/
│   └── UserFactory.ts          # builds a User with a unique email (user<uuid>@mail.com)
├── types/
│   └── User.ts                 # User interface, mirrors the createAccount API fields
├── services/
│   └── UserService.service.ts  # POST /api/createAccount, DELETE /api/deleteAccount
├── fixtures/
│   ├── base.fixture.ts         # overrides page to block third-party ad requests
│   ├── existingUser.fixture.ts # testUser registered via API before the test, deleted after
│   ├── userFactory.fixture.ts  # unregistered testUser (registered in the UI), deleted after
│   └── loginPage.fixture.ts    # LoginPage fixture
├── pages/
│   ├── LoginPage.ts            # header, login form, logged-in indicator, login error
│   └── RegisterPage.ts         # signup form and "Enter Account Information" form
├── tests/
│   ├── auth/
│   ├── products/
│   ├── cart/
│   └── checkout/
└── .github/workflows/playwright.yml
```

### How the layers fit together

```
UUIDAdapter ──► UserFactory ──► User ──► UserService (API) ──► Fixture ──► Spec ──► Page Objects
```

1. **Adapter → Factory**: `UUIDAdapter` is injected into `UserFactory`, which returns a fully populated `User` with a unique email.
2. **Service**: `UserService` uses Playwright's `APIRequestContext` to create and delete the account through the site's API.
3. **Fixtures** own the data lifecycle:
   - `existingUser.fixture` → register via API → run the test → delete the user. Used by every test that needs a logged-in user.
   - `userFactory.fixture` → generate a user without registering it, so the test can register through the UI → delete the user afterwards.
   - `base.fixture` → both fixtures extend it; it blocks ad requests that otherwise make clicks flaky.
4. **Page objects** expose `public readonly` locators and actions such as `fill*`, `click*`, `select*` and `navigate`.
5. **Specs** import `test` from the fixture they need and `expect` from `@playwright/test`.

### Conventions

- Spec files are named `tests/<feature>/<feature>-NNN.spec.ts`, with one `describe` and one `test` per file.
- Selector priority: `data-qa` attributes → ids → `getByRole` / `getByText` → CSS classes.
- Navigation uses relative paths (`navigate('/')`); `baseURL` comes from the config.

## Covered test suites

| Suite | Spec | Scenario | Assertions |
|---|---|---|---|
| **Auth** | `auth-001` | Register a new user through the UI | "Enter Account Information" form visible; `Account Created!` shown |
| | `auth-002` | Log in with valid credentials | Logged-in user indicator visible |
| | `auth-003` | Log in with invalid credentials | Error `Your email or password is incorrect!` shown |
| **Products** | `products-001` | View all products | Product grid not empty; first card shows image, name, price and Add to cart |
| | `products-002` | View product details | `Blue Top`, `Category: Women > Tops`, `Rs. 500`, `Availability: In Stock` |
| | `products-003` | Search for a product | Searching `shirt` returns results containing "shirt" |
| **Cart** | `cart-001` | Add a product to the cart | "Added!" modal visible |
| | `cart-002` | View the cart | Empty-cart message hidden; row of the added product visible |
| | `cart-003` | Set quantity on the product page and add to cart | Cart row shows the selected quantity |
| **Checkout** | `checkout-001` | Proceed to checkout | URL `/checkout`; Address Details, Review Your Order and delivery address visible |
| | `checkout-002` | Place an order and pay | URL `/payment_done/...`; `Order Placed!` shown |
| | `checkout-003` | Order confirmation page | `Order Placed!`, confirmation message, Download Invoice and Continue visible |

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
npx playwright test                        # all tests on Chromium, Firefox and WebKit (as in CI)
npx playwright test tests/cart             # a single suite
npx playwright test tests/auth/auth-002.spec.ts --headed --project=chromium
npx playwright show-report                 # open the last HTML report
npx tsc --noEmit                           # type-check
```

## CI/CD

The workflow in [.github/workflows/playwright.yml](.github/workflows/playwright.yml) runs on push and pull request to `main`/`master`:

1. Checkout and set up Node.js (LTS)
2. `npm ci` and `npx playwright install --with-deps`
3. `npx playwright test` on all three browsers
4. Upload `playwright-report/` as an artifact (kept for 30 days)

On CI the config enables `forbidOnly`, 2 retries, 2 workers, and traces on the first retry.

## Roadmap

- Add page objects for Home/Header, Products, Product Details, Cart, Checkout and Payment.
- Replace repeated UI login steps with a logged-in fixture or `storageState`.
- Add ESLint, Prettier and npm scripts; run lint and type-check in CI.
- Docker support based on the official Playwright image.
- Tags (`@smoke`, `@regression`) and a smoke job for pull requests.
