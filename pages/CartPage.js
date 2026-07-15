import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class CartPage extends BasePage {

    constructor(page) {
        super(page);

        this.cartLink = page.locator("#cartur");
        this.cartTable = page.locator("#tbodyid");
        this.placeOrderButton = page.getByRole("button", {
    name: "Place Order"
});
}

    // Open Cart
   async openCart() {
    await this.click(this.cartLink);

    await expect(this.page).toHaveURL(/cart\.html/);

    // Wait until at least one cart row is loaded
   await this.page.waitForLoadState("domcontentloaded");

await expect(this.page.locator("#tbodyid"))
    .toBeVisible();

await expect(this.page.locator("#tbodyid tr"))
    .toHaveCount(1,{
        timeout:20000
    });
}
    // Verify Product in Cart
   async verifyProductInCart(productName) {
    await expect(
        this.page.locator(`#tbodyid tr:has-text("${productName}")`).first()
    ).toBeVisible();
}
   // Delete Product
    async deleteProduct(productName) {
        await this.page
            .locator(`#tbodyid tr:has-text("${productName}") >> text=Delete`)
            .click();
    }

    // Click Place Order
    async clickPlaceOrder() {

    await expect(this.placeOrderButton).toBeVisible();

    await this.placeOrderButton.click();

    await expect(this.page.locator("#orderModal")).toBeVisible({
        timeout: 10000
    });

}
}