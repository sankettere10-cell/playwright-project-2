import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Navigation", () => {

    test("Home link and logo are visible", async ({ page }) => {
        const home = new HomePage(page);

        await home.openApplication();
        await home.verifyHomePage();
    });

    test("Contact modal opens and closes", async ({ page }) => {
        const home = new HomePage(page);

        await home.openApplication();
        await home.clickContact();
        await home.closeContact();
    });

    test("About Us modal opens and closes", async ({ page }) => {
        const home = new HomePage(page);

        await home.openApplication();
        await home.clickAboutUs();
        await home.closeAboutUs();
    });

    test("Cart link navigates to cart page", async ({ page }) => {
    const home = new HomePage(page);

    await home.openApplication();
    await home.clickCart();

    await expect(page).toHaveURL(/cart\.html/);
});

    test("Carousel next/previous changes the active slide", async ({ page }) => {
        const home = new HomePage(page);

        await home.openApplication();
        await home.clickNext();
        await home.clickPrevious();
    });

});
