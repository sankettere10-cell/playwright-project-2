# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.js >> End-to-End Purchase Flow
- Location: tests\smoke.spec.js:11:5

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
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - link "PRODUCT STORE" [ref=e3] [cursor=pointer]:
      - /url: index.html
      - img [ref=e4]
      - text: PRODUCT STORE
    - list [ref=e6]:
      - listitem [ref=e7]:
        - link "Home (current)" [ref=e8] [cursor=pointer]:
          - /url: index.html
          - text: Home
          - generic [ref=e9]: (current)
      - listitem [ref=e10]:
        - link "Contact" [ref=e11] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e12]:
        - link "About us" [ref=e13] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e14]:
        - link "Cart" [ref=e15] [cursor=pointer]:
          - /url: cart.html
      - listitem [ref=e16]:
        - link "Log in" [ref=e17] [cursor=pointer]:
          - /url: "#"
      - listitem
      - listitem
      - listitem [ref=e18]:
        - link "Sign up" [ref=e19] [cursor=pointer]:
          - /url: "#"
    - generic:
      - generic:
        - list [ref=e20]:
          - listitem [ref=e21] [cursor=pointer]
          - listitem [ref=e22] [cursor=pointer]
          - listitem [ref=e23] [cursor=pointer]
        - generic:
          - generic:
            - img "First slide"
        - button "Previous":
          - generic [ref=e25] [cursor=pointer]: Previous
        - button "Next":
          - generic [ref=e27] [cursor=pointer]: Next
  - generic [ref=e29]:
    - generic [ref=e31]:
      - link "CATEGORIES" [ref=e32] [cursor=pointer]:
        - /url: ""
      - link "Phones" [ref=e33] [cursor=pointer]:
        - /url: "#"
      - link "Laptops" [ref=e34] [cursor=pointer]:
        - /url: "#"
      - link "Monitors" [ref=e35] [cursor=pointer]:
        - /url: "#"
    - list [ref=e38]:
      - listitem [ref=e39]:
        - button "Previous" [ref=e40]
      - listitem [ref=e41]:
        - button "Next" [ref=e42] [cursor=pointer]
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