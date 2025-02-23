const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const playwright = require('@playwright/test'); //importing the playwright so we can generate browser object
const { POManager } = require('../../pageobjects/POManager')


Before(async function(){
     const browser = await playwright.chromium.launch({
            headless:false
        }); // we can generate the browser object , this will yield a browser for us
        const context = await browser.newContext(); // from a browser we are dreving a context 
         this.page = await context.newPage(); //from the contect we are deriving the page 
        this.poManager = new POManager(this.page); //finally we are getting a varible
});
BeforeStep(function(){

});

AfterStep(async function({result}){
    if(result.status=== Status.FAILED)
    {
        await this.page.screenshot({path: 'screenshot1.png'})
    }

});



After(function(){
    console.log("i'm the last step to run")
})