const { When,Then,Given } =  require("@cucumber/cucumber");
const { POManager } = require('../../pageobjects/POManager')
const{expect} = require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
    const loginPage = this.poManager.getLoginPage(); // login page 
    await loginPage.goTo();
    await loginPage.validLogin(username,password);
   
  });

  When('Add product to cart', async function() {
    this.dashboardPage = this.poManager.getDashboardPage(); // Save in this context
    await this.dashboardPage.searchProductAddCart();
    await this.dashboardPage.navigateToCart();
});

  Then('Verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage(); // cart page 
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
  });

  When('Enter valid details and place the Order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage(); // get ordersreview page 
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
  });

  Then('Verify order in present in the Order history',async  function () {
    await this.dashboardPage.navigateToOrders();
   const ordersHistoryPage = this.poManager.getOrdersHistoryPage(); // order history page 
   await ordersHistoryPage.searchOrderAndSelect(this.orderId);
   expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });

  //___________________++++++++++++++++++++______________________________________________


  Given('a login to Ecommerce2 application with {string} and {string}', async function (rahulshetty, learning) {
    const userName = this.page.locator("#username");
    const password = this.page.locator("[type='password']");
    const signIn = this.page.locator("#signInBtn");
     await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // now go to URl in the page 
    console.log(await this.page.title());
    await userName.fill(rahulshetty);
    await password.fill(learning);
    await signIn.click();
    
  });

  Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect username/password.");
  
  });

