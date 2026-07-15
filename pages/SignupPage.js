import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class SignupPage extends BasePage {

    constructor(page) {
        super(page);

        // Signup Link
        this.signupLink = page.locator("#signin2");

        // Signup Modal
        this.signupModal = page.locator("#signInModal");
        this.username = page.locator("#sign-username");
        this.password = page.locator("#sign-password");
        this.signupButton = page.locator('//button[text()="Sign up"]');
        this.closeButton = page.locator('//div[@id="signInModal"]//button[text()="Close"]');
    }

    // Open Signup Popup
    async openSignupPopup() {
        await this.click(this.signupLink);
        await expect(this.signupModal).toBeVisible();
    }

    // Enter Username
    async enterUsername(username) {
        await this.fill(this.username, username);
    }

    // Enter Password
    async enterPassword(password) {
        await this.fill(this.password, password);
    }

    // Click Signup Button
    async clickSignupButton() {
        await this.click(this.signupButton);
    }

    // Complete Signup
    async signup(username, password) {
        await this.openSignupPopup();
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSignupButton();
    }

    // Close Signup Popup
    async closeSignupPopup() {
        await this.click(this.closeButton);
    }

    // Verify Signup Popup
    async verifySignupPopup() {
        await expect(this.signupModal).toBeVisible();
    }

    // Handle Signup Alert
    async acceptSignupAlert() {
        this.page.once("dialog", async dialog => {
            console.log("Alert Message:", dialog.message());
            await dialog.accept();
        });
    }

    // Handle Cancel/Dismiss Alert (if required)
    async dismissSignupAlert() {
        this.page.once("dialog", async dialog => {
            console.log("Alert Message:", dialog.message());
            await dialog.dismiss();
        });
    }
}