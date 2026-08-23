import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Invalid login flow", () => {
    test("Should fail the login with invalid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate('/');

        await loginPage.clickSignUpLink();

        await loginPage.fillLoginEmail("test@mail.com");
        await loginPage.fillLoginPassword("password");
        await loginPage.clickLoginButton();

        await expect(loginPage.loginError).toBeVisible();

        await expect(loginPage.loginError).toHaveText(
            "Your email or password is incorrect!"
        );
    });
});