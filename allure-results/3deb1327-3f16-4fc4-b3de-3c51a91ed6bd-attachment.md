# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.js >> Complete Purchase
- Location: tests\checkout.spec.js:10:5

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('.confirm')
    - locator resolved to <button tabindex="1" class="confirm btn btn-lg btn-primary">OK</button>
  - attempting click action
    - scrolling into view if needed
    - done scrolling
    - forcing action
    - performing click action
    - click action done
    - waiting for scheduled navigations to finish

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - dialog "Place order" [active] [ref=e2]:
    - document [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - heading "Place order" [level=5] [ref=e6]
          - button "Close" [ref=e7] [cursor=pointer]: ×
        - generic [ref=e9]:
          - generic [ref=e10]: "Total: 360"
          - generic [ref=e11]:
            - generic [ref=e12]: "Name:"
            - 'textbox "Total: 360 Name:" [ref=e13]': Sanket Tere
          - generic [ref=e14]:
            - generic [ref=e15]: "Country:"
            - textbox "Country:" [ref=e16]: India
          - generic [ref=e17]:
            - generic [ref=e18]: "City:"
            - textbox "City:" [ref=e19]: Mumbai
          - generic [ref=e20]:
            - generic [ref=e21]: "Credit card:"
            - textbox "Credit card:" [ref=e22]: "4111111111111111"
          - generic [ref=e23]:
            - generic [ref=e24]: "Month:"
            - textbox "Month:" [ref=e25]: "07"
          - generic [ref=e26]:
            - generic [ref=e27]: "Year:"
            - textbox "Year:" [ref=e28]: "2028"
        - generic [ref=e30]:
          - button "Close" [ref=e31]
          - button "Purchase" [ref=e32]
  - text:            
  - navigation [ref=e33]:
    - generic [ref=e34]:
      - link "PRODUCT STORE" [ref=e35] [cursor=pointer]:
        - /url: index.html
        - img [ref=e36]
        - text: PRODUCT STORE
      - list [ref=e38]:
        - listitem [ref=e39]:
          - link "Home (current)" [ref=e40] [cursor=pointer]:
            - /url: index.html
            - text: Home
            - generic [ref=e41]: (current)
        - listitem [ref=e42]:
          - link "Contact" [ref=e43] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e44]:
          - link "About us" [ref=e45] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e46]:
          - link "Cart" [ref=e47] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e48]:
          - link "Log in" [ref=e49] [cursor=pointer]:
            - /url: "#"
        - listitem
        - listitem
        - listitem [ref=e50]:
          - link "Sign up" [ref=e51] [cursor=pointer]:
            - /url: "#"
  - generic [ref=e53]:
    - generic [ref=e54]:
      - heading "Products" [level=2] [ref=e55]
      - table [ref=e57]:
        - rowgroup [ref=e58]:
          - row "Pic Title Price x" [ref=e59]:
            - columnheader "Pic" [ref=e60]
            - columnheader "Title" [ref=e61]
            - columnheader "Price" [ref=e62]
            - columnheader "x" [ref=e63]
        - rowgroup [ref=e64]:
          - row "Samsung galaxy s6 360 Delete" [ref=e65]:
            - cell [ref=e66]:
              - img [ref=e67]
            - cell "Samsung galaxy s6" [ref=e68]
            - cell "360" [ref=e69]
            - cell "Delete" [ref=e70]:
              - link "Delete" [ref=e71] [cursor=pointer]:
                - /url: "#"
    - generic [ref=e72]:
      - heading "Total" [level=2] [ref=e73]
      - heading "360" [level=3] [ref=e76]
      - button "Place Order" [ref=e77]
  - generic [ref=e79]:
    - generic [ref=e82]:
      - heading "About Us" [level=4] [ref=e83]
      - paragraph [ref=e84]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e87]:
      - heading "Get in Touch" [level=4] [ref=e88]
      - paragraph [ref=e89]: "Address: 2390 El Camino Real"
      - paragraph [ref=e90]: "Phone: +440 123456"
      - paragraph [ref=e91]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e95]:
      - img [ref=e96]
      - text: PRODUCT STORE
  - contentinfo [ref=e97]:
    - paragraph [ref=e98]: Copyright © Product Store
  - generic [ref=e101]:
    - heading "Thank you for your purchase!" [level=2] [ref=e107]
    - paragraph [ref=e108]:
      - text: "Id: 8314070"
      - text: "Amount: 360 USD"
      - text: "Card Number: 4111111111111111"
      - text: "Name: Sanket Tere"
      - text: "Date: 9/6/2026"
    - button "OK" [ref=e111]
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
  65 |         await expect(this.successMessage).toBeVisible();
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
  76 | 
  77 |     await expect(this.confirmButton).toBeVisible({
  78 |         timeout: 20000
  79 |     });
  80 | 
  81 |     await expect(this.confirmButton).toBeEnabled();
  82 | 
> 83 |     await this.confirmButton.click({
     |                              ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  84 |         force: true
  85 |     });
  86 | }
  87 | 
  88 |     // Close Place Order Popup
  89 |     async closePopup() {
  90 |         await this.click(this.closeButton);
  91 |     }
  92 | 
  93 | }
```