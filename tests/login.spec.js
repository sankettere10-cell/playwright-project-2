import { test } from '@playwright/test';
import users from '../fixtures/users.json';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test('Valid Login', async ({ page }) => {

    const home = new HomePage(page);
    const login = new LoginPage(page);

    await home.openApplication();

    await login.login(
        users[0].username,
        users[0].password
    );

    await login.verifyLogin(users[0].username);
});