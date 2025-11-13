import {test, expect} from '@playwright/test';

// TEST01: Practice using locators
test('TC01: Fliter product', async ({page}) => {
    //Open webpage
    await page.goto('https://commitquality.com/');

    //find 'Filter by product name' textbox by name then click
    await page.getByRole('textbox', { name: 'Filter by product name' }).click();

    //find 'Filter by product name' textbox by class and fill data
    await page.locator(".filter-textbox").fill('Product 1');

    //find 'Filter' button by data-testid and click
    await page.getByTestId('filter-button').click();

    //find 'Filter' button by text and click
    await page.locator('text=Filter').click();

    //find Reset button by data-testid and click
    await page.getByTestId('reset-filter-button').click();

    //find 'Reset' button by text and click
    await page.locator('text=Reset').click();

    await page.getByRole('textbox', { name: 'Filter by product name' }).click();

    await page.getByRole('textbox', { name: 'Filter by product name' }).fill('product 2');


    await page.getByTestId('filter-button').click();

    await page.getByTestId('product-row-11').getByTestId('name').click();



    await page.getByTestId('add-a-product-button').click();
    await page.getByTestId('product-textbox').click();
    await page.getByTestId('product-textbox').fill('Product3');
    await page.getByTestId('product-textbox').press('Tab');
    await page.getByTestId('product-textbox').fill('Product3');
    await page.getByTestId('price-textbox').fill('1000');
    await page.getByTestId('price-textbox').press('Tab');
    await page.getByTestId('price-textbox').fill('1000');
    await page.getByTestId('date-stocked').fill('2025-11-13');
    await page.getByTestId('submit-form').click();
    await page.getByTestId('date-stocked').fill('2025-11-12');
    await page.getByText('ProductsAdd ProductPracticeLearnLoginAdd ProductNamePriceDate StockedDate must').click();
    await page.getByTestId('submit-form').click();
    await page.getByTestId('product-row-12').getByTestId('dateStocked').click();

});
