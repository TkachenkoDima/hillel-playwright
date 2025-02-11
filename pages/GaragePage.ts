import { Locator, Page } from '@playwright/test';

export class GaragePage {
    readonly h3: Locator;
    readonly profileButton: Locator;
    readonly successRegistrationAlert: Locator;
    readonly emptyGarageMessage: Locator;
    readonly addCarButton: Locator;
    readonly carBrandInput: Locator;
    readonly carModelInput: Locator;
    readonly saveCarButton: Locator;
    readonly addedCarItem: Locator;
    readonly mileageInput: Locator;

    constructor(readonly page: Page) {
        this.h3 = page.locator('h3');
        this.profileButton = page.locator('#userNavDropdown');
        this.successRegistrationAlert = page.locator('div[class="alert alert-success"]');
        this.emptyGarageMessage = page.locator('p[class$="panel-empty_message"]');
        this.addCarButton = page.locator('button[class$="btn-primary"]');
        this.carBrandInput = page.locator('#addCarBrand');
        this.carModelInput = page.locator('#carModelId');
        this.saveCarButton = page.locator('div[class^="modal-footer"] button');
        this.addedCarItem = page.locator('.car-list li');
        this.mileageInput = page.locator('#addCarMileage');
    }

    async getSuccessRegistrationAlertText() {
        return this.successRegistrationAlert.textContent();
    }

    async isGarageEmpty() {
        return await this.addedCarItem.count() === 0;
    }
    
    async isGarageEmptyMessage() {
        return await this.emptyGarageMessage.textContent() === 'You don’t have any cars in your garage';
    }

    async addCar(make: string, model: string, mileage: string) {
        await this.addCarButton.first().click();
        await this.selectCarBrand(make);
        await this.selectCarModel(model);
        await this.mileageInput.fill(mileage);
        await this.saveCarButton.last().click();
    }    

    async selectCarBrand(make: string) {
        const brandDropdown = this.page.locator('select#addCarBrand');
        await brandDropdown.waitFor({ state: 'visible' });
        await brandDropdown.selectOption({ label: make });
    }
    
    async selectCarModel(model: string) {
        const modelDropdown = this.page.locator('select#addCarModel');
        await modelDropdown.waitFor({ state: 'visible' });
        await modelDropdown.selectOption({ label: model });
    }
}
