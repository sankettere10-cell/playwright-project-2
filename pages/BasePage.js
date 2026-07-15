import { expect } from '@playwright/test';

export class BasePage {

    constructor(page) {
        this.page = page;
    }

    // Navigate to URL
    async navigate(url) {
    await this.page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 60000
    });
}
    // Click on an element
   async click(locator) {
    await locator.waitFor({
        state: "visible",
        timeout: 15000
    });

    await locator.click({
        timeout: 15000
    });
}

    // Enter text into a field
    async fill(locator, value) {
        await locator.fill(value);
    }

    // Get text from an element
    async getText(locator) {
        return await locator.textContent();
    }

    // Check if an element is visible
    async isVisible(locator) {
        return await locator.isVisible();
    }

    // Wait for an element to be visible
    async waitForElement(locator) {
        await locator.waitFor({ state: 'visible' });
    }

    // Wait for a specified time (use only when necessary)
    async wait(milliseconds) {
        await this.page.waitForTimeout(milliseconds);
    }

    // Accept browser alert/dialog
    // async acceptAlert() {
    //     this.page.once('dialog', async dialog => {
    //         console.log("Alert Message:", dialog.message());
    //         await dialog.accept();
    //     });
    // }

    // Dismiss browser alert/dialog
    async dismissAlert() {
        this.page.once('dialog', async dialog => {
            console.log("Alert Message:", dialog.message());
            await dialog.dismiss();
        });
    }

    // Verify page title
    async verifyTitle(expectedTitle) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    // Verify current URL
    async verifyURL(expectedURL) {
        await expect(this.page).toHaveURL(expectedURL);
    }

    // Take screenshot
    async takeScreenshot(fileName) {
        await this.page.screenshot({
            path: `screenshots/${fileName}.png`,
            fullPage: true
        });
    }

    // Scroll to an element
    async scrollTo(locator) {
        await locator.scrollIntoViewIfNeeded();
    }

    // Reload page
    async refresh() {
        await this.page.reload();
    }

    // Go back
    async goBack() {
        await this.page.goBack();
    }

    // Go forward
    async goForward() {
        await this.page.goForward();
    }
}