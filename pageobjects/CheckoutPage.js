class Checkout{
    constructor(page){
        this.searchCountry = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
    }

    async selectCountry(){
        await this.searchCountry.pressSequentially("ind");
    }
}
module.exports = {Checkout}