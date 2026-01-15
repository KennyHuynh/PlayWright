import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
    readonly proceedToCheckoutLink: Locator;
    itemNameLink: Locator;
    itemPriceLink: Locator;
    firstNameTextBox: Locator;
    lastNameTextBox: Locator;
    companyTextBox: Locator;
    countryDropdown: Locator;
    streetAddressTextBox: Locator;
    apartmentTextBox: Locator;
    cityTextBox: Locator;
    stateDropdown: Locator;
    zipCodeTextBox: Locator;
    phoneTextBox: Locator;
    emailTextBox: Locator;

    constructor(page: any) {
        super(page);
        this.proceedToCheckoutLink = page.getByRole('link', { name: 'PROCEED TO CHECKOUT' });   
        this.itemNameLink = null as unknown as Locator;
        this.itemPriceLink = null as unknown as Locator;
        this.firstNameTextBox = page.getByRole('textbox', { name: 'First name *' });
        this.lastNameTextBox = page.getByRole('textbox', { name: 'Last name *' });
        this.companyTextBox = page.getByRole('textbox', { name: 'Company name (optional)' });
        this.countryDropdown = page.locator('#billing_country');
        this.streetAddressTextBox = page.getByRole('textbox', { name: 'Street address *' });
        this.apartmentTextBox = page.getByRole('textbox', { name: 'Apartment, suite, unit etc. (optional)' });
        this.cityTextBox = page.getByRole('textbox', { name: 'Town / City *' });
        this.stateDropdown = page.locator('#billing_state').first();
        this.zipCodeTextBox = page.getByRole('textbox', { name: 'Postcode / ZIP *' });
        this.phoneTextBox = page.getByRole('textbox', { name: 'Phone *' });
        this.emailTextBox = page.getByRole('textbox', { name: 'Email address *' });
    }

    async proceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutLink.click();
        console.log('Proceeded to checkout.');
    }

    async verifyItemInCart(expectedItemName: string, expectedItemPrice: string): Promise<boolean> {
        this.itemNameLink = this.page.getByRole('link', { name: expectedItemName });
        this.itemPriceLink = this.page.locator(`//bdi[.='${expectedItemPrice}']`).last();
        const isItemVisible = await this.itemNameLink.isVisible() ;
        const isPriceVisible = await this.itemPriceLink.isVisible();
        const areBothVisible = isItemVisible && isPriceVisible;
        console.log(`Verifying Item "${expectedItemName}" visibility in cart: ${areBothVisible}`);
        return areBothVisible;
    }

    async fillBillingDetails(billingDetails: {
        firstName: string;
        lastName: string;
        country: string;
        streetAddress: string;
        city: string;
        state: string;
        zipCode: string;
        phone: string;
        email: string;
    }): Promise<void> {
        await this.firstNameTextBox.fill(billingDetails.firstName);
        await this.lastNameTextBox.fill(billingDetails.lastName);
        await this.countryDropdown.selectOption({ label: billingDetails.country });
        await this.streetAddressTextBox.fill(billingDetails.streetAddress);
        await this.cityTextBox.fill(billingDetails.city);
        await this.stateDropdown.selectOption({ label: billingDetails.state });
        await this.zipCodeTextBox.fill(billingDetails.zipCode);
        await this.phoneTextBox.fill(billingDetails.phone);
        await this.emailTextBox.fill(billingDetails.email);
        console.log('Filled billing details.');
    }
}