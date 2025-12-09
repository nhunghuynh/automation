import {test, expect} from '@playwright/test';

//Describe a set of test
test.describe('Practice elemements on demoqa page - Widgets', () => {
    //Run this test before each test
    test.beforeEach(async({page}) => {
        await page.goto('https://demoqa.com/widgets');
    });

    //Test01: Accordian
    test('Test01: Accordian', async ({page}) => {
        //Click Accordian button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Accordian'}).click();

        //Expand first section
        const section1 = await page.locator('#section1Heading')

        //Click to expand section 1
        await section1.click();

        //Verify section 1 is expanded and contains expected header
        await expect(section1).toContainText('What is Lorem Ipsum?');

        //Verify section1 content
        const section1Content = await page.locator('#section1Content p');
        await expect(section1Content).toContainText('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

        //Expand second section
        const section2 = await page.locator('#section2Heading');

        //Click to expand section 2
        await section2.click();

        //Verify section 2 is expanded and contains expected header
        await expect (section2).toContainText('Where does it come from?');

        //Verify section2 content
        const section2Content = await page.locator('#section2Content p').nth(0);
        await expect(section2Content).toContainText('Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.');

        //Expand third section
        const section3 = await page.locator('#section3Heading');

        //Click to expand section 3
        await section3.click();

        //Verify section 3 is expanded and contains expected header
        await expect (section3).toContainText('Why do we use it?');

        //Verify section3 content
        const section3Content = await page.locator('#section3Content p');
        await expect(section3Content).toHaveText(/It is a long established fact[\s\S]*injected humour and the like\)/);
    });

    //Test02: Auto Complete
    test('Test02: Auto Complete', async ({page}) => {
        //Click Auto Complete button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Auto Complete'}).click();

        //Type into Multiple Colors input box
        const multipleColorsInput = await page.locator('#autoCompleteMultipleInput');
        await multipleColorsInput.fill('r');

        //Select options in the dropdown
        const dropdownOptions = await page.getByRole('option');

        //Count of dropdown options
        const optionCount = await dropdownOptions.count();

        //Select options in the dropdown
        for (let i=0; i<optionCount; i++) {
            const option = dropdownOptions.nth(i);
            const optionText = await option.textContent();
            if (optionText === 'Red' || optionText === 'Green') {
                await option.click();
            }
        }

        //Verify selected options
        const selectedColors = await page.locator('.css-12jo7m5 .css-1rhbuit-multiValue');
        const selectedCount = await selectedColors.count();
        expect (selectedCount).toBe(2);
        
        //Verify selected colors are Red and Green
        for (let j=0; j<selectedCount; j++) {
            const selectedColor = selectedColors.nth(j);
            const selectedText = await selectedColor.textContent();
            expect (selectedText === 'Red' || selectedText === 'Green').toBeTruthy();
        }
    });
});