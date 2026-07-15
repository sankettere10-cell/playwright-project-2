# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.js >> Verify Product in Cart
- Location: tests\cart.spec.js:7:5

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
        - /url: "#"
    - listitem:
      - link "Log in":
        - /url: "#"
    - listitem
    - listitem
    - listitem:
      - link "Sign up":
        - /url: "#"
- heading "Products" [level=2]
- table:
  - rowgroup:
    - row "Pic Title Price x":
      - columnheader "Pic"
      - columnheader "Title"
      - columnheader "Price"
      - columnheader "x"
  - rowgroup
- heading "Total" [level=2]
- heading [level=3]
- button "Place Order"
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