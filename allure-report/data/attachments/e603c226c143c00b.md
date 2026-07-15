# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Addcartpage.spec.js >> Add Product to Cart
- Location: tests\Addcartpage.spec.js:5:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.name')
Expected: "Samsung galaxy s6"
Received: ""
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for locator('.name')
    - waiting for" https://www.demoblaze.com/prod.html?idp_=1" navigation to finish...

```

# Test source

```ts
  1  | import { BasePage } from "./BasePage";
  2  | import { expect } from "@playwright/test";
  3  | 
  4  | export class ProductPage extends BasePage {
  5  | 
  6  |     constructor(page) {
  7  |         super(page);
  8  | 
  9  |         // Product Details
  10 |         this.productName = page.locator(".name");
  11 |         this.productPrice = page.locator(".price-container");
  12 |        this.productDescription = page.locator("#more-information");
  13 | 
  14 |         // Add to Cart
  15 |         this.addToCartButton = page.locator('//a[text()="Add to cart"]');
  16 |     }
  17 | 
  18 |     // Open Product by Name
  19 |    async openProduct(productName) {
  20 | 
  21 |     const productLink = this.page.locator(".card-title a", {
  22 |         hasText: productName
  23 |     }).first();
  24 | 
  25 |     await expect(productLink).toBeVisible({
  26 |         timeout: 15000
  27 |     });
  28 | 
  29 |     // Demoblaze does not perform a normal navigation
  30 |     await productLink.click({
  31 |         noWaitAfter: true
  32 |     });
  33 | 
> 34 |     await expect(this.productName).toHaveText(productName, {
     |                                    ^ Error: expect(locator).toHaveText(expected) failed
  35 |         timeout: 15000
  36 |     });
  37 | }
  38 |     // Verify Product Name
  39 |     async verifyProductName(expectedName) {
  40 |         await expect(this.productName).toHaveText(expectedName);
  41 |     }
  42 | 
  43 |     // Verify Product Price
  44 |     async verifyPriceContains(price) {
  45 |         await expect(this.productPrice).toContainText(price);
  46 |     }
  47 | 
  48 |     // Verify Description Section
  49 |     async verifyDescriptionVisible() {
  50 |         await expect(this.productDescription).toBeVisible();
  51 |     }
  52 | 
  53 |     // Click Add to Cart
  54 |     async addToCart() {
  55 |         await this.click(this.addToCartButton);
  56 |     }
  57 | 
  58 |     // Add Product & Accept Alert
  59 |     async addProductToCart() {
  60 | 
  61 |     const dialogPromise = this.page.waitForEvent("dialog");
  62 | 
  63 |     await this.addToCart();
  64 | 
  65 |     const dialog = await dialogPromise;
  66 |     console.log("Alert :", dialog.message());
  67 |     await dialog.accept();
  68 | }
  69 |     // Get Product Name
  70 |     async getProductName() {
  71 |         return await this.productName.textContent();
  72 |     }
  73 | 
  74 |     // Get Product Price
  75 |     async getProductPrice() {
  76 |         return await this.productPrice.textContent();
  77 |     }
  78 | }
```