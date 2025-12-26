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
        const listItems = page.locator('#verticalListContainer').getByRole('listitem');

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
        const gridItem2 = gridItems.filter({hasText: 'Two'});
        const gridItem5 = gridItems.filter({hasText: 'Five'});

        await gridItem2.click();
        await gridItem5.click();

        //Verify that Item 2 and Item 5 are selected
        await expect(gridItem2).toHaveClass(/active/);
        await expect(gridItem5).toHaveClass(/active/);
    });

    //Test03: Resizable
    test('Test03: Resizable', async ({page}) => {
        //Click Resizable button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Resizable'}).click();

        //Resize the box by dragging the handle
        const resizeBox = page.locator('#resizableBoxWithRestriction');
        const handle = resizeBox.locator('.react-resizable-handle');

        const width = await resizeBox.evaluate(el => el.clientWidth);
        const height = await resizeBox.evaluate(el => el.clientHeight);
        console.log(width, height);

        await handle.click();
        await page.mouse.down()
        await page.mouse.move(width-100, height-100); // Move to new position
        await page.mouse.up();

        //Verify the new size of the box is smaller than the original size
        const width1 = await resizeBox.evaluate(el => el.clientWidth);
        const height1 = await resizeBox.evaluate(el => el.clientHeight);

        console.log(width1, height1);

        expect(width1).toBeLessThan(width);
        expect(height1).toBeLessThan(height);
    });

    //Test04: Droppable
    test('Test04: Droppable', async ({page}) => {
        //Click Droppable button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Droppable'}).click();
        
        //Drag the draggable box and drop it into the droppable box
        const draggable = page.locator('#draggable');
        const droppable = page.locator('#droppable');
        await draggable.dragTo(droppable);
        
        //Verify that the droppable box text has changed to "Dropped!"
        await expect(droppable).toHaveText('Dropped!');
    });
});