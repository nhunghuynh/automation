import {test, expect} from '@playwright/test';

//Declare a group of test
test.describe('Practice with locator', () => {
    test.beforeEach(async ({page}) => {
        //Open Home URL
        await page.goto('https://datatables.net/');
    });

    //verify 
    test('TC01: Verify page title is correct', async ({page}) => {
        await expect(page).toHaveTitle(/DataTables | Javascript table library/);
    });

    test('TC02: ', async({page}) => {
       
    
    });
});
