import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";

test("Add Product to Cart", async ({ page }) => {

    const home = new HomePage(page);
    const product = new ProductPage(page);

    await home.openApplication();

    await product.openProduct("Samsung galaxy s6");

    await product.addProductToCart();

});