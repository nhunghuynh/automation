import {test, expect, Locator} from '@playwright/test';
import { log } from 'console';

// TEST01: Practice using locators
test('TC01: Filter product', async ({page}) => {
    //Open webpage
    await page.goto('https://commitquality.com/');

    //1. find 'Filter by product name' textbox then click

    //by name
    await page.getByRole('textbox', { name: 'Filter by product name' }).click();
    
    //by placeholder
    await page.getByPlaceholder('Filter by product name').click();

    //by css
    await page.locator('input[placeholder="Filter by product name"]').click();

    await page.locator('input.filter-textbox').click();

    //by xpath
    await page.locator('//input[@placeholder="Filter by product name"]').click();

    await page.locator('//input[contains(@class, "filter-textbox")]').click();

    //2. Find 'Filter by product name' textbox by class and fill data
    await page.getByRole('textbox', { name: 'Filter by product name' }).fill('Product 1');

    //3. Find 'Filter' button and click

    //by data-testid 
    await page.getByTestId('filter-button').click();

    //by class with multiple elements
    await page.locator('button.filter-button').first().click();
    
    //by css
    await page.locator('text=Filter').click();

    //by xpath
    await page.locator('//button[text()="Filter"]').click();

    //4. Find Reset button by data-testid and click
    await page.getByTestId('reset-filter-button').click();

    //5. find 'filter by product name' textbox by name and fill data
    await page.getByRole('textbox', { name: 'Filter by product name' }).click();

    //6. Find 'filter by product name' textbox by placeholder and fill data
    await page.locator('input[placeholder="Filter by product name"]').fill('Product 2');

    //7. Find 'Filter' button by data-testid and click
    await page.getByTestId('filter-button').click();

    //8. Find product name 'Product 2' and click
    
    //by data-testid
    await page.getByTestId('product-row-11').getByTestId('name').click();

    //get number of product by css
    const product: Locator = page.locator('tr[data-testid^="product-row-"]')
    const numberOfProducts = await product.count();
    console.log(`Number of products displayed: ${numberOfProducts}`);

    //by css - click the first product
    await product.first().locator('td[data-testid^="name"]').click();
    const productName = await product.first().locator('td[data-testid^="name"]').textContent();
    console.log(`First product name: ${productName}`);

    //by xpath - click the last product
    await page.locator('(//tr[starts-with(@data-testid, "product-row-")])[last()]//td[starts-with(@data-testid, "name")]').click();
    const lastProductName = await page.locator('(//tr[starts-with(@data-testid, "product-row-")])[last()]//td[starts-with(@data-testid, "name")]').textContent();
    console.log(`Last product name: ${lastProductName}`);

    //by css - click 3rd product   
    await product.nth(2).locator('td[data-testid^="name"]').click();
    const thirdProductName = await product.nth(2).locator('td[data-testid^="name"]').textContent();
    console.log(`Third product name: ${thirdProductName}`);

    //9. Find Reset button by data-testid and click
    await page.getByTestId('reset-filter-button').click();

    //by xpath - click the 5th product
    await product.nth(4).locator('td[data-testid^="name"]').click();
    const fourthProductName = await product.nth(4).locator('td[data-testid^="name"]').textContent();
    console.log(`Fourth product name: ${fourthProductName}`);

    //by css - click 8th product
    await product.nth(7).locator('td[data-testid^="name"]').click();
    const seventhProductName = await product.nth(7).locator('td[data-testid^="name"]').textContent();
    console.log(`Seventh product name: ${seventhProductName}`);
});

// TEST02: Vefify user can create product successfuffly
test('TC02: Create a product', async ({page}) => {
    await page.goto("https://commitquality.com/");

    //Click Add a Product buttton
    await page.getByTestId('add-a-product-button').click();

    //Enter product name
    await page.getByTestId('product-textbox').fill("New Product 1");

    //Enter price
    await page.getByPlaceholder("Enter a price").fill("100");

    //Enter date stocked
    await page.getByTestId("date-stocked").fill("2025-11-23");

    //Click Submit button
    await page.locator(".btn.btn-primary").click();
});