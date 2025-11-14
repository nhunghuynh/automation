import {test, expect} from '@playwright/test';

// TEST01: Practice using locators
test('TC01: Filter product', async ({page}) => {
    //Open webpage
    await page.goto('https://commitquality.com/');

    //Find 'Filter by product name' textbox by name then click
    await page.getByRole('textbox', { name: 'Filter by product name' }).click();

    //Find 'Filter by product name' textbox by class and fill data
    await page.locator(".filter-textbox").fill('Product 1');

    //Find 'Filter' button by data-testid and click
    await page.getByTestId('filter-button').click();

    //Find 'Filter' button by text and click
    await page.locator('text=Filter').click();

    //Find Reset button by data-testid and click
    await page.getByTestId('reset-filter-button').click();

    //Find 'Reset' button by text and click
    await page.locator('text=Reset').click();

    //find 'filter by product name' textbox by name and fill data
    await page.getByRole('textbox', { name: 'Filter by product name' }).click();

    //Find 'filter by product name' textbox by placeholder and fill data
    await page.locator('input[placeholder="filter by product name"]').fill('Product 2');

    //Find 'Filter' button by data-testid and click
    await page.getByTestId('filter-button').click();

    //Find product name 'Product 2' by data-testid and click
    await page.getByTestId('product-row-11').getByTestId('name').click();
});

//TEST02: Add a product - practice using locators
test('TC02: Add a product', async ({page}) => {
    //Open webpage
    await page.goto('https://commitquality.com/');

    //Find 'Add a product' button by data-testid and click
    await page.getByTestId('add-a-product-button').click();

    //Find 'Add a product' button by text and click
    // await page.locator('text=Add a Product').click();
    
    //Find 'Product name' textbox by data-testid and click
    await page.getByTestId('product-textbox').click();

    //Find 'Product name' textbox by placeholder and click
    await page.getByPlaceholder('Enter a product name').click();

    //Fill 'Product name' textbox
    await page.getByTestId('product-textbox').fill('Product3');

    //Press tab to move to next field
    await page.getByTestId('product-textbox').press('Tab');

    //Find 'Price' textbox by data-testid and fill data
    await page.getByTestId('price-textbox').fill('1000');

    //Press tab to move to next field
    await page.getByTestId('price-textbox').press('Tab');

    //Find 'Price' textbox by data-testid and fill data
    await page.getByTestId('price-textbox').fill('1000');

    //Find 'Date Stocked' textbox by data-testid and fill data
    await page.getByTestId('date-stocked').fill('2025-11-13');

    //Find 'Submit' button by data-testid and click
    await page.getByTestId('submit-form').click();

    //Find the newly added product by data-testid and click
    await page.getByTestId('date-stocked').fill('2025-11-12');

    //Find 'Add a product' button by data-testid and click
    await page.getByText('ProductsAdd ProductPracticeLearnLoginAdd ProductNamePriceDate StockedDate must').click();
    
    //Find Submit button by data-testid and click
    await page.getByTestId('submit-form').click();
    
    //Find the newly added product by data-testid and click
    await page.getByTestId('product-row-12').getByTestId('dateStocked').click();

});
