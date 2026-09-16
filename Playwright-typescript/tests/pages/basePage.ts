// common base page with reusable actions, extended by the other page objects
import { Page, Locator } from "@playwright/test";

export class BasePage {
    readonly page: Page; 

    constructor(page: Page) {
        this.page = page; 
    } 

    async b_navigateTo(url:string, maxTimeout:number){
        await this.page.goto(url,{timeout:maxTimeout});
    }

    async b_clickElement(element:Locator, isForceClick?:boolean, maxTimeout?:number){
        await element.click({force:isForceClick, timeout:maxTimeout});
    }

    async b_enterText(element:Locator, text:string, maxTimeout?:number){
       await element.fill(text, {timeout:maxTimeout});
    }

}
