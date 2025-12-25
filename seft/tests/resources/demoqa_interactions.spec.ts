import {test, expect} from '@playwright/test';

//Describe a set of test
test.describe('Practice elemements on demoqa page - Interactions', () => {
    //Run this test before each test
    test.beforeEach(async({page}) => {
        await page.goto('https://demoqa.com/interaction');
    });

    //Test01: Sortable
    test('Test01: Sortable', async ({page}) => {
        //Click Sortable button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Sortable'}).click();

        //Drag and drop Item 1 to the position of Item 4
        const listItems = page.locator('#demo-tabpane-list .list-group-item');

        const item1 = listItems.filter({hasText: 'One'});
        const item4 = listItems.filter({hasText: 'Four'});
        await item1.dragTo(item4);

        //Verify the new order of items
        const expectedOrder = ['Two', 'Three', 'Four', 'One', 'Five', 'Six'];
        for (let i = 0; i < expectedOrder.length; i++) {
            const itemText = await page.locator('#demo-tabpane-list .list-group-item').nth(i).textContent();
            expect(itemText).toBe(expectedOrder[i]);
        }

        //Click Grid tab
        await page.getByRole('tab', {name: 'Grid'}).click();

        const gridItems = page.locator('#demo-tabpane-grid .list-group-item');

        //Drag and drop Item 1 to the position of Item 6 in Grid
        const gridItem1 = gridItems.filter({hasText: 'One'});
        const gridItem6 = gridItems.filter({hasText: 'Six'});
        await gridItem1.dragTo(gridItem6);

        //Verify the new order of grid items
        const expectedGridOrder = ['Two', 'Three', 'Four', 'Five', 'Six', 'One', 'Seven', 'Eight', 'Nine'];
        for (let i = 0; i < expectedGridOrder.length; i++) {
            const itemText = await page.locator('#demo-tabpane-grid .list-group-item').nth(i).textContent();
            expect(itemText).toBe(expectedGridOrder[i]);
        }
    });

    //Test02: Selectable
    test('Test02: Selectable', async ({page}) => {
        //Click Selectable button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Selectable'}).click();

        //Select Item 1 and Item 3 from the list
        const listItems = page.locator('#demo-tabpane-list .list-group-item');

        const item1 = listItems.filter({hasText: 'Cras justo odio'});
        const item3 = listItems.filter({hasText: 'Morbi leo risus'});

        await item1.click();
        await item3.click();

        //Verify that Item 1 and Item 3 are selected
        await expect(item1).toHaveClass(/active/);
        await expect(item3).toHaveClass(/active/);
        
        //Click Grid tab
        await page.getByRole('tab', {name: 'Grid'}).click();    

        const gridItems = page.locator('#demo-tabpane-grid .list-group-item');

        //Select Item 2 and Item 5 from the grid
        const gridItem2 = gridItems.filter({hasText: 'Dapibus ac facilisis in'});
        const gridItem5 = gridItems.filter({hasText: 'Vestibulum at eros'});

        await gridItem2.click();
        await gridItem5.click();

        //Verify that Item 2 and Item 5 are selected
        await expect(gridItem2).toHaveClass(/active/);
        await expect(gridItem5).toHaveClass(/active/);
    });
});