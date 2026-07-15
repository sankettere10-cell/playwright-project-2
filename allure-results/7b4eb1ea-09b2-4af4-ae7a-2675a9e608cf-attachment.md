# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.js >> Delete Product
- Location: tests\cart.spec.js:35:5

# Error details

```
Error: page.waitForLoadState: Navigation failed because page crashed!
```

# Test source

```ts
  1  | import { BasePage } from "./BasePage";
  2  | import { expect } from "@playwright/test";
  3  | import * as allure from "allure-js-commons";
  4  | 
  5  | export class ProductPage extends BasePage {
  6  | 
  7  |     constructor(page) {
  8  |         super(page);
  9  | 
  10 |         // Product Details
  11 |         this.productName = page.locator(".name");
  12 |         this.productPrice = page.locator(".price-container");
  13 |        this.productDescription = page.locator("#more-information");
  14 | 
  15 |         // Add to Cart
  16 |         this.addToCartButton = page.locator('//a[text()="Add to cart"]');
  17 |     }
  18 | 
  19 |     // Open Product by Name
  20 |  
  21 | 
  22 | async openProduct(productName) {
  23 |     await allure.step("Open Product: " + productName, async () => {
  24 | 
  25 |         const productLink = this.page.locator(".card-title a", {
  26 |             hasText: productName
  27 |         }).first();
  28 | 
  29 |         await expect(productLink).toBeVisible({
  30 |             timeout: 20000
  31 |         });
  32 | 
  33 |         await Promise.all([
  34 |             this.page.waitForURL(/prod\.html/),
  35 |             productLink.click()
  36 |         ]);
  37 | 
  38 |         // Wait until the page finishes loading
> 39 |         await this.page.waitForLoadState("networkidle");
     |                         ^ Error: page.waitForLoadState: Navigation failed because page crashed!
  40 | 
  41 |         // Wait until the product name appears
  42 |         await expect(this.productName).toBeVisible({
  43 |             timeout: 20000
  44 |         });
  45 | 
  46 |         await expect(this.productName).toHaveText(productName, {
  47 |             timeout: 20000
  48 |         });
  49 |     });
  50 | }
  51 |     // Verify Product Name
  52 |     async verifyProductName(expectedName) {
  53 |         await expect(this.productName).toHaveText(expectedName);
  54 |     }
  55 | 
  56 |     // Verify Product Price
  57 |     async verifyPriceContains(price) {
  58 |         await expect(this.productPrice).toContainText(price);
  59 |     }
  60 | 
  61 |     // Verify Description Section
  62 |     async verifyDescriptionVisible() {
  63 |         await expect(this.productDescription).toBeVisible();
  64 |     }
  65 | 
  66 |     // Click Add to Cart
  67 |     async addToCart() {
  68 |         await this.click(this.addToCartButton);
  69 |     }
  70 | 
  71 |     // Add Product & Accept Alert
  72 |     async addProductToCart() {
  73 | 
  74 |     await allure.step("Add Product To Cart", async () => {
  75 | 
  76 |         const dialogPromise = this.page.waitForEvent("dialog");
  77 | 
  78 |         await this.addToCart();
  79 | 
  80 |         const dialog = await dialogPromise;
  81 | 
  82 |         console.log("Alert :", dialog.message());
  83 | 
  84 |         await dialog.accept();
  85 |     });
  86 | }
  87 |     // Get Product Name
  88 |     async getProductName() {
  89 |         return await this.productName.textContent();
  90 |     }
  91 | 
  92 |     // Get Product Price
  93 |     async getProductPrice() {
  94 |         return await this.productPrice.textContent();
  95 |     }
  96 | }
```