const { test, expect } = require('@playwright/test');
 
 
 
 
test.only('Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "avinashkumar.nilu.ak@gmail.com";
   const productName = 'IPHONE 13 PRO';
   const products = page.locator(".card-body h5 b");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Milton@01748");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   const titles = await page.locator(".card-body h5 b").allTextContents();
   console.log(titles);
   //not working code
//    const count = await products.count();
//    console.log(count) //6
//    for (let i = 0; i < count; ++i) {
//       if (await products.nth(1).textContent() === productName) {
//          //add to cart
         
//          await page.locator("text= Add To Cart").click();
//          break;
//       }
//    }
    await page.locator("#products > div.container > div.row > div:nth-child(2) > div > div > button.btn.w-10.rounded").click();
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
 
   await page.locator("[placeholder*='Country']").pressSequentially("ind");
 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});