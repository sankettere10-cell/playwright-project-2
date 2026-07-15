# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.js >> Verify Product in Cart
- Location: tests\cart.spec.js:7:5

# Error details

```
TimeoutError: page.waitForLoadState: Timeout 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - text:             
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
  - generic [ref=e22]:
    - generic [ref=e25]:
      - list [ref=e26]:
        - listitem [ref=e27] [cursor=pointer]
        - listitem [ref=e28] [cursor=pointer]
        - listitem [ref=e29] [cursor=pointer]
      - link:
        - /url: "#myCarousel-2"
      - link:
        - /url: "#myCarousel-2"
    - generic [ref=e32]:
      - heading "Samsung galaxy s6" [level=2] [ref=e33]
      - separator [ref=e34]
      - heading "$360 *includes tax" [level=3] [ref=e35]
      - separator [ref=e36]
      - generic [ref=e37]:
        - list:
          - listitem
        - generic [ref=e39]:
          - strong [ref=e40]: Product description
          - paragraph [ref=e41]: The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage cannot be expanded.
      - separator [ref=e42]
      - link "Add to cart" [ref=e45] [cursor=pointer]:
        - /url: "#"
  - generic [ref=e47]:
    - generic [ref=e50]:
      - heading "About Us" [level=4] [ref=e51]
      - paragraph [ref=e52]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e55]:
      - heading "Get in Touch" [level=4] [ref=e56]
      - paragraph [ref=e57]: "Address: 2390 El Camino Real"
      - paragraph [ref=e58]: "Phone: +440 123456"
      - paragraph [ref=e59]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e63]:
      - img [ref=e64]
      - text: PRODUCT STORE
  - contentinfo [ref=e65]:
    - paragraph [ref=e66]: Copyright © Product Store
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
     |                         ^ TimeoutError: page.waitForLoadState: Timeout 30000ms exceeded.
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