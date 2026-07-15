import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class LoginPage extends BasePage {

    constructor(page) {
        super(page);

        // Login Menu
        this.loginLink = page.locator('#login2');
        this.logoutLink = page.locator('#logout2');
        this.welcomeUser = page.locator('#nameofuser');

        // Login Modal
        this.loginModal = page.locator('#logInModal');
        this.username = page.locator('#loginusername');
        this.password = page.locator('#loginpassword');
      this.loginButton = page
    .locator('#logInModal')
    .getByRole('button', { name: 'Log in' });
        this.closeButton = page.locator('//div[@id="logInModal"]//button[text()="Close"]');
    }

    // Open Login Popup
    async openLoginPopup() {
        await this.click(this.loginLink);
        await expect(this.loginModal).toBeVisible();
    }

    // Enter Username
    async enterUsername(username) {
        await this.fill(this.username, username);
    }

    // Enter Password
    async enterPassword(password) {
        await this.fill(this.password, password);
    }

    // Click Login Button
    async clickLoginButton() {

    await this.loginButton.click();

    await this.page.waitForFunction(() => {
        const e = document.querySelector("#nameofuser");
        return e && e.textContent.trim() !== "";
    });
}
    // Complete Login
   async login(username, password) {

    await this.openLoginPopup();

    await this.username.fill(username);
    await this.password.fill(password);

    console.log("Username:", await this.username.inputValue());
    console.log("Password:", await this.password.inputValue());

    await this.loginButton.click();

await this.page.waitForTimeout(3000);
}

    // Verify Successful Login
  async verifyLogin(username) {

    await expect(this.welcomeUser).toContainText(
        `Welcome ${username}`,
        {
            timeout:20000
        }
    );

}
    // Logout
    async logout() {
        await this.click(this.logoutLink);
    }

    // Verify Logout
    async verifyLogout() {
        await expect(this.loginLink).toBeVisible();
    }

    // Close Login Popup
    async closeLoginPopup() {
        await this.click(this.closeButton);
    }

    // Verify Login Popup
    async verifyLoginPopup() {
        await expect(this.loginModal).toBeVisible();
    }

    // Handle Invalid Login Alert
    // async acceptLoginAlert() {
    //     this.page.once('dialog', async dialog => {
    //         console.log("Alert Message :", dialog.message());
    //         await dialog.accept();
    //     });
    //}
}