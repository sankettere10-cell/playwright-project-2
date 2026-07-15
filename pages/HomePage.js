import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class HomePage extends BasePage {

    constructor(page) {
        super(page);

        // Navigation Menu
        this.homeLink = page.locator('//a[contains(text(),"Home")]');
        this.contactLink = page.getByRole('link', { name: 'Contact' });
this.aboutUsLink = page.getByRole('link', { name: 'About us' });
        this.loginLink = page.getByRole('link', { name: 'Log in' });
this.signupLink = page.getByRole('link', { name: 'Sign up' });
this.cartLink = page.getByRole('link', { name: 'Cart' });
        this.logoutLink = page.locator('#logout2');

        // Logo
        this.logo = page.locator('#nava');

        // Categories
        this.categoryPhones = page.locator('//a[text()="Phones"]');
        this.categoryLaptops = page.locator('//a[text()="Laptops"]');
        this.categoryMonitors = page.locator('//a[text()="Monitors"]');

        // Carousel
        this.nextButton = page.locator('.carousel-control-next');
        this.previousButton = page.locator('.carousel-control-prev');
        this.activeCarouselItem = page.locator('.carousel-item.active');

        // Product Cards
        this.products = page.locator('.card');

        // Contact Modal ("New message")
        this.contactModal = page.locator('#exampleModal');
        this.contactCloseButton = page.locator('#exampleModal button:text("Close")');

        // About Us Modal (video)
        this.aboutUsModal = page.locator('#videoModal');
        this.aboutUsCloseButton = page.locator('#videoModal button:text("Close")');
    }

    // Open Application
   async openApplication() {

    await this.navigate("/");

    await expect(this.logo).toBeVisible();

    await this.page.waitForSelector(".card-title a",{
    state:"visible",
    timeout:30000
});
}
    // Verify Home Page
    async verifyHomePage() {
        await expect(this.logo).toBeVisible();
        await expect(this.homeLink).toBeVisible();
    }

    // Navigation
    async clickLogin() {
        await this.click(this.loginLink);
    }

    async clickSignup() {
        await this.click(this.signupLink);
    }

    async clickCart() {
    await this.click(this.cartLink);
}

   async clickContact() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.click(this.contactLink);
    await expect(this.contactModal).toBeVisible();
}

    async closeContact() {
        await this.click(this.contactCloseButton);
        await expect(this.contactModal).toBeHidden();
    }

    async clickAboutUs() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.click(this.aboutUsLink);
    await expect(this.aboutUsModal).toBeVisible();
}

    async closeAboutUs() {
        await this.click(this.aboutUsCloseButton);
        await expect(this.aboutUsModal).toBeHidden();
    }

    async clickLogout() {
        await this.click(this.logoutLink);
    }

    // Categories
    async selectPhones() {
        await this.click(this.categoryPhones);
        await expect(this.products.first()).toBeVisible();
    }

    async selectLaptops() {
        await this.click(this.categoryLaptops);
        await expect(this.products.first()).toBeVisible();
    }

    async selectMonitors() {

    await this.click(this.categoryMonitors);

    await this.page.waitForLoadState("domcontentloaded");

    await expect(this.page.locator(".card-title a"))
        .toHaveCount(2,{
            timeout:20000
        });

}

    // Carousel
    async getActiveSlideImageSrc() {
        return await this.activeCarouselItem.locator('img').getAttribute('src');
    }

    async clickNext() {
        const before = await this.getActiveSlideImageSrc();
        await this.click(this.nextButton);
        await expect
            .poll(() => this.getActiveSlideImageSrc())
            .not.toBe(before);
    }

    async clickPrevious() {
        const before = await this.getActiveSlideImageSrc();
        await this.click(this.previousButton);
        await expect
            .poll(() => this.getActiveSlideImageSrc())
            .not.toBe(before);
    }

    // Open Product by Name
    async openProduct(productName) {
        await this.page.locator(`//a[text()="${productName}"]`).click();
    }

    // Verify Product Exists
    async verifyProduct(productName) {

    const product = this.page.locator(".card-title a", {
        hasText: productName
    }).first();

    await expect(product).toBeVisible({
        timeout: 30000
    });

}
    // Get Number of Products
    async getProductCount() {
        return await this.products.count();
    }
}