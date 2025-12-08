import {test, expect} from '@playwright/test';

//Describe a set of test
test.describe('Practice elemements on demoqa page - Alert, Frames, Windows', () => {
    //Run this test before each test
    test.beforeEach(async({page}) => {
        await page.goto('https://demoqa.com/alertsWindows');
    });

    //Test01: Browser Windows
    test('Test01: Browser Windows', async ({page}) => {
        //Click Browser Windows button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Browser Windows'}).click();

        //Start waiting for new page event before clicking the button
        const newTabPromise = page.waitForEvent('popup');
        
        //Click New Tab button
        await page.getByRole('button', {name: 'New Tab'}).click();

        //Get the new tab that opened
        const newTab = await newTabPromise;

        //Verify new tab is opened with expected URL
        await expect(newTab).toHaveURL(/.*demoqa.com\/sample.*/);

        //Close the new tab and switch back to original tab
        await newTab.close();

        //Start waiting for new page event before clicking the button
        const newWindowPromise = page.waitForEvent('popup');

        //Click New Window button
        await page.getByRole('button', {name: /^New Window$/}).click();
        
        //Get the new window that opened
        const newWindow = await newWindowPromise;
        
        //Verify new window is opened with expected URL
        await expect(newWindow).toHaveURL(/.*demoqa.com\/sample.*/);

        //Close the new window and switch back to original window
        await newWindow.close();

        //Start waiting for new page event before clicking the button
        const popupPromise = page.waitForEvent('popup');

        //Click New Window Message button
        await page.getByRole('button', {name: 'New Window Message'}).click();
        //Get the new page that opened
        const popup = await popupPromise;

        //Verify the new window message content
        const message = await popup.locator('body').textContent();
        expect(message).toContain('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.');

        //Close the new window message
        await popup.close();
    });

    //Test02: Alerts
    test('Test02: Alerts', async ({page}) => {
        //Click Alerts button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Alerts'}).click();

        page.once ('dialog', async dialog => {
            //Verify the alert message
            expect(dialog.message()).toBe('You clicked a button');
            //Accept the alert
            await dialog.accept();
        });
    
        //Click the button to trigger alert
        await page.locator('#alertButton').click();

        page.once ('dialog', async dialog => {
            //Verify the alert message
            expect (dialog.message()).toBe('This alert appeared after 5 seconds');
            //Dismiss the alert
            await dialog.dismiss();
        });
        
        //Click the button to trigger timed alert
        await page.waitForTimeout(1000);
        await page.locator('#timerAlertButton').click();

        //Click the button to trigger confirm alert
        page.once ('dialog', async dialog => {
            //Verify the confirm alert message
            expect (dialog.message()).toBe('Do you confirm action?');
            //Accept the confirm alert
            await dialog.accept();
        });
        await page.locator('#confirmButton').click();
        
        //Verify the result text after accepting the confirm alert
        const confirmResult = page.locator('#confirmResult');
        await expect (confirmResult).toHaveText('You selected Ok');

        //Click the button to trigger confirm alert again
        page.once ('dialog', async dialog => {
            //Verify the confirm alert message
            expect (dialog.message()).toBe('Do you confirm action?');
            //Dismiss the confirm alert
            await dialog.dismiss();
        });

        //Click the button to trigger confirm alert
        await page.locator('#confirmButton').click();

        //Verify the result text after dismissing the confirm alert
        await expect (confirmResult).toHaveText('You selected Cancel');
        
        //Click the button to trigger prompt alert
        page.once ('dialog', async dialog => {
            //Verify the prompt alert message
            expect (dialog.message()).toBe('Please enter your name');
            //Enter text into the prompt alert input
            await dialog.accept('Playwright User');
        });

        await page.locator('#promtButton').click();

        //Verify the result text after entering text into the prompt alert
        const promptResult = page.locator('#promptResult');
        await expect (promptResult).toHaveText('You entered Playwright User');
    });

    //Test03: Frames
    test('Test03: Frames', async ({page}) => {
        //Click Frames button on the left menu
        await page.getByRole('listitem').filter({hasText: /^Frames$/}).click();

        //Verify content in Frame1
        const frame1 = page.frameLocator('#frame1');
        const frame1Heading = frame1.locator('#sampleHeading');
        await expect(frame1Heading).toHaveText("This is a sample page");

        //Verify content in Frame2
        const frame2= page.frameLocator('#frame2');
        const frame2Heading = frame2.locator('#sampleHeading');
        await expect (frame2Heading).toHaveText("This is a sample page");
    });

    //Test04: Nested Frames
    test('Test04: Nested Frames', async({page}) => {
        //Click Nested Frames button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Nested Frames'}).click();

        //Verify content in parent frame and verify its body text
        const parentFrame = page.frameLocator('#frame1');
        const parentFrameBody = parentFrame.locator('body');
        await expect(parentFrameBody).toHaveText('Parent frame');
        
        //Switch to child frame within parent frame and verify its body text
        const childFrame = parentFrame.frameLocator('iframe');
        const childFrameBody = childFrame.locator('body');
        await expect(childFrameBody).toHaveText('Child Iframe');
    });

    //Test05: Modal Dialogs
    test('Test05: Modal Dialogs', async({page}) => {
        //Click Modal Dialogs button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Modal Dialogs'}).click();

        //Click Small Modal button
        await page.getByRole('button', {name: 'Small modal'}).click();
        
        //Verify small modal title and body text
        const smallModal = page.locator('#example-modal-sizes-title-sm');
        
        //Verify small modal title
        await expect(smallModal).toHaveText('Small Modal');

        const smallModalBody = page.locator('.modal-body');
        await expect(smallModalBody).toHaveText('This is a small modal. It has very less content');

        //Close small modal
        await page.getByRole('button', {name: 'Close'}).click();

        //Click Large Modal button
        await page.getByRole('button', {name: 'Large modal'}).click();

        //Verify large modal title and body text
        const largeModal = page.locator('#example-modal-sizes-title-lg');   

        //Verify large modal title
        await expect(largeModal).toHaveText('Large Modal');

        const largeModalBody = page.locator('.modal-body');
        await expect(largeModalBody).toContainText('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');

        //Close large modal
        await page.getByRole('button', {name: 'Close'}).nth(1).click();
    });
});