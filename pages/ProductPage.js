import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import * as allure from "allure-js-commons";

export class ProductPage extends BasePage {
  constructor(page) {
    super(page);

    // Product Details
    this.productName = page.locator(".name");
    this.productPrice = page.locator(".price-container");
    this.productDescription = page.locator("#more-information");

    // Add To Cart Button
    this.addToCartButton = page.locator('a:has-text("Add to cart")');
  }

  // Open Product
  // Open Product
  async openProduct(productName) {
    const productLink = this.page
      .locator(".card-title a", {
        hasText: productName,
      })
      .first();

    await expect(productLink).toBeVisible({
      timeout: 30000,
    });

    await productLink.scrollIntoViewIfNeeded();

    await Promise.all([
    this.page.waitForURL(/prod\.html/),
    productLink.click()
]);

await expect(this.productName)
    .toBeVisible({
        timeout:20000
    });

    await expect(this.productName).toBeVisible({
      timeout: 30000,
    });

    await expect(this.productName).toHaveText(productName);
  }

  // Verify Product Name
  async verifyProductName(expectedName) {
    await expect(this.productName).toHaveText(expectedName);
  }

  // Verify Product Price
  async verifyPriceContains(price) {
    await expect(this.productPrice).toContainText(price);
  }

  // Verify Description
  async verifyDescriptionVisible() {
    await expect(this.productDescription).toBeVisible();
  }

  // Click Add To Cart
  async addToCart() {
    await expect(this.addToCartButton).toBeVisible({
      timeout: 20000,
    });

    await this.addToCartButton.click();
  }

  // Add Product To Cart
  async addProductToCart() {
    await allure.step("Add Product To Cart", async () => {
      const [dialog] = await Promise.all([
        this.page.waitForEvent("dialog"),
        this.addToCart(),
      ]);

      console.log("Alert :", dialog.message());
      await dialog.accept();
      console.log("Alert :", dialog.message());

      await dialog.accept();
    });
  }

  // Get Product Name
  async getProductName() {
    return (await this.productName.textContent())?.trim();
  }

  // Get Product Price
  async getProductPrice() {
    return (await this.productPrice.textContent())?.trim();
  }
}
