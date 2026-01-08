import {test, expect} from 'playwright/test';

//Describe a set of test
test.describe('Practice form', () => {
    //Run this test before each test
    test.beforeEach(async({page}) => {
        await page.goto('https://demoqa.com/forms');
    });

    //Test 01: Practice form
    test('Test 01: Practice form', async ({page}) => {
        //Click card to navigate to Practice Form page and wait for it to load
        await page.getByRole('listitem').filter({hasText: 'Practice Form'}).click();
        await expect(page).toHaveURL(/.*automation-practice-form/);
        await page.getByRole('heading', {name: 'Student Registration Form'}).waitFor();

        //Enter First Name, Last Name, Email
        const firstName = page.getByPlaceholder('First Name');
        await firstName.fill('Nhung');

        const lastName = page.getByPlaceholder('Last Name');
        await lastName.fill('Huynh');

        const email = page.locator('#userEmail');
        await email.fill('testtest@gmail.com');

        // Select Gender Female
        const genderFemale = page.locator('label', {hasText: 'Female'});
        await genderFemale.click();

        //Enter Mobile Number
        const mobileNumber = page.getByPlaceholder('Mobile Number');
        await mobileNumber.fill('0123456789');

        //Select date of birth
        const dateOfBirthInput = page.locator('#dateOfBirthInput');
        await dateOfBirthInput.click();

        //Select month
        const monthSelect = page.locator('.react-datepicker__month-select');
        await monthSelect.selectOption('4'); // May
        
        //Select year
        const yearSelect = page.locator('.react-datepicker__year-select');
        await yearSelect.selectOption('1990');

        //Select day
        const daySelect = page.locator('.react-datepicker__day--015');
        await daySelect.click();
        
        //Verify date of birth is selected correctly
        await expect(dateOfBirthInput).toHaveValue('15 May 1990');

        //Enter Subjects
        const subjectsInput = page.locator('#subjectsInput');
        await subjectsInput.fill('Maths');
        await subjectsInput.press('Enter');

        //Select Hobbies
        // Select Sports hobby checkbox using label text
        const hobbiesSports = page.locator('label', {hasText: 'Sports'});
        await hobbiesSports.click();
        
        //Upload Picture
        //const uploadPicture = page.locator('#uploadPicture');
        //await uploadPicture.setInputFiles('seft/tests/resources/testimage.png');

        //Enter Current Address
        const currentAddress = page.locator('#currentAddress');
        //await currentAddress.waitFor({state: 'visible', timeout: 10000});
        await currentAddress.fill('123 Test St, Test City, Test Country');
        // pause 5s after entering address for observation
       // await page.waitForTimeout(5000);
        
        //Select State
        const stateSelect = page.locator('#state');
        await stateSelect.click();
        const stateOption = page.getByText('NCR');
        await stateOption.click();

        //Select City
        const citySelect = page.locator('#city');
        await citySelect.click();
        const cityOption = page.getByText('Delhi');
        await cityOption.click();

        // await page.pause();
        // //Submit the form
        //const submitButton = page.getByRole('button', {name: 'Submit'});
        //await submitButton.waitFor({state: 'visible', timeout: 10000});
        // ensure the address was actually entered before submitting
       // await expect(currentAddress).toHaveValue('123 Test St, Test City, Test Country', { timeout: 5000 });
       // await submitButton.click();
    });
});
