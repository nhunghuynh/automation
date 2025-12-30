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
        
        //Simple tab
        //Drag the draggable box and drop it into the droppable box
        const draggable = page.locator('#draggable');
        const droppable = page.locator('.simple-drop-container #droppable');
        await draggable.dragTo(droppable);
        
        //Verify that the droppable box text has changed to "Dropped!"
        await expect(droppable).toHaveText('Dropped!');

        //Accept tab
        //Switch to Accept tab
        await page.getByRole('tab', {name: 'Accept'}).click();
        
        const notAcceptable = page.locator('#notAcceptable');
        const droppableAccept = page.locator('.accept-drop-container #droppable');

        //Drag the not acceptable box and drop it into the droppable box
        await notAcceptable.dragTo(droppableAccept);
        //Verify that the droppable box text remains "Drop here!"
        await expect(droppableAccept).toHaveText('Drop here');

        //Reset the droppable boxes
        await page.reload();
        //Switch to Accept tab
        await page.getByRole('tab', {name: 'Accept'}).click();

        const acceptable = page.locator('.accept-drop-container #acceptable');
        //Drag the acceptable box and drop it into the droppable box
        await acceptable.dragTo(droppableAccept);
        //Verify that the droppable box text has changed to "Dropped!"
        await expect(droppableAccept).toHaveText('Dropped!');

        //Prevent Propogation tab
        //Switch to Prevent Propogation tab
        await page.getByRole('tab', {name: 'Prevent Propogation'}).click();
        
        const dragBox = page.locator('#dragBox');
        const outerDroppable = page.locator('#notGreedyDropBox');
        const innerDroppable = page.locator('#notGreedyDropBox #notGreedyInnerDropBox');

        //Drag the drag box and drop it into the inner droppable box
        await dragBox.dragTo(innerDroppable);
        //Verify that both droppable boxes text have changed to "Dropped!"
        await expect(innerDroppable).toHaveText('Dropped!');
        await expect(outerDroppable).toHaveText('Dropped!Dropped!');
        
        //Reset the droppable boxes
        await page.reload();
        //Switch to Prevent Propogation tab
        await page.getByRole('tab', {name: 'Prevent Propogation'}).click();

        const outerDroppable2 = page.locator('#notGreedyDropBox p').nth(0);

        //Drag the drag box and drop it into the outer droppable box
        await dragBox.dragTo(outerDroppable2);
        //Verify that only the outer droppable box text has changed to "Dropped!"
        await expect(outerDroppable).toHaveText('Dropped!Inner droppable (not greedy)');
        await expect(innerDroppable).toHaveText('Inner droppable (not greedy)');

        //Switch to Revert Draggable tab
        await page.getByRole('tab', {name: 'Revert Draggable'}).click();

        const willRevert = page.locator('#revertable');
        const willNotRevert = page.locator('#notRevertable');
        const droppableRevert = page.locator('.revertable-drop-container #droppable');
        
        //Drag the will revert box and drop it into the droppable box
        const box1Box = await willRevert.boundingBox();
        await willRevert.dragTo(droppableRevert);
        //Verify that the will revert box has returned to its original position
        const box1BoxAfter =  await willRevert.boundingBox();
        expect(box1BoxAfter?.x).toBeCloseTo(box1Box?.x || 0, 1);
        expect(box1BoxAfter?.y).toBeCloseTo(box1Box?.y || 0, 1);

        //Drag the will not revert box and drop it into the droppable box
        const box2Box = await willNotRevert.boundingBox();
        await willNotRevert.dragTo(droppableRevert);
        //Verify that the will not revert box has not returned to its original position
        const box2BoxAfter =  await willNotRevert.boundingBox();
        expect(box2BoxAfter?.x).not.toBeCloseTo(box2Box?.x || 0, 1);
        expect(box2BoxAfter?.y).not.toBeCloseTo(box2Box?.y || 0, 1);
    });

    //Test05: Dragabble
    test('Test05: Draggable', async ({page}) => {
        //Click Draggable button on the left menu
        await page.getByRole('listitem').filter({hasText: 'Draggable'}).click();
        
        const dragBox = page.locator('#dragBox');
        const boxBefore = await dragBox.boundingBox();
        
        //Drag the box by an offset of (100, 100)
        await dragBox.click();
        await page.mouse.down();
        await page.mouse.move(boxBefore!.x + 100, boxBefore!.y + 100);
        await page.mouse.up();

        const boxAfter = await dragBox.boundingBox();

        //Verify that the box has moved by the offset
        expect(boxAfter!.x).toBeCloseTo(boxBefore!.x + 100, 1);
        expect(boxAfter!.y).toBeCloseTo(boxBefore!.y + 100, 1);


        //Axis Restricted tab        
        //Switch to Axis Restricted tab
        await page.getByRole('tab', {name: 'Axis Restricted'}).click();
        const horzBox = page.locator('#restrictedX');
        const vertBox = page.locator('#restrictedY');

        const horzBoxBefore = await horzBox.boundingBox();
        const vertBoxBefore = await vertBox.boundingBox();

        //Drag the horizontal box by an offset of (100, 100)
        await horzBox.click();
        await page.mouse.down();
        await page.mouse.move(horzBoxBefore!.x + 100, horzBoxBefore!.y + 100);
        await page.mouse.up();
        
        const horzBoxAfter = await horzBox.boundingBox();       
        //Verify that the horizontal box has moved only in the X direction
        expect(horzBoxAfter!.x).toBeCloseTo(horzBoxBefore!.x + 100, 1);
        expect(horzBoxAfter!.y).toBeCloseTo(horzBoxBefore!.y, 1);

        //Drag the vertical box by an offset of (100, 100)
        await vertBox.click();
        await page.mouse.down();
        await page.mouse.move(vertBoxBefore!.x + 100, vertBoxBefore!.y + 100);
        await page.mouse.up();

        const vertBoxAfter = await vertBox.boundingBox();       
        //Verify that the vertical box has moved only in the Y direction
        expect(vertBoxAfter!.x).toBeCloseTo(vertBoxBefore!.x, 1);
        expect(vertBoxAfter!.y).toBeCloseTo(vertBoxBefore!.y + 100, 1);

        //Container Restricted tab        
        //Switch to Container Restricted tab
        await page.getByRole('tab', {name: 'Container Restricted'}).click();
        const contBox = page.locator('#containmentWrapper #containmentBox');
        const contBoxBefore = await contBox.boundingBox();

        //Drag the box by an offset of (500, 500)
        await contBox.click();
        await page.mouse.down();
        await page.mouse.move(contBoxBefore!.x + 500, contBoxBefore!.y + 500);
        await page.mouse.up();

        const contBoxAfter = await contBox.boundingBox();       
        //Verify that the box has not moved outside the container
        expect(contBoxAfter!.x).toBeLessThanOrEqual(contBoxBefore!.x + 400); // Container width is 400
        expect(contBoxAfter!.y).toBeLessThanOrEqual(contBoxBefore!.y + 400); // Container height is 400

        //Verify that the box is still within the container boundaries
        expect(contBoxAfter!.x).toBeGreaterThanOrEqual(contBoxBefore!.x);
        expect(contBoxAfter!.y).toBeGreaterThanOrEqual(contBoxBefore!.y);
        
        //Scroll Restricted tab        
        //Switch to Scroll Restricted tab
        await page.getByRole('tab', {name: 'Scroll Restricted'}).click();
        const scrollBox = page.locator('#scrollRestrictedBox');
        const scrollBoxBefore = await scrollBox.boundingBox();

        //Drag the box by an offset of (100, 100)
        await scrollBox.click();
        await page.mouse.down();
        await page.mouse.move(scrollBoxBefore!.x + 100, scrollBoxBefore!.y + 100);
        await page.mouse.up();

        const scrollBoxAfter = await scrollBox.boundingBox();       
        //Verify that the box has moved by the offset within the scrollable area
        expect(scrollBoxAfter!.x).toBeCloseTo(scrollBoxBefore!.x + 100, 1);
        expect(scrollBoxAfter!.y).toBeCloseTo(scrollBoxBefore!.y + 100, 1);
    });
});