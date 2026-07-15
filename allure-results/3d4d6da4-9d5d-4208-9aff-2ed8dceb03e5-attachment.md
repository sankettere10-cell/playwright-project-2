# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Addcartpage.spec.js >> Add Product to Cart
- Location: tests\Addcartpage.spec.js:5:5

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('.card-title a').filter({ hasText: 'Samsung galaxy s6' }).first()
    - locator resolved to <a class="hrefch" href="prod.html?idp_=1">Samsung galaxy s6</a>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action
    - click action done
    - waiting for scheduled navigations to finish

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
  1   | import { BasePage } from "./BasePage";
  2   | import { expect } from "@playwright/test";
  3   | import * as allure from "allure-js-commons";
  4   | 
  5   | export class ProductPage extends BasePage {
  6   |   constructor(page) {
  7   |     super(page);
  8   | 
  9   |     // Product Details
  10  |     this.productName = page.locator(".name");
  11  |     this.productPrice = page.locator(".price-container");
  12  |     this.productDescription = page.locator("#more-information");
  13  | 
  14  |     // Add To Cart Button
  15  |     this.addToCartButton = page.locator('a:has-text("Add to cart")');
  16  |   }
  17  | 
  18  |   // Open Product
  19  |   // Open Product
  20  |   async openProduct(productName) {
  21  |     const productLink = this.page
  22  |       .locator(".card-title a", {
  23  |         hasText: productName,
  24  |       })
  25  |       .first();
  26  | 
  27  |     await expect(productLink).toBeVisible({
  28  |       timeout: 30000,
  29  |     });
  30  | 
  31  |     await productLink.scrollIntoViewIfNeeded();
  32  | 
  33  |     await Promise.all([
  34  |     this.page.waitForURL(/prod\.html/),
> 35  |     productLink.click()
      |                 ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  36  | ]);
  37  | 
  38  | await expect(this.productName)
  39  |     .toBeVisible({
  40  |         timeout:20000
  41  |     });
  42  | 
  43  |     await expect(this.productName).toBeVisible({
  44  |       timeout: 30000,
  45  |     });
  46  | 
  47  |     await expect(this.productName).toHaveText(productName);
  48  |   }
  49  | 
  50  |   // Verify Product Name
  51  |   async verifyProductName(expectedName) {
  52  |     await expect(this.productName).toHaveText(expectedName);
  53  |   }
  54  | 
  55  |   // Verify Product Price
  56  |   async verifyPriceContains(price) {
  57  |     await expect(this.productPrice).toContainText(price);
  58  |   }
  59  | 
  60  |   // Verify Description
  61  |   async verifyDescriptionVisible() {
  62  |     await expect(this.productDescription).toBeVisible();
  63  |   }
  64  | 
  65  |   // Click Add To Cart
  66  |   async addToCart() {
  67  |     await expect(this.addToCartButton).toBeVisible({
  68  |       timeout: 20000,
  69  |     });
  70  | 
  71  |     await this.addToCartButton.click();
  72  |   }
  73  | 
  74  |   // Add Product To Cart
  75  |   async addProductToCart() {
  76  |     await allure.step("Add Product To Cart", async () => {
  77  |       const [dialog] = await Promise.all([
  78  |         this.page.waitForEvent("dialog"),
  79  |         this.addToCart(),
  80  |       ]);
  81  | 
  82  |       console.log("Alert :", dialog.message());
  83  |       await dialog.accept();
  84  |       console.log("Alert :", dialog.message());
  85  | 
  86  |       await dialog.accept();
  87  |     });
  88  |   }
  89  | 
  90  |   // Get Product Name
  91  |   async getProductName() {
  92  |     return (await this.productName.textContent())?.trim();
  93  |   }
  94  | 
  95  |   // Get Product Price
  96  |   async getProductPrice() {
  97  |     return (await this.productPrice.textContent())?.trim();
  98  |   }
  99  | }
  100 | 
```