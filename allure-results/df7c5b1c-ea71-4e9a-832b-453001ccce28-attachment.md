# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.js >> Delete Product
- Location: tests\cart.spec.js:35:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.card-title a').filter({ hasText: 'Samsung galaxy s6' }).first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('.card-title a').filter({ hasText: 'Samsung galaxy s6' }).first()

```

```yaml
- navigation:
  - link "PRODUCT STORE":
    - /url: index.html
    - img
    - text: PRODUCT STORE
  - list:
    - listitem:
      - link "Home (current)":
        - /url: index.html
    - listitem:
      - link "Contact":
        - /url: "#"
    - listitem:
      - link "About us":
        - /url: "#"
    - listitem:
      - link "Cart":
        - /url: cart.html
    - listitem:
      - link "Log in":
        - /url: "#"
    - listitem
    - listitem
    - listitem:
      - link "Sign up":
        - /url: "#"
  - list:
    - listitem
    - listitem
    - listitem
  - img "Third slide"
  - button "Previous"
  - button "Next"
- link "CATEGORIES":
  - /url: ""
- link "Phones":
  - /url: "#"
- link "Laptops":
  - /url: "#"
- link "Monitors":
  - /url: "#"
- list:
  - listitem:
    - button "Previous"
  - listitem:
    - button "Next"
- heading "About Us" [level=4]
- paragraph: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
- heading "Get in Touch" [level=4]
- paragraph: "Address: 2390 El Camino Real"
- paragraph: "Phone: +440 123456"
- paragraph: "Email: demo@blazemeter.com"
- heading "PRODUCT STORE" [level=4]:
  - img
  - text: PRODUCT STORE
- contentinfo:
  - paragraph: Copyright © Product Store
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
> 29 |         await expect(productLink).toBeVisible({
     |                                   ^ Error: expect(locator).toBeVisible() failed
  30 |             timeout: 15000
  31 |         });
  32 | 
  33 |         await productLink.click({
  34 |             noWaitAfter: true
  35 |         });
  36 | 
  37 |         await expect(this.productName).toHaveText(productName);
  38 |     });
  39 | }
  40 |     // Verify Product Name
  41 |     async verifyProductName(expectedName) {
  42 |         await expect(this.productName).toHaveText(expectedName);
  43 |     }
  44 | 
  45 |     // Verify Product Price
  46 |     async verifyPriceContains(price) {
  47 |         await expect(this.productPrice).toContainText(price);
  48 |     }
  49 | 
  50 |     // Verify Description Section
  51 |     async verifyDescriptionVisible() {
  52 |         await expect(this.productDescription).toBeVisible();
  53 |     }
  54 | 
  55 |     // Click Add to Cart
  56 |     async addToCart() {
  57 |         await this.click(this.addToCartButton);
  58 |     }
  59 | 
  60 |     // Add Product & Accept Alert
  61 |     async addProductToCart() {
  62 | 
  63 |     await allure.step("Add Product To Cart", async () => {
  64 | 
  65 |         await Promise.all([
  66 |             this.page.waitForEvent("dialog").then(async dialog => {
  67 |                 console.log("Alert :", dialog.message());
  68 |                 await dialog.accept();
  69 |             }),
  70 | 
  71 |             this.addToCart()
  72 |         ]);
  73 | 
  74 |     });
  75 | }
  76 |     // Get Product Name
  77 |     async getProductName() {
  78 |         return await this.productName.textContent();
  79 |     }
  80 | 
  81 |     // Get Product Price
  82 |     async getProductPrice() {
  83 |         return await this.productPrice.textContent();
  84 |     }
  85 | }
```