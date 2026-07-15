import { test } from "@playwright/test";

import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { PlaceOrderPage } from "../pages/PlaceOrderPage";

import order from "../fixtures/order.json";

test("Complete Purchase", async ({ page }) => {

    const home = new HomePage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new PlaceOrderPage(page);

    await home.openApplication();

    await product.openProduct("Samsung galaxy s6");

    await product.addProductToCart();

    await cart.openCart();

console.log("Current URL:", page.url());

console.log(
    "Rows:",
    await page.locator("#tbodyid tr").count()
);

await page.waitForTimeout(3000);

await cart.verifyProductInCart("Samsung galaxy s6");

    await cart.clickPlaceOrder();

    await checkout.verifyPlaceOrderPopup();

    await checkout.placeOrder(order);

    await checkout.verifyOrderSuccess();

    console.log(await checkout.getConfirmationDetails());

    await checkout.confirmPurchase();

});