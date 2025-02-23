const {test} = require("@playwright/test");
const {expect} = require("@playwright/test");
const { text } = require("stream/consumers");


test("Browser context First playwright test", async ({browser})=> 
{
    // chrome - Plugins/ cookies
    const context = await browser.newContext(); //it will create a fresh browser
    const page = await context.newPage(); // to open a new tab in browser
    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // now go to URl in the page 
    console.log(await page.title());
    //CSS
    
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await signIn.click();
    // console.log(await cardTitles.first().textContent()); // to get the first element
    // console.log(await cardTitles.nth(1).textContent()); // to get the desired element in our same class
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    

});

test("UI controls", async ({page})=> //here it automatically says we don't need to create a browser instance and it will get to kno it's a page we want to open
    {
       
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const userName = page.locator("#username");
        const signIn = page.locator("#signInBtn");
        const dropDown = page.locator("select.form-control")
        await dropDown.selectOption("Consultant");
        await page.locator(".radiotextsty").nth(1).click();
        await page.locator("#okayBtn").click();
        console.log(await page.locator(".radiotextsty").nth(1).isChecked());
        await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
        await page.locator("#terms").check();
        await expect(page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
        expect(await page.locator("#terms").isChecked()).toBeFalsy();
        
    
    });

test("New tab handle", async ({browser})=> 
    {
       const context =await browser.newContext();
       const page = await context.newPage();
       const userName = page.locator("#username");
       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
       const documentLink = page.locator("[href*='documents-request']");

       const [newpage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
       ])
       const text = await newpage.locator(".red").textContent();
       const arrayText = text.split("@")  // it will split text into two array before @ 1 and after @ 2
       const domain =arrayText[1].split("")[0]
       await page.locator("#username").fill(domain);
       console.log(await page.locator("#username").textContent());


        
        
    
    });
