import { test } from "@playwright/test";

import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { PlaceOrderPage } from "../pages/PlaceOrderPage";

import order from "../fixtures/order.json";

test("End-to-End Purchase Flow", async ({ page }) => {

    const home = new HomePage(page);
    const login = new LoginPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new PlaceOrderPage(page);

    await home.openApplication();

    await login.login("sank123", "Test@123");
    await login.verifyLogin("sank123");

    await product.openProduct("Samsung galaxy s6");
    await product.verifyProductName("Samsung galaxy s6");

    await product.addProductToCart();

    await cart.openCart();
    await cart.verifyProductInCart("Samsung galaxy s6");

    await cart.clickPlaceOrder();

    await checkout.placeOrder(order);
    await checkout.verifyOrderSuccess();

    console.log(await checkout.getConfirmationDetails());

    await checkout.confirmPurchase();

    await login.logout();
});