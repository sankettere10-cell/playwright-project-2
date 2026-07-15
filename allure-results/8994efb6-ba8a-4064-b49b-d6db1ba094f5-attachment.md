# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.js >> Verify Product in Cart
- Location: tests\cart.spec.js:7:5

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
  - dialog [ref=e2]:
    - document [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - heading [level=5] [ref=e6]: New message
          - button [ref=e7]: ×
        - generic [ref=e9]:
          - generic [ref=e10]:
            - text: "Contact Email:"
            - textbox [ref=e11]
          - generic [ref=e12]:
            - text: "Contact Name:"
            - textbox [ref=e13]
          - generic [ref=e14]:
            - text: "Message:"
            - textbox [ref=e15]
        - generic [ref=e16]:
          - button [ref=e17]: Close
          - button [ref=e18]: Send message
  - dialog [ref=e19]:
    - document [ref=e20]:
      - generic [ref=e21]:
        - generic [ref=e22]:
          - heading [level=5] [ref=e23]: Sign up
          - button [ref=e24]: ×
        - generic [ref=e26]:
          - generic [ref=e27]:
            - text: "Username:"
            - textbox [ref=e28]
          - generic [ref=e29]:
            - text: "Password:"
            - textbox [ref=e30]
        - generic [ref=e31]:
          - button [ref=e32]: Close
          - button [ref=e33]: Sign up
  - dialog [ref=e34]:
    - document [ref=e35]:
      - generic [ref=e36]:
        - generic [ref=e37]:
          - heading [level=5] [ref=e38]: Log in
          - button [ref=e39]: ×
        - generic [ref=e41]:
          - generic [ref=e42]:
            - text: "Username:"
            - textbox [ref=e43]
          - generic [ref=e44]:
            - text: "Password:"
            - textbox [ref=e45]
        - generic [ref=e46]:
          - button [ref=e47]: Close
          - button [ref=e48]: Log in
  - dialog [ref=e49]:
    - document [ref=e50]:
      - generic [ref=e51]:
        - generic [ref=e52]:
          - heading [level=5] [ref=e53]: About us
          - button [ref=e54]: ×
        - button [ref=e59]: Close
  - navigation [ref=e60]:
    - button "Toggle navigation" [ref=e61]
    - generic [ref=e62]:
      - link "PRODUCT STORE" [ref=e63] [cursor=pointer]:
        - /url: index.html
        - img [ref=e64]
        - text: PRODUCT STORE
      - list [ref=e66]:
        - listitem [ref=e67]:
          - link "Home (current)" [ref=e68] [cursor=pointer]:
            - /url: index.html
        - listitem [ref=e69]:
          - link "Contact" [ref=e70] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e71]:
          - link "About us" [ref=e72] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e73]:
          - link "Cart" [ref=e74] [cursor=pointer]:
            - /url: cart.html
        - listitem [ref=e75]:
          - link "Log in" [ref=e76] [cursor=pointer]:
            - /url: "#"
        - listitem
        - listitem
        - listitem [ref=e77]:
          - link "Sign up" [ref=e78] [cursor=pointer]:
            - /url: "#"
  - generic [ref=e83]:
    - list [ref=e84]:
      - listitem [ref=e85]
      - listitem [ref=e86]
      - listitem [ref=e87]
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
  6   | 
  7   |     constructor(page) {
  8   |         super(page);
  9   | 
  10  |         // Product Details
  11  |         this.productName = page.locator(".name");
  12  |         this.productPrice = page.locator(".price-container");
  13  |         this.productDescription = page.locator("#more-information");
  14  | 
  15  |         // Add To Cart Button
  16  |         this.addToCartButton = page.locator('a:has-text("Add to cart")');
  17  |     }
  18  | 
  19  |     // Open Product
  20  |     async openProduct(productName) {
  21  | 
  22  |         await allure.step(`Open Product: ${productName}`, async () => {
  23  | 
  24  |             const productLink = this.page.locator(".card-title a", {
  25  |                 hasText: productName
  26  |             }).first();
  27  | 
  28  |             await expect(productLink).toBeVisible({
  29  |                 timeout: 20000
  30  |             });
  31  | 
  32  |             await Promise.all([
  33  |                 this.page.waitForURL(/prod\.html/),
> 34  |                 productLink.click()
      |                             ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  35  |             ]);
  36  | 
  37  |             // Wait for product title to appear
  38  |             await expect(this.productName).toBeVisible({
  39  |                 timeout: 20000
  40  |             });
  41  | 
  42  |             // Wait until correct text is loaded
  43  |             await expect.poll(async () => {
  44  |                 return (await this.productName.textContent())?.trim();
  45  |             }, {
  46  |                 timeout: 20000
  47  |             }).toBe(productName);
  48  | 
  49  |         });
  50  |     }
  51  | 
  52  |     // Verify Product Name
  53  |     async verifyProductName(expectedName) {
  54  |         await expect(this.productName).toHaveText(expectedName);
  55  |     }
  56  | 
  57  |     // Verify Product Price
  58  |     async verifyPriceContains(price) {
  59  |         await expect(this.productPrice).toContainText(price);
  60  |     }
  61  | 
  62  |     // Verify Description
  63  |     async verifyDescriptionVisible() {
  64  |         await expect(this.productDescription).toBeVisible();
  65  |     }
  66  | 
  67  |     // Click Add To Cart
  68  |     async addToCart() {
  69  |         await this.addToCartButton.click();
  70  |     }
  71  | 
  72  |     // Add Product To Cart
  73  |     async addProductToCart() {
  74  | 
  75  |         await allure.step("Add Product To Cart", async () => {
  76  | 
  77  |             const dialogPromise = this.page.waitForEvent("dialog");
  78  | 
  79  |             await this.addToCart();
  80  | 
  81  |             const dialog = await dialogPromise;
  82  | 
  83  |             console.log("Alert :", dialog.message());
  84  | 
  85  |             await dialog.accept();
  86  | 
  87  |         });
  88  | 
  89  |     }
  90  | 
  91  |     // Get Product Name
  92  |     async getProductName() {
  93  |         return (await this.productName.textContent())?.trim();
  94  |     }
  95  | 
  96  |     // Get Product Price
  97  |     async getProductPrice() {
  98  |         return (await this.productPrice.textContent())?.trim();
  99  |     }
  100 | }
```