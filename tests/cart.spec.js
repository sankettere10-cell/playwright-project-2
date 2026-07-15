import { test } from "@playwright/test";
import * as allure from "allure-js-commons";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";

test("Verify Product in Cart", async ({ page }) => {

    await allure.owner("Sanket Tere");
    await allure.feature("Cart");
    await allure.story("Verify Product in Cart");
    await allure.severity("critical");
    await allure.tag("Smoke");

    const home = new HomePage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await home.openApplication();

    console.log("URL:", page.url());

const products = await page.locator(".card-title a").allTextContents();
console.log(products);
    await product.openProduct("Samsung galaxy s6");

    await product.addProductToCart();

    await cart.openCart();

    await cart.verifyProductInCart("Samsung galaxy s6");

});

test("Delete Product", async ({ page }) => {

    const home = new HomePage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await home.openApplication();

    await product.openProduct("Samsung galaxy s6");

    await product.addProductToCart();

    await cart.openCart();

    await cart.deleteProduct("Samsung galaxy s6");

});