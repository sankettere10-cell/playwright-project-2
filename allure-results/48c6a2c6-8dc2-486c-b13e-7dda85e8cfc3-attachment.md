# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.js >> Complete Purchase
- Location: tests\checkout.spec.js:10:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.sweet-alert.showSweetAlert.visible')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('.sweet-alert.showSweetAlert.visible')

```

```yaml
- dialog "Place order":
  - document:
    - heading "Place order" [level=5]
    - button "Close"
    - text: "Total: 360 Name:"
    - 'textbox "Total: 360 Name:"'
    - text: "Country:"
    - textbox "Country:": India
    - text: "City:"
    - textbox "City:": Mumbai
    - text: "Credit card:"
    - textbox "Credit card:": "4111111111111111"
    - text: "Month:"
    - textbox "Month:": "07"
    - text: "Year:"
    - textbox "Year:": "2028"
    - button "Close"
    - button "Purchase"
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
  - rowgroup:
    - row "Samsung galaxy s6 360 Delete":
      - cell:
        - img
      - cell "Samsung galaxy s6"
      - cell "360"
      - cell "Delete":
        - link "Delete":
          - /url: "#"
- heading "Total" [level=2]
- heading "360" [level=3]
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
  4  | export class PlaceOrderPage extends BasePage {
  5  | 
  6  |     constructor(page) {
  7  |         super(page);
  8  | 
  9  |         // Place Order Modal
  10 |         this.placeOrderModal = page.locator("#orderModal");
  11 | 
  12 |         // Customer Details
  13 |         this.name = page.locator("#name");
  14 |         this.country = page.locator("#country");
  15 |         this.city = page.locator("#city");
  16 |         this.card = page.locator("#card");
  17 |         this.month = page.locator("#month");
  18 |         this.year = page.locator("#year");
  19 | 
  20 |         // Buttons
  21 |         this.purchaseButton = page.locator('//button[text()="Purchase"]');
  22 |         this.closeButton = page.locator(
  23 |             '#orderModal button[data-dismiss="modal"]'
  24 |         );
  25 | 
  26 |         // Confirmation
  27 |         this.successMessage = page.locator(".sweet-alert.showSweetAlert.visible");
  28 |         this.confirmButton = page.locator(".confirm");
  29 |         this.confirmationText = page.locator(".sweet-alert p");
  30 |     }
  31 | 
  32 |     // Verify Place Order Popup
  33 |     async verifyPlaceOrderPopup() {
  34 |         await expect(this.placeOrderModal).toBeVisible();
  35 |     }
  36 | 
  37 |     // Fill Customer Details
  38 |     async fillOrderDetails(order) {
  39 | 
  40 |         await this.fill(this.name, order.name);
  41 |         await this.fill(this.country, order.country);
  42 |         await this.fill(this.city, order.city);
  43 |         await this.fill(this.card, order.card);
  44 |         await this.fill(this.month, order.month);
  45 |         await this.fill(this.year, order.year);
  46 | 
  47 |     }
  48 | 
  49 |     // Purchase Product
  50 |     async clickPurchase() {
  51 |         await this.click(this.purchaseButton);
  52 |     }
  53 | 
  54 |     // Complete Checkout
  55 |     async placeOrder(order) {
  56 | 
  57 |         await this.fillOrderDetails(order);
  58 | 
  59 |         await this.clickPurchase();
  60 | 
  61 |     }
  62 | 
  63 |     // Verify Success Popup
  64 |     async verifyOrderSuccess() {
> 65 |         await expect(this.successMessage).toBeVisible();
     |                                           ^ Error: expect(locator).toBeVisible() failed
  66 |         await expect(this.successMessage).toContainText("Thank you for your purchase!");
  67 |     }
  68 | 
  69 |     // Get Confirmation Details
  70 |     async getConfirmationDetails() {
  71 |         return await this.confirmationText.textContent();
  72 |     }
  73 | 
  74 |     // Close Confirmation Popup
  75 |     async confirmPurchase() {
  76 |         await this.click(this.confirmButton);
  77 |     }
  78 | 
  79 |     // Close Place Order Popup
  80 |     async closePopup() {
  81 |         await this.click(this.closeButton);
  82 |     }
  83 | 
  84 | }
```