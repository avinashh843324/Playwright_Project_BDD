 const {test, expect} = require('@playwright/test');
 const {POManager} = require('../pageobjects/POManager');
 //JSON-> string-> js object
 const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for (const data of dataset){
 test(`Client App login for ${data.productName}`, async ({page})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
    
     
     const loginPage = poManager.getLoginPage(); // login page 
     await loginPage.goTo();
     await loginPage.validLogin(data.username,data.password);

     const dashboardPage = poManager.getDashboardPage(); //dashboard page
     await dashboardPage.searchProductAddCart(data.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage(); // cart page 
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage(); // get ordersreview page 
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage(); // order history page 
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();














  


    


    //Zara Coat 4





    









 });
}
 

 



 

