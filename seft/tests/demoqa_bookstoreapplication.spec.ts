import {test, expect} from 'playwright/test';

//Describe a set of test
test.describe('Practice elements on demoqa page - Book Store Application', () => {
    //Run this test before each test
    test.beforeEach(async({page}) => {
        await page.goto('https://demoqa.com/books');
    });

    //Test 01: Login to Book Store Application
    test('Test 02: Login to Book Store Application', async ({page}) => {
        //Click Login button to navigate to Login page
        await page.getByRole('listitem').filter({hasText: 'Login'}).click();

        //Enter username and password
        const userName = page.getByPlaceholder('UserName');
        await userName.fill('nhuynh');

        const password = page.getByPlaceholder('Password');
        await password.fill('Test1234!');

        //Click Login button
        await page.locator('#login').click();
        
        //Verify user is logged in successfully
        const userNameLabel = page.locator('#userName-value');
        await expect(userNameLabel).toHaveText('nhuynh');
    });

    //Test 02: Book Store Application - Search Book
    test('Test 02: Verify Search Book functionality', async ({page}) => {
        //Enter book name in search box
        const searchBox = page.getByPlaceholder('Type to search');
        await searchBox.fill('Designing Evolvable Web APIs with ASP.NET');

        const tableRows = page.locator('rt-tbody').locator('rt-tr-group');

        //Verify only one book is displayed in the table
        await expect(tableRows).toHaveCount(1);

        //Verify correct book is displayed
        const bookTitle = tableRows.locator('rt-td').nth(1);
        await expect(bookTitle).toHaveText('Designing Evolvable Web APIs with ASP.NET');
    });
});
