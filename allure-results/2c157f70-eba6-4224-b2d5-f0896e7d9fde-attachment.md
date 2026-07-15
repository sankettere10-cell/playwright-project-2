# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.js >> End-to-End Purchase Flow
- Location: tests\smoke.spec.js:11:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#tbodyid tr').first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('#tbodyid tr').first()

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
          - heading [level=5] [ref=e38]: Place order
          - button [ref=e39]: ×
        - generic [ref=e41]:
          - text: "Total:"
          - generic [ref=e42]:
            - text: "Name:"
            - textbox [ref=e43]
          - generic [ref=e44]:
            - text: "Country:"
            - textbox [ref=e45]
          - generic [ref=e46]:
            - text: "City:"
            - textbox [ref=e47]
          - generic [ref=e48]:
            - text: "Credit card:"
            - textbox [ref=e49]
          - generic [ref=e50]:
            - text: "Month:"
            - textbox [ref=e51]
          - generic [ref=e52]:
            - text: "Year:"
            - textbox [ref=e53]
        - generic [ref=e54]:
          - button [ref=e55]: Close
          - button [ref=e56]: Purchase
  - dialog [ref=e57]:
    - document [ref=e58]:
      - generic [ref=e59]:
        - generic [ref=e60]:
          - heading [level=5] [ref=e61]: Log in
          - button [ref=e62]: ×
        - generic [ref=e64]:
          - generic [ref=e65]:
            - text: "Username:"
            - textbox [ref=e66]
          - generic [ref=e67]:
            - text: "Password:"
            - textbox [ref=e68]
        - generic [ref=e69]:
          - button [ref=e70]: Close
          - button [ref=e71]: Log in
  - dialog [ref=e72]:
    - document [ref=e73]:
      - generic [ref=e74]:
        - generic [ref=e75]:
          - heading [level=5] [ref=e76]: About us
          - button [ref=e77]: ×
        - button [ref=e82]: Close
  - navigation [ref=e83]:
    - button "Toggle navigation" [ref=e84]
    - generic [ref=e85]:
      - link "PRODUCT STORE" [ref=e86] [cursor=pointer]:
        - /url: index.html
        - img [ref=e87]
        - text: PRODUCT STORE
      - list [ref=e89]:
        - listitem [ref=e90]:
          - link "Home (current)" [ref=e91] [cursor=pointer]:
            - /url: index.html
        - listitem [ref=e92]:
          - link "Contact" [ref=e93] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e94]:
          - link "About us" [ref=e95] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e96]:
          - link "Cart" [ref=e97] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e98]:
          - link "Log in" [ref=e99] [cursor=pointer]:
            - /url: "#"
        - listitem
        - listitem
        - listitem [ref=e100]:
          - link "Sign up" [ref=e101] [cursor=pointer]:
            - /url: "#"
  - generic [ref=e103]:
    - generic [ref=e104]:
      - heading "Products" [level=2] [ref=e105]
      - table [ref=e107]:
        - rowgroup [ref=e108]:
          - row "Pic Title Price x" [ref=e109]:
            - columnheader "Pic" [ref=e110]
            - columnheader "Title" [ref=e111]
            - columnheader "Price" [ref=e112]
            - columnheader "x" [ref=e113]
        - rowgroup
    - generic [ref=e114]:
      - heading "Total" [level=2] [ref=e115]
      - generic:
        - generic:
          - heading [level=3]
      - button "Place Order" [ref=e116]
```

# Test source

```ts
  1  | import { BasePage } from "./BasePage";
  2  | import { expect } from "@playwright/test";
  3  | 
  4  | export class CartPage extends BasePage {
  5  | 
  6  |     constructor(page) {
  7  |         super(page);
  8  | 
  9  |         this.cartLink = page.locator("#cartur");
  10 |         this.cartTable = page.locator("#tbodyid");
  11 |         this.placeOrderButton = page.getByRole("button", {
  12 |     name: "Place Order"
  13 | });
  14 | }
  15 | 
  16 |     // Open Cart
  17 |    async openCart() {
  18 |     await this.click(this.cartLink);
  19 | 
  20 |     await expect(this.page).toHaveURL(/cart\.html/);
  21 | 
  22 |     // Wait until at least one cart row is loaded
  23 |     await expect(
  24 |         this.page.locator("#tbodyid tr").first()
> 25 |     ).toBeVisible({
     |       ^ Error: expect(locator).toBeVisible() failed
  26 |         timeout: 15000
  27 |     });
  28 | }
  29 |     // Verify Product in Cart
  30 |    async verifyProductInCart(productName) {
  31 |     await expect(
  32 |         this.page.locator(`#tbodyid tr:has-text("${productName}")`).first()
  33 |     ).toBeVisible();
  34 | }
  35 |    // Delete Product
  36 |     async deleteProduct(productName) {
  37 |         await this.page
  38 |             .locator(`#tbodyid tr:has-text("${productName}") >> text=Delete`)
  39 |             .click();
  40 |     }
  41 | 
  42 |     // Click Place Order
  43 |     async clickPlaceOrder() {
  44 | 
  45 |     await expect(this.placeOrderButton).toBeVisible();
  46 | 
  47 |     await this.placeOrderButton.click();
  48 | 
  49 |     await expect(this.page.locator("#orderModal")).toBeVisible({
  50 |         timeout: 10000
  51 |     });
  52 | 
  53 | }
  54 | }
```