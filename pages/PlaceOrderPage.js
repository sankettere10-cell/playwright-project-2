import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class PlaceOrderPage extends BasePage {

    constructor(page) {
        super(page);

        // Place Order Modal
        this.placeOrderModal = page.locator("#orderModal");

        // Customer Details
        this.name = page.locator("#name");
        this.country = page.locator("#country");
        this.city = page.locator("#city");
        this.card = page.locator("#card");
        this.month = page.locator("#month");
        this.year = page.locator("#year");

        // Buttons
        this.purchaseButton = page.locator('//button[text()="Purchase"]');
        this.closeButton = page.locator(
            '#orderModal button[data-dismiss="modal"]'
        );

        // Confirmation
        this.successMessage = page.locator(".sweet-alert.showSweetAlert.visible");
        this.confirmButton = page.locator(".confirm");
        this.confirmationText = page.locator(".sweet-alert p");
    }

    // Verify Place Order Popup
    async verifyPlaceOrderPopup() {
        await expect(this.placeOrderModal).toBeVisible();
    }

    // Fill Customer Details
    async fillOrderDetails(order) {

        await this.fill(this.name, order.name);
        await this.fill(this.country, order.country);
        await this.fill(this.city, order.city);
        await this.fill(this.card, order.card);
        await this.fill(this.month, order.month);
        await this.fill(this.year, order.year);

    }

    // Purchase Product
    async clickPurchase() {
        await this.click(this.purchaseButton);
    }

    // Complete Checkout
    async placeOrder(order) {

        await this.fillOrderDetails(order);

        await this.clickPurchase();

    }

    // Verify Success Popup
    async verifyOrderSuccess() {
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toContainText("Thank you for your purchase!");
    }

    // Get Confirmation Details
    async getConfirmationDetails() {
        return await this.confirmationText.textContent();
    }

    // Close Confirmation Popup
    async confirmPurchase() {

    await expect(this.confirmButton).toBeVisible({
        timeout: 20000
    });

    await expect(this.confirmButton).toBeEnabled();

    await this.confirmButton.click({
        force: true
    });
}

    // Close Place Order Popup
    async closePopup() {
        await this.click(this.closeButton);
    }

}