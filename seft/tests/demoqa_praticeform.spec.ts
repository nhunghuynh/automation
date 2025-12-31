import {test, expect} from 'playwright/test';

//Describe a set of test
test.describe('Practice form', () => {
    //Run this test before each test
    test.beforeEach(async({page}) => {
        await page.goto('https://demoqa.com/forms');
    });

    //Test 01: Practice form
    test('Test 01: Practice form', async ({page}) => {
        //Click Login button to navigate to Login page
        await page.getByRole('listitem').filter({hasText: 'Practice Form'}).click();

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
        // const hobbiesSports = page.locator('#hobbies-checkbox-1').last();
        // await hobbiesSports.check();
        
        //Upload Picture
        //const uploadPicture = page.locator('#uploadPicture');
        //await uploadPicture.setInputFiles('seft/tests/resources/testimage.png');

        //Enter Current Address
        const currentAddress = page.locator('#currentAddress');
        await currentAddress.fill('123 Test St, Test City, Test Country');

        // //Select State
        // const stateSelect = page.locator('#state');
        // await stateSelect.click();
        // const stateOption = page.getByText('NCR');
        // await stateOption.click();

        // //Select City
        // const citySelect = page.locator('#city');
        // await citySelect.click();
        // const cityOption = page.getByText('Delhi');
        // await cityOption.click();

        await page.pause();
        //Submit the form
        const submitButton = page.getByRole('button', {name: 'Submit'});
        await submitButton.click({force: true});
    });
});
