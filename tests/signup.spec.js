import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SignupPage } from "../pages/SignupPage";
import { generateUsername } from "../utils/helper";

test("Register New User", async ({ page }) => {

    const home = new HomePage(page);
    const signup = new SignupPage(page);

    await home.openApplication();

    // Accept success alert
    await signup.acceptSignupAlert();

    // Use a unique username to avoid duplicate-user errors
    const username = generateUsername();

    await signup.signup(username, "Password123");

});