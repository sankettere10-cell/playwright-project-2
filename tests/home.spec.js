import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Verify Home Page', async ({ page }) => {

    const home = new HomePage(page);

    await home.openApplication();

    await home.verifyHomePage();

    await home.selectPhones();

    await home.verifyProduct("Samsung galaxy s6");

    console.log("Total Products:", await home.getProductCount());

});