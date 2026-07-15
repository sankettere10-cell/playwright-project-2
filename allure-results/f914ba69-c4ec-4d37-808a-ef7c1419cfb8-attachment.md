# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Addcartpage.spec.js >> Add Product to Cart
- Location: tests\Addcartpage.spec.js:5:5

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://www.demoblaze.com/
Call log:
  - navigating to "https://www.demoblaze.com/", waiting until "domcontentloaded"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]: Check if there is a typo in www.demoblaze.com.
    - generic [ref=e9]:
      - paragraph
      - list [ref=e10]:
        - listitem [ref=e11]:
          - text: If spelling is correct,
          - link "try running Windows Network Diagnostics" [ref=e12] [cursor=pointer]:
            - /url: javascript:diagnoseErrors()
          - text: .
    - generic [ref=e13]: DNS_PROBE_FINISHED_NXDOMAIN
  - button "Reload" [ref=e16] [cursor=pointer]
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
      |                     ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://www.demoblaze.com/
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