# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.js >> Verify Product in Cart
- Location: tests\cart.spec.js:7:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.name')
Expected: "Samsung galaxy s6"
Received: ""
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for locator('.name')
    - waiting for" https://www.demoblaze.com/prod.html?idp_=1" navigation to finish...

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "PRODUCT STORE" [ref=e4] [cursor=pointer]:
        - /url: index.html
        - img [ref=e5]
        - text: PRODUCT STORE
      - list [ref=e7]:
        - listitem [ref=e8]:
          - link "Home (current)" [ref=e9] [cursor=pointer]:
            - /url: index.html
            - text: Home
            - generic [ref=e10]: (current)
        - listitem [ref=e11]:
          - link "Contact" [ref=e12] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e13]:
          - link "About us" [ref=e14] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e15]:
          - link "Cart" [ref=e16] [cursor=pointer]:
            - /url: cart.html
        - listitem [ref=e17]:
          - link "Log in" [ref=e18] [cursor=pointer]:
            - /url: "#"
        - listitem
        - listitem
        - listitem [ref=e19]:
          - link "Sign up" [ref=e20] [cursor=pointer]:
            - /url: "#"
  - generic [ref=e24]:
    - generic:
      - list [ref=e25]:
        - listitem [ref=e26] [cursor=pointer]
        - listitem [ref=e27] [cursor=pointer]
        - listitem [ref=e28] [cursor=pointer]
      - link:
        - /url: "#myCarousel-2"
      - link:
        - /url: "#myCarousel-2"
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
  30 |             timeout: 15000
  31 |         });
  32 | 
  33 |         await productLink.click({
  34 |             noWaitAfter: true
  35 |         });
  36 | 
> 37 |         await expect(this.productName).toHaveText(productName);
     |                                        ^ Error: expect(locator).toHaveText(expected) failed
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