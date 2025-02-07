import { Page } from "@playwright/test";
import { config } from "../data.config";

export class BasePage {
    constructor(private page: Page) {}

    async openMainPage() {
        await this.page.goto(config.baseURL);
    }
}
