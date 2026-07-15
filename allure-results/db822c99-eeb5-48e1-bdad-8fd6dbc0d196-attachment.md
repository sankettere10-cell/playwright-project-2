# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: category.spec.js >> Category Filters >> Filter by Monitors
- Location: tests\category.spec.js:22:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('//a[text()="Apple monitor 24"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('//a[text()="Apple monitor 24"]')

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
        - /url: cart.html
    - listitem:
      - link "Log in":
        - /url: "#"
    - listitem
    - listitem
    - listitem:
      - link "Sign up":
        - /url: "#"
  - list:
    - listitem
    - listitem
    - listitem
  - img "Third slide"
  - button "Previous"
  - button "Next"
- link "CATEGORIES":
  - /url: ""
- link "Phones":
  - /url: "#"
- link "Laptops":
  - /url: "#"
- link "Monitors":
  - /url: "#"
- link:
  - /url: prod.html?idp_=1
- heading "Samsung galaxy s6" [level=4]:
  - link "Samsung galaxy s6":
    - /url: prod.html?idp_=1
- heading "$360" [level=5]
- paragraph: The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage cannot be expanded.
- link:
  - /url: prod.html?idp_=2
- heading "Nokia lumia 1520" [level=4]:
  - link "Nokia lumia 1520":
    - /url: prod.html?idp_=2
- heading "$820" [level=5]
- paragraph: The Nokia Lumia 1520 is powered by 2.2GHz quad-core Qualcomm Snapdragon 800 processor and it comes with 2GB of RAM.
- link:
  - /url: prod.html?idp_=3
- heading "Nexus 6" [level=4]:
  - link "Nexus 6":
    - /url: prod.html?idp_=3
- heading "$650" [level=5]
- paragraph: The Motorola Google Nexus 6 is powered by 2.7GHz quad-core Qualcomm Snapdragon 805 processor and it comes with 3GB of RAM.
- link:
  - /url: prod.html?idp_=4
- heading "Samsung galaxy s7" [level=4]:
  - link "Samsung galaxy s7":
    - /url: prod.html?idp_=4
- heading "$800" [level=5]
- paragraph: The Samsung Galaxy S7 is powered by 1.6GHz octa-core it comes with 4GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 200GB via a microSD card.
- link:
  - /url: prod.html?idp_=5
- heading "Iphone 6 32gb" [level=4]:
  - link "Iphone 6 32gb":
    - /url: prod.html?idp_=5
- heading "$790" [level=5]
- paragraph: It comes with 1GB of RAM. The phone packs 16GB of internal storage cannot be expanded. As far as the cameras are concerned, the Apple iPhone 6 packs a 8-megapixel primary camera on the rear and a 1.2-megapixel front shooter for selfies.
- link:
  - /url: prod.html?idp_=6
- heading "Sony xperia z5" [level=4]:
  - link "Sony xperia z5":
    - /url: prod.html?idp_=6
- heading "$320" [level=5]
- paragraph: Sony Xperia Z5 Dual smartphone was launched in September 2015. The phone comes with a 5.20-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels at a PPI of 424 pixels per inch.
- link:
  - /url: prod.html?idp_=7
- heading "HTC One M9" [level=4]:
  - link "HTC One M9":
    - /url: prod.html?idp_=7
- heading "$700" [level=5]
- paragraph: The HTC One M9 is powered by 1.5GHz octa-core Qualcomm Snapdragon 810 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 128GB via a microSD card.
- link:
  - /url: prod.html?idp_=8
- heading "Sony vaio i5" [level=4]:
  - link "Sony vaio i5":
    - /url: prod.html?idp_=8
- heading "$790" [level=5]
- paragraph: Sony is so confident that the VAIO S is a superior ultraportable laptop that the company proudly compares the notebook to Apple's 13-inch MacBook Pro. And in a lot of ways this notebook is better, thanks to a lighter weight.
- link:
  - /url: prod.html?idp_=9
- heading "Sony vaio i7" [level=4]:
  - link "Sony vaio i7":
    - /url: prod.html?idp_=9
- heading "$790" [level=5]
- paragraph: REVIEW Sony is so confident that the VAIO S is a superior ultraportable laptop that the company proudly compares the notebook to Apple's 13-inch MacBook Pro. And in a lot of ways this notebook is better, thanks to a lighter weight, higher-resolution display, more storage space, and a Blu-ray drive.
- list:
  - listitem:
    - button "Previous"
  - listitem:
    - button "Next"
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
  46  |     await this.navigate("/");
  47  | 
  48  |     await expect(this.logo).toBeVisible();
  49  | 
  50  |     await expect(
  51  |         this.page.locator(".card-title a").first()
  52  |     ).toBeVisible({
  53  |         timeout: 20000
  54  |     });
  55  | 
  56  | }
  57  |     // Verify Home Page
  58  |     async verifyHomePage() {
  59  |         await expect(this.logo).toBeVisible();
  60  |         await expect(this.homeLink).toBeVisible();
  61  |     }
  62  | 
  63  |     // Navigation
  64  |     async clickLogin() {
  65  |         await this.click(this.loginLink);
  66  |     }
  67  | 
  68  |     async clickSignup() {
  69  |         await this.click(this.signupLink);
  70  |     }
  71  | 
  72  |     async clickCart() {
  73  |     await this.click(this.cartLink);
  74  | }
  75  | 
  76  |    async clickContact() {
  77  |     await this.page.waitForLoadState("domcontentloaded");
  78  |     await this.click(this.contactLink);
  79  |     await expect(this.contactModal).toBeVisible();
  80  | }
  81  | 
  82  |     async closeContact() {
  83  |         await this.click(this.contactCloseButton);
  84  |         await expect(this.contactModal).toBeHidden();
  85  |     }
  86  | 
  87  |     async clickAboutUs() {
  88  |     await this.page.waitForLoadState("domcontentloaded");
  89  |     await this.click(this.aboutUsLink);
  90  |     await expect(this.aboutUsModal).toBeVisible();
  91  | }
  92  | 
  93  |     async closeAboutUs() {
  94  |         await this.click(this.aboutUsCloseButton);
  95  |         await expect(this.aboutUsModal).toBeHidden();
  96  |     }
  97  | 
  98  |     async clickLogout() {
  99  |         await this.click(this.logoutLink);
  100 |     }
  101 | 
  102 |     // Categories
  103 |     async selectPhones() {
  104 |         await this.click(this.categoryPhones);
  105 |         await expect(this.products.first()).toBeVisible();
  106 |     }
  107 | 
  108 |     async selectLaptops() {
  109 |         await this.click(this.categoryLaptops);
  110 |         await expect(this.products.first()).toBeVisible();
  111 |     }
  112 | 
  113 |     async selectMonitors() {
  114 |         await this.click(this.categoryMonitors);
  115 |         await expect(this.products.first()).toBeVisible();
  116 |     }
  117 | 
  118 |     // Carousel
  119 |     async getActiveSlideImageSrc() {
  120 |         return await this.activeCarouselItem.locator('img').getAttribute('src');
  121 |     }
  122 | 
  123 |     async clickNext() {
  124 |         const before = await this.getActiveSlideImageSrc();
  125 |         await this.click(this.nextButton);
  126 |         await expect
  127 |             .poll(() => this.getActiveSlideImageSrc())
  128 |             .not.toBe(before);
  129 |     }
  130 | 
  131 |     async clickPrevious() {
  132 |         const before = await this.getActiveSlideImageSrc();
  133 |         await this.click(this.previousButton);
  134 |         await expect
  135 |             .poll(() => this.getActiveSlideImageSrc())
  136 |             .not.toBe(before);
  137 |     }
  138 | 
  139 |     // Open Product by Name
  140 |     async openProduct(productName) {
  141 |         await this.page.locator(`//a[text()="${productName}"]`).click();
  142 |     }
  143 | 
  144 |     // Verify Product Exists
  145 |     async verifyProduct(productName) {
> 146 |         await expect(this.page.locator(`//a[text()="${productName}"]`)).toBeVisible();
      |                                                                         ^ Error: expect(locator).toBeVisible() failed
  147 |     }
  148 | 
  149 |     // Get Number of Products
  150 |     async getProductCount() {
  151 |         return await this.products.count();
  152 |     }
  153 | }
```