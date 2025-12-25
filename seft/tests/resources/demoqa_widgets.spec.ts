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

    //Test03: Date Picker
    test('Test03: Date Picker', async ({page}) => {
        //Click Date Picker button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Date Picker'}).click();
        
        //Open the date picker
        const dateInput = page.locator('#datePickerMonthYearInput');
        await dateInput.click();

        //Select month June
        const monthSelect = page.locator('.react-datepicker__month-select')
        await monthSelect.selectOption('5'); // Select June (0-based index)

        //Select year 1983
        const yearSelect = page.locator('.react-datepicker__year-select');
        await yearSelect.selectOption('1983');

        //Select date 28
        const dateToSelect = page.locator('.react-datepicker__day--028');
        await dateToSelect.click();

        //Verify selected date
        const selectedDate = await dateInput.inputValue();
        expect (selectedDate).toBe('06/28/1983');

        //Open the date and time picker
        const dateAndTimeInput = page.locator('#dateAndTimePickerInput');
        await dateAndTimeInput.click();

        //Open month dropdown
        const monthDropdown = page.locator('.react-datepicker__month-read-view--down-arrow');
        await monthDropdown.click();

        //Select month Jan
        const monthSelect2 = page.locator('.react-datepicker__month-option').filter({hasText: 'January'})   ;
        await monthSelect2.click();

        //Open year dropdown
        const yearDropdown = page.locator('.react-datepicker__year-read-view--down-arrow');
        await yearDropdown.click();

        //Select year 2001
        const yearSelect2 = page.locator('.react-datepicker__year-option').filter({hasText: '2024'});
        await yearSelect2.click();

        //Select date 17
        const dateToSelect2 = page.locator('.react-datepicker__day--017');
        await dateToSelect2.click();
        
        //Select time 10:15 AM
        const timeList = page.locator('.react-datepicker__time-list .react-datepicker__time-list-item');
        const timeCount = await timeList.count();
        for (let k=0; k<timeCount; k++) {
            const timeOption = timeList.nth(k);
            const timeText = await timeOption.textContent();
            if (timeText === '10:15') {
                await timeOption.click();
                break;
            }
        }
        
        //Verify selected date and time
        const selectedDateTime = await dateAndTimeInput.inputValue();
        expect (selectedDateTime).toBe('January 17, 2024 10:15 AM');
    });

    //Test04: Slider
    test('Test04: Slider', async ({page}) => {
        //Click Slider button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Slider'}).click();
        
        //Locate the slider handle
        const slider = page.locator('input[type="range"]');

        //Move the slider to 70
        await slider.evaluate((el, value) => {
            const input = el as HTMLInputElement;
            input.value = String(value); 
            el.dispatchEvent(new Event('input'));
            el.dispatchEvent(new Event('change'));
        }, 70);

        //Verify the slider value is 70
        const sliderValue = await slider.inputValue();
        expect (sliderValue).toBe('70');

        // Veriry value in slider box
        const sliderBoxValue = await page.locator('#sliderValue').inputValue();
        expect (sliderBoxValue).toBe('70');
    });

    //Test05: Progress Bar
    test('Test05: Progress Bar', async ({page}) => {
        //Click Progress Bar button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Progress Bar'}).click();

        const startButton = page.getByRole('button', { name: 'Start' });
        const stopButton = page.getByRole('button', { name: 'Stop' });
        const progressBar = page.getByRole('progressbar');

        //Click Start button to start the progress bar
        await startButton.click();

        //Wait until progress bar reaches 70%
        let value = 0;
        while (value < 70) {
            await page.waitForTimeout(50); //wait for 50 milliseconds
            const currentValue = await progressBar.getAttribute('aria-valuenow');
            value = Number(currentValue);
        }
    
        //Click Stop button to stop the progress bar
        await stopButton.click();

        //Verify progress bar value is 70%
        const finalValue = await progressBar.getAttribute('aria-valuenow');
        expect (finalValue).toBe('70');

        //Click Start button again
        await startButton.click();

        //Wait until progress bar reaches 100%
        await expect(progressBar).toHaveAttribute('aria-valuenow', '100', {timeout: 15000});

        //Verify progress bar value is 100%
        const finalProgressValue = await progressBar.getAttribute('aria-valuenow');
        expect (finalProgressValue).toBe('100');
    });

    //Test 06: Tabs
    test('Test06: Tabs', async ({page}) => {
        //Click Tabs button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Tabs'}).click();
        
        //Click on 'What' tab
        const whatTab = page.getByRole('tab', {name: 'What'});
        await whatTab.click();

        //Verify 'What' tab content
        const whatContent = page.locator('#demo-tabpane-what p').first();
        await expect(whatContent).toContainText('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
        
        //Click on 'Origin' tab
        const originTab = page.getByRole('tab', {name: 'Origin'});
        await originTab.click();

        //Verify 'Origin' tab content
        const originContent = page.locator('#demo-tabpane-origin p').first();
        await expect(originContent).toContainText('Contrary to popular belief, Lorem Ipsum is not simply random text.');

        //Click on 'Use' tab
        const useTab = page.getByRole('tab', {name: 'Use'});
        await useTab.click();

        //Verify 'Use' tab content
        const useContent = page.locator('#demo-tabpane-use p').first();
        await expect(useContent).toContainText('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.');
        
        //Verify 'More' tab is disabled
        const moreTab = page.getByRole('tab', {name: 'More'});
        await expect(moreTab).toBeDisabled();
    });

    //Test07: Tool Tips
    test('Test07: Tool Tips', async ({page}) => {
        //Click Tool Tips button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Tool Tips'}).click();
        
        //Hover over the button to display tooltip
        const button = page.getByRole('button', {name: 'Hover me to see'});
        await button.hover();

        //Verify tooltip text for button
        const buttonTooltip = page.locator('.tooltip-inner');
        await expect(buttonTooltip).toHaveText('You hovered over the Button');

        //Verify tooltip text for text field
        const textField = page.locator('#toolTipTextField');
        await textField.hover();

        //Verify tooltip text for text field
        const textFieldTooltip = page.locator('.tooltip-inner').nth(1);
        await expect(textFieldTooltip).toHaveText('You hovered over the text field');

        //Hover over the link to display tooltip
        const contraryLink = page.getByRole('link', {name: 'Contrary'});
        await contraryLink.hover();

        //Verify tooltip text for link
        const linkTooltip = page.locator('.tooltip-inner').nth(1);
        await expect(linkTooltip).toHaveText('You hovered over the Contrary');

        //Hover over the link to display tooltip
        await page.getByRole('link', {name: '1.10.32'}).hover();
        
        //Verify tooltip text for link
        const linkTooltip2 = page.locator('.tooltip-inner').nth(1);
        await expect(linkTooltip2).toHaveText('You hovered over the 1.10.32');  
    });

    //Test08: Menu
    test('Test08: Menu', async ({page}) => {
        //Click Menu button on the left menu
        await page.getByRole('listitem').filter({hasText: /^Menu$/}).click();

        //Verify number of main menu items is 3
        const menuItems = page.locator('#nav li').filter({hasText: /Main Item/});
        await expect(menuItems).toHaveCount(3);

        //Verify Menu Item 1 has no submenu
        const menuItem1 = menuItems.nth(0);
        await menuItem1.hover();
        const subMenu1 = menuItem1.locator('ul li');
        await expect(subMenu1).toHaveCount(0);

        //Verify Main Menu Item 2 has 3 submenu items
        const menuItem2 = menuItems.nth(1);
        await menuItem2.hover();
        const subMenu2 = menuItem2.locator('ul>li').filter({hasNotText: /^Sub Sub Item/i});
        await expect(subMenu2).toHaveCount(3);

        //Verify Sub Menu Item 2.3 has 2 submenu items
        const subMenuItem23 = subMenu2.nth(2);
        await subMenuItem23.hover();
        const subSubMenuItems = subMenuItem23.locator('ul li');
        await expect(subSubMenuItems).toHaveCount(2);

        //Click on Sub Sub Item 2.3.1
        const subSubMenuItem231 = subSubMenuItems.nth(0);
        await subSubMenuItem231.click();
        
        //There is no visible change on the page after clicking the menu item
        //So just verify that the menu is no longer visible
        await expect(page.locator('#nav')).toBeHidden();
    });

    //Test09: Select Menu
    test('Test09: Select Menu', async ({page}) => {
        //Click Select Menu button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Select Menu'}).click();

        //-----------------
        // //Click Select Value dropdown
        // const selectValueDropdown = page.locator('#withOptGroup .css-1hwfws3');
        // await selectValueDropdown.click();

        // //Select 'Group 2, option 1' from the dropdown
        // const optionToSelect = page.locator('.css-26l3qy-menu', { hasText: 'Group 2, option 1' });
        // await optionToSelect.click();

        // //Verify selected value
        // const selectedValue = page.locator('#withOptGroup .css-1uccc91-singleValue');
        // await expect(selectedValue).toContainText('Group 2, option 1');

        // //-----------------
        // //Click Select Title dropdown
        // const selectTitleDropdown = page.locator('#selectOne .css-1wy0on6');
        // await selectTitleDropdown.click();

        // //print all value of dropdown options to console
        // const allOptions = page.locator('[class*="-option"]');
        // const allOptionsCount = await allOptions.count();
        // for (let i=0; i<allOptionsCount; i++) {
        //     const option = allOptions.nth(i);
        //     const optionText = await option.textContent();
        //     console.log('Option: ' + optionText);
        // }
        
        // //Select 'Mr.' from the dropdown
        // const titleOption = page.locator('[class*="-option"]', { hasText: 'Mr.' });
        // await titleOption.click();

        // //Click outside to close the dropdown
        // await page.locator('body').click();

        // //Verify selected title
        // const selectedTitle = page.locator('#selectOne .css-1uccc91-singleValue');
        // await expect (selectedTitle).toContainText('Mr.');
        
        // //-----------------
        // //Click Old Style Select Menu
        // const oldStyleSelect = page.locator('#oldSelectMenu');
        // await oldStyleSelect.selectOption('Purple');

        // //Verify selected color
        // const selectedColor = await oldStyleSelect.locator('option:checked').textContent();        expect (selectedColor).toBe('Purple');
        // expect (selectedColor).toBe('Purple');

        //-----------------
        //Click Multiselect drop down
        const multiSelectDropdown = page.locator('#css-yk16xz-control').filter({hasText: 'Select...'})  ;
        //await multiSelectDropdown.click();

        //Select Green and Red from the dropdown
        const itemToSelect = page.locator('[id^=".id="react-select-4-option-"]', { hasText: 'Green' });
        await itemToSelect.click();

        const itemToSelect2 = page.locator('[id^=".id="react-select-4-option-"]', { hasText: 'Red' });
        await itemToSelect2.click();
        
        //Verify selected colors
        const selectedColors = page.locator('#selectMenuContainer .css-12jo7m5 .css-1rhbuit-multiValue');
        const selectedColorsCount = await selectedColors.count();
        expect (selectedColorsCount).toBe(2);

        // //Verify selected colors are Blue and Red
        for (let i=0; i<selectedColorsCount; i++) {
            const selectedColor = selectedColors.nth(i);
            const selectedText = await selectedColor.textContent();
            expect (selectedText === 'Blue' || selectedText === 'Red').toBeTruthy();
        }

        //Select 'Volvo' and 'Opel' from the dropdown
        const multiSelectOptions = page.locator('.css-1n7v3ny-option');
        const optionCount = await multiSelectOptions.count();
        for (let i=0; i<optionCount; i++) {
            const option = multiSelectOptions.nth(i);
            const optionText = await option.textContent();
            if (optionText === 'Volvo' || optionText === 'Opel') {
                await option.click();
            }
        }

        //-----------------
        //Verify selected cars
        // const selectedCars = page.locator('#selectMenuContainer .css-12jo7m5 .css-1rhbuit-multiValue');
        // const selectedCarsCount = await selectedCars.count();
        // expect (selectedCarsCount).toBe(4);

        // //Verify selected cars are Volvo, Opel, Blue and Red
        // for (let j=0; j<selectedCarsCount; j++) {
        //     const selectedCar = selectedCars.nth(j);
        //     const selectedText = await selectedCar.textContent();
        //     expect (selectedText === 'Volvo' || selectedText === 'Opel' || selectedText === 'Blue' || selectedText === 'Red').toBeTruthy();
        // }
    });
});