const { test, expect } = require("@playwright/test");

test("Popup validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //to handle java/js popups
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = framesPage.locator(".text h2").textContent();
    //  console.log(textCheck.split(" ")[1]) not working
})
test.only("Screenshot & visual comparision", async ({ page }) => {
    await page.goto("https:google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png')
})
