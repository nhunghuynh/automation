import {test, expect} from '@playwright/test';

//Describe a set of test
test.describe('Practice elemements on demoqa page', () => {
    //Run this test before each test
    test.beforeEach(async({page}) => {
        await page.goto('https://demoqa.com/elements');
    });

    //Test01: Text Box
    test('Test01: Text Box', async ({page}) => {
        //Click Text Box button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Text Box'}).click();

        //Enter Full Name
        await page.getByPlaceholder('Full Name').fill('Play Wright');

        //Enter Email
        await page.locator('id=userEmail').fill('test@test.com');

        //Enter Current Address
        await page.getByPlaceholder('Current Address').fill('My current address');

        //Enter Permanent Address
        await page.locator('id=permanentAddress').fill('My Permanent Address');

        //Click Submit button
        await page.getByRole('button', {name: 'Submit'}).click();
    });

    //Test02: Check Box
    test('Test02: Check Box', async ({page}) => {
        //Click Check Box item on the left navigation
        await page.getByRole('listitem').filter({hasText: 'Check Box'}).click();

        //Click Expand All button
        await page.getByRole('button', {name: 'Expand all'}).click();

        //Select Home checkbox
        await page.locator('label').filter({hasText: 'Home'}).check();

        //Verify that all checkboxes are selected
        const checkboxes = page.locator('#tree-node-home');
        const count = await checkboxes.count();
        for (let i = 0; i < count; i++) {
            await expect(checkboxes.nth(i)).toBeChecked();
        }

        //Deselect checkbox Home
        await page.locator('label').filter({hasText: 'Home'}).uncheck();

        //Verify that all checkboxes are deselected
        for (let i = 0; i < count; i++) {
            await expect(checkboxes.nth(i)).not.toBeChecked();
        }

        //Select Desktop and Documents checkboxes only
        await page.locator('label').filter({hasText: 'Desktop'}).check();
        await page.locator('label').filter({hasText: 'Documents'}).check();
        
        //Verify that Desktop and Documents checkboxes are selected
        const desktopcheckboxes = page.locator('#tree-node-desktop');
        const documentCheckboxes = page.locator('#tree-node-documents');
        const desktopCount = await desktopcheckboxes.count();
        const documentCount = await documentCheckboxes.count();
        for (let i = 0; i < desktopCount; i++) {
            await expect(desktopcheckboxes.nth(i)).toBeChecked();
        }
        for (let i = 0; i < documentCount; i++) {
            await expect(documentCheckboxes.nth(i)).toBeChecked();
        }

        //Verify that other checkboxes are not selected
        const downloadsCheckboxes = page.locator('#tree-node-downloads');
        const downloadsCount = await downloadsCheckboxes.count();   
    });

    //Test03: Radio Button
    test('Test03: Radio Button', async ({page}) => {
        //Click Radio Button item on the left navigation
        await page.getByRole('listitem').filter({hasText: 'Radio Button'}).click();

        //click Yes radio button
        //await page.locator('#yesRadio').click();
        await page.locator('label[for="yesRadio"]').click();

        //click Impressive radio button
        //await page.locator('#impressiveRadio').click();
        await page.getByText('Impressive').click();

        //click No radio button
        //await page.locator('id=noRadio').click();
    });

    //Test04: Web Tables
    test('Test04: Web Tables', async ({page}) => {
        //Click Radio Button item on the left navigation
        await page.getByRole('listitem').filter({hasText: 'Web Tables'}).click();

        //Click Add button
        await page.getByRole('button', {name: 'Add'}).click();

        //Enter First Name
        await page.getByPlaceholder('First Name').fill('John');

        //Enter Last Name
        await page.getByPlaceholder('Last Name').fill('Wick');
        
        //Enter Email
        await page.getByPlaceholder('name@example.com').fill('john.wick@example.com');

        //Enter Age
        await page.getByPlaceholder('Age').fill('45');

        //Enter Salary
        await page.getByPlaceholder('Salary').fill('100000');
        
        //Enter Department
        await page.getByPlaceholder('Department').fill('IT');   

        //Click Submit button
        await page.getByRole('button', {name: 'Submit'}).click();

        //Search the newly added user
        await page.getByPlaceholder('Type to search').fill('John');

        //Verify the user is added successfully
        const johnwickrows = page.getByRole('row', {name: /John Wick/});
        await expect(johnwickrows).toHaveCount(1);

        //Add another user with the same First Name but different other details
        await page.getByRole('button', {name: 'Add'}).click();
        await page.getByPlaceholder('First Name').fill('John');
        await page.getByPlaceholder('Last Name').fill('Cena');
        await page.getByPlaceholder('name@example.com').fill('john.cena@example.com');
        await page.getByPlaceholder('Age').fill('40');
        await page.getByPlaceholder('Salary').fill('120000');
        await page.getByPlaceholder('Department').fill('Wrestling');
        await page.getByRole('button', {name: 'Submit'}).click();   

        //Search user with First Name John
        await page.getByPlaceholder('Type to search').fill('John');

        
        const johncenarows = page.locator('div.rt-tr-group').filter({hasText: 'Cena'});

        //Click Edit button của dòng có John Cena trong search result
        await johncenarows.locator('[title="Edit"]').click();
        
        //Update Age to 41
        const ageInput = page.getByPlaceholder('Age');
        await ageInput.fill('41');

        //Click Submit button
        await page.getByRole('button', {name: 'Submit'}).click();  

        //Verify value in Age column is updated
        await expect(johncenarows.locator('div.rt-td').nth(2)).toHaveText('41');

        //Click Delete button of John Wick
        await johnwickrows.locator('[title="Delete"]').click();

        //Verify that John Wick is deleted and only John Cena remains
        await expect(johnwickrows).toBeHidden();
        await expect(johncenarows).toBeVisible();
    });

    //Test05: Buttons
    test('Test05: Buttons', async ({page}) => {
        //Click Buttons item on the left navigation
        await page.getByRole('listitem').filter({hasText: 'Buttons'}).click();

        //Click Add button
        await page.getByRole('button', {name: 'Double Click Me'}).dblclick();
        
        //Verify the message appears
        const doubleClickMessage = page.getByText('You have done a double click');
        await expect(doubleClickMessage).toBeVisible();

        //Click Right Click Me button
        await page.getByRole('button', {name: 'Right Click Me'}).click({button: 'right'});

        //Verify the message appears
        const rightClickMessage = page.getByText('You have done a right click');
        await expect(rightClickMessage).toBeVisible();

        //Click Click Me button
        //await page.getByRole('button', {name: "Click Me"}).click();
        await page.locator('button:text-is("Click Me")').click();

        //Verify the message appears
        const dynamicClickMessage = page.getByText('You have done a dynamic click');
        await expect(dynamicClickMessage).toBeVisible();
    });

    //Test06: Links
    test('Test06: Links', async ({page}) => {
        //Click Links item on the left navigation
        await page.locator('li:has(span:text-is("Links"))').click();

        //Click Home link
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.locator('a:text-is("Home")').click(),
        ]);

        //Verify new tab URL
        await expect(newPage).toHaveURL('https://demoqa.com/');

        //Close the new tab
        await newPage.close();

        //Go back to the original page
        await page.bringToFront();

        //Click Home39wWU
        await page.getByRole('link', {name: /^(?!Home$).*Home.*/}).click();
        
        //Verify new tab URL
        const [anotherPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('link', {name: /^(?!Home$).*Home.*/}).click()
        ]);
        await expect(anotherPage).toHaveURL('https://demoqa.com/');
        
        //Close the new tab
        await anotherPage.close();

        //Go back to the original page
        await page.bringToFront();

        //Click Created link
        await page.getByRole('link', {name: 'Created'}).click();

        //Verify the response message
        const responseMessage = page.getByText(/201.*Created/, { exact: false });
        await expect(responseMessage).toBeVisible();

        //Click No Content link
        await page.getByRole('link', {name: 'No Content'}).click();
        
        //Verify the response message
        const noContentMessage = page.getByText(/204.*No Content/, { exact: false });
        await expect(noContentMessage).toBeVisible();

        //Click Moved link
        await page.getByRole('link', {name: 'Moved'}).click();
        
        //Verify the response message
        const movedMessage = page.getByText(/301.*Moved Permanently/, { exact: false });
        await expect(movedMessage).toBeVisible();

        //Click Bad Request link
        await page.getByRole('link', {name: 'Bad Request'}).click();
        
        //Verify the response message
        const badRequestMessage = page.getByText(/400.*Bad Request/, { exact: false });
        await expect(badRequestMessage).toBeVisible();
        
        //Click Unauthorized link
        await page.getByRole('link', {name: 'Unauthorized'}).click();
        
        //Verify the response message
        const unauthorizedMessage = page.getByText(/401.*Unauthorized/, { exact: false });
        await expect(unauthorizedMessage).toBeVisible();

        //Click Forbidden link
        await page.getByRole('link', {name: 'Forbidden'}).click();
        
        //Verify the response message
        const forbiddenMessage = page.getByText(/403.*Forbidden/, { exact: false });
        await expect(forbiddenMessage).toBeVisible();

        //Click Not Found link
        await page.getByRole('link', {name: 'Not Found'}).click();
        
        //Verify the response message
        const notFoundMessage = page.getByText(/404.*Not Found/, { exact: false });
        await expect(notFoundMessage).toBeVisible();
    });

    //Test07: Broken Links - Images
    test('Test07: Broken Links - Images', async ({page}) => {
        //Click Broken Links - Images item on the left navigation
        await page.locator('li:has(span:text-is("Broken Links - Images"))').click();

        //Verify image is broken
        const brokenImage = page.locator('p:text("Broken image") + img');
        await expect(brokenImage).toBeVisible();
        const brokenImageNaturalWidth = await brokenImage.evaluate((img) => (img as HTMLImageElement).naturalWidth);
        expect(brokenImageNaturalWidth).toBe(0);
        
        //Verify image is not broken
        const validImage = page.locator('p:text("Valid image") + img');
        await expect(validImage).toBeVisible();
        const validImageNaturalWidth = await validImage.evaluate((img) => (img as HTMLImageElement).naturalWidth);
        expect(validImageNaturalWidth).toBeGreaterThan(0);

        //Click Valid Link
        await page.getByRole('link', {name: 'Click Here for Valid Link'}).click();

        //Verify URL is correct
        await expect(page).toHaveURL('https://demoqa.com/');
        
        //Go back to the original page
        await page.goBack();

        //Click Broken Link
        await page.getByRole('link', {name: 'Click Here for Broken Link'}).click();

        //Verify URL is correct
        await expect(page).toHaveURL('http://the-internet.herokuapp.com/status_codes/500');
    });

    //Test08: Upload and Download
    test('Test08: Upload and Download', async ({page, context}) => {
        
        //Click Upload and Download item on the left navigation
        await page.locator('li:has(span:text-is("Upload and Download"))').click();

        // Start waiting for download before clicking. Note no await
        const downloadPromise = page.waitForEvent('download');
        await page.locator('#downloadButton').click();
        const download = await downloadPromise;

        //Get the original download file path
        const originalFilePath = await download.path();

        //Set new download path
        const newFilePath = 'seft/tests/resources/' + download.suggestedFilename();

        //Save the downloaded file to the new path
        await download.saveAs(newFilePath);

        //Print the new download file path
        console.log('File downloaded at: ' + newFilePath);

        //Upload a file
        const fileToUpload = 'seft/tests/resources/sampleFile.jpeg';
        await page.locator('#uploadFile').setInputFiles(fileToUpload);
        
        //Verify the file is uploaded successfully
        const uploadedFilePath = await page.locator('#uploadedFilePath').textContent();
        expect(uploadedFilePath).toContain('sampleFile.jpeg');
    });

    //Test09: Dynammic Properties
    test('Test09: Dynamic Properties', async ({page}) => {
        //Click Dynamic Properties item on the left navigation
        await page.locator('li').filter({hasText: 'Dynamic Properties'}).click();

        //Verify original state: button is disabled, color of the button, button is hidden
        const enableafterButton = page.locator('#enableAfter');
        await expect(enableafterButton).toBeDisabled();

        const visibleAfterButton = page.locator('#visibleAfter');
        await expect(visibleAfterButton).toBeHidden();

        //Wait for 5 seconds and then verify the changes
        await page.waitForTimeout(6000); //Wait for 6 seconds to be sure

        //Verify button is enabled after 5 seconds
        await expect(enableafterButton).toBeEnabled();

        //Verify color of the button changes after 5 seconds});
        const colorChangeButton = page.locator('#colorChange');
        await expect(colorChangeButton).toHaveClass(/text-danger/);
    
        //Verify that the button appears after 5 seconds
        await expect(visibleAfterButton).toBeVisible();
    });
});