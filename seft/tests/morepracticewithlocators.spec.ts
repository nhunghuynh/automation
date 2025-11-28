import {test, expect} from "@playwright/test";
 
//Describe a set of test
test.describe('More practice with locators', () => {
    //Run this before each test case
    test.beforeEach(async ({page}) => {
        await page.goto("https://commitquality.com/practice");
    });

    //Test 01: More practice with locators - General components
    test("TC01: More practice with locators-General components", async ({page}) => {
        //Click General Component panel
        await page.getByTestId("practice-general").click();
        
        //Click Click me button
        await page.getByTestId("basic-click").click();

        //Double click 'Double click me' button
        await page.getByTestId("double-click").dblclick();

        //Right click 'Right click me' button
        await page.getByTestId("right-click").click({button: 'right'});

        //Select option 1 of radio button
        await page.getByTestId("option1").first().click();

        //Select Option 2 of radio button
        await page.getByTestId("option2").first().click();

        //Select Option 2 in dropdown
        await page.locator('.dropdowns select').selectOption('option2'); 

        //Select Checkbox 3
        await page.getByRole("checkbox", {name: "checkbox3"});

        //Click the 1st link 'My Youtube'
        await page.locator(".links-container a").first().click();

        //Back to Practice page
        await page.goBack();
        
        //Click the 2nd link 'Open my youtube in a new tab'
        await page.locator(".links-container a").nth(1).click();

        //Back lại Practice tab
        await page.bringToFront();

        //Click the last link 'Go to practice' page
        await page.locator(".links-container a").last().click();
    });

    test("TC02: More practice with locators-iFrame", async ({page}) => {
        //Click 'Iframes' panel
        await page.getByTestId("practice-iframe").click();

        //const allframes = page.frames();
        const iframeCount = await page.locator('iframe').count();
        console.log("Số iframe=", iframeCount);

        //get the iframe
        const frame = page.frameLocator('iframe[data-testid="iframe"]');

        //Enter product name to search textbox
        await frame.getByRole("textbox", {name: 'Filter by product name'}).fill("Product 2")

        //Click Filter button
        await frame.getByRole("button", {name: 'Filter'}).click();
    });
});