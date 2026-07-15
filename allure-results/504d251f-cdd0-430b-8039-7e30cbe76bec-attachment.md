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
  - text:            X 
  - navigation [ref=e33]:
    - generic [ref=e34]:
      - link "PRODUCT STORE" [ref=e35]:
        - /url: index.html
        - img [ref=e36]
        - text: PRODUCT STORE
      - list [ref=e38]:
        - listitem [ref=e39]:
          - link "Home (current)" [ref=e40]:
            - /url: index.html
            - text: Home
            - generic [ref=e41]: (current)
        - listitem [ref=e42]:
          - link "Contact" [ref=e43]:
            - /url: "#"
        - listitem [ref=e44]:
          - link "About us" [ref=e45]:
            - /url: "#"
        - listitem [ref=e46]:
          - link "Cart" [ref=e47]:
            - /url: "#"
        - listitem [ref=e48]:
          - link "Log in" [ref=e49]:
            - /url: "#"
        - listitem
        - listitem
        - listitem [ref=e50]:
          - link "Sign up" [ref=e51]:
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
              - link "Delete" [ref=e71]:
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
      - text: "Id: 5087616"
      - text: "Amount: 360 USD"
      - text: "Card Number: 4111111111111111"
      - text: "Name: Sanket Tere"
      - text: "Date: 9/6/2026"
    - button "OK" [ref=e111]
```

# Test source

```ts
  1   | import { expect } from '@playwright/test';
  2   | 
  3   | export class BasePage {
  4   | 
  5   |     constructor(page) {
  6   |         this.page = page;
  7   |     }
  8   | 
  9   |     // Navigate to URL
  10  |     async navigate(url) {
  11  |     await this.page.goto(url, {
  12  |         waitUntil: "domcontentloaded",
  13  |         timeout: 60000
  14  |     });
  15  | }
  16  |     // Click on an element
  17  |    async click(locator) {
  18  |     await locator.waitFor({
  19  |         state: "visible",
  20  |         timeout: 15000
  21  |     });
  22  | 
> 23  |     await locator.click({
      |                   ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  24  |         timeout: 15000
  25  |     });
  26  | }
  27  | 
  28  |     // Enter text into a field
  29  |     async fill(locator, value) {
  30  |         await locator.fill(value);
  31  |     }
  32  | 
  33  |     // Get text from an element
  34  |     async getText(locator) {
  35  |         return await locator.textContent();
  36  |     }
  37  | 
  38  |     // Check if an element is visible
  39  |     async isVisible(locator) {
  40  |         return await locator.isVisible();
  41  |     }
  42  | 
  43  |     // Wait for an element to be visible
  44  |     async waitForElement(locator) {
  45  |         await locator.waitFor({ state: 'visible' });
  46  |     }
  47  | 
  48  |     // Wait for a specified time (use only when necessary)
  49  |     async wait(milliseconds) {
  50  |         await this.page.waitForTimeout(milliseconds);
  51  |     }
  52  | 
  53  |     // Accept browser alert/dialog
  54  |     // async acceptAlert() {
  55  |     //     this.page.once('dialog', async dialog => {
  56  |     //         console.log("Alert Message:", dialog.message());
  57  |     //         await dialog.accept();
  58  |     //     });
  59  |     // }
  60  | 
  61  |     // Dismiss browser alert/dialog
  62  |     async dismissAlert() {
  63  |         this.page.once('dialog', async dialog => {
  64  |             console.log("Alert Message:", dialog.message());
  65  |             await dialog.dismiss();
  66  |         });
  67  |     }
  68  | 
  69  |     // Verify page title
  70  |     async verifyTitle(expectedTitle) {
  71  |         await expect(this.page).toHaveTitle(expectedTitle);
  72  |     }
  73  | 
  74  |     // Verify current URL
  75  |     async verifyURL(expectedURL) {
  76  |         await expect(this.page).toHaveURL(expectedURL);
  77  |     }
  78  | 
  79  |     // Take screenshot
  80  |     async takeScreenshot(fileName) {
  81  |         await this.page.screenshot({
  82  |             path: `screenshots/${fileName}.png`,
  83  |             fullPage: true
  84  |         });
  85  |     }
  86  | 
  87  |     // Scroll to an element
  88  |     async scrollTo(locator) {
  89  |         await locator.scrollIntoViewIfNeeded();
  90  |     }
  91  | 
  92  |     // Reload page
  93  |     async refresh() {
  94  |         await this.page.reload();
  95  |     }
  96  | 
  97  |     // Go back
  98  |     async goBack() {
  99  |         await this.page.goBack();
  100 |     }
  101 | 
  102 |     // Go forward
  103 |     async goForward() {
  104 |         await this.page.goForward();
  105 |     }
  106 | }
```