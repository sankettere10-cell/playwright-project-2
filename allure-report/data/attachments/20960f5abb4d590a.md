# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.js >> Verify Product in Cart
- Location: tests\cart.spec.js:6:5

# Error details

```
Test timeout of 60000ms exceeded.
```

```
TimeoutError: page.goto: Timeout 60000ms exceeded.
Call log:
  - navigating to "https://www.demoblaze.com/", waiting until "domcontentloaded"

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
    - generic [ref=e21]:
      - list [ref=e22]:
        - listitem [ref=e23] [cursor=pointer]
        - listitem [ref=e24] [cursor=pointer]
        - listitem [ref=e25] [cursor=pointer]
      - img "First slide" [ref=e28]
      - button "Previous" [ref=e29] [cursor=pointer]:
        - generic [ref=e31]: Previous
      - button "Next" [ref=e32] [cursor=pointer]:
        - generic [ref=e34]: Next
  - generic [ref=e36]:
    - generic [ref=e38]:
      - link "CATEGORIES" [ref=e39] [cursor=pointer]:
        - /url: ""
      - link "Phones" [ref=e40] [cursor=pointer]:
        - /url: "#"
      - link "Laptops" [ref=e41] [cursor=pointer]:
        - /url: "#"
      - link "Monitors" [ref=e42] [cursor=pointer]:
        - /url: "#"
    - list [ref=e45]:
      - listitem [ref=e46]:
        - button "Previous" [ref=e47]
      - listitem [ref=e48]:
        - button "Next" [ref=e49] [cursor=pointer]
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
> 11  |     await this.page.goto(url, {
      |                     ^ TimeoutError: page.goto: Timeout 60000ms exceeded.
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
  23  |     await locator.click({
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