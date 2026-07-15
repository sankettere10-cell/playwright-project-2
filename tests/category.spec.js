import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Category Filters", () => {

    test("Filter by Phones", async ({ page }) => {
        const home = new HomePage(page);

        await home.openApplication();
        await home.selectPhones();
        await home.verifyProduct("Samsung galaxy s6");
    });

    test("Filter by Laptops", async ({ page }) => {
        const home = new HomePage(page);

        await home.openApplication();
        await home.selectLaptops();
        await home.verifyProduct("Sony vaio i5");
    });

    test("Filter by Monitors", async ({ page }) => {
        const home = new HomePage(page);

        await home.openApplication();
        await home.selectMonitors();
        await page.waitForTimeout(2000);
        await home.verifyProduct("Apple monitor 24");
    });

});
