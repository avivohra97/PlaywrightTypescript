const {test, expect} = require('@playwright/test');
const { title } = require('process');

// test needs to be imported from '@playwright/test' to use Playwright's test runner
// playrwright tests provide browser, send as parameter to the test function, a playwright fixture(as passed in curly bracket)
test(`First UI Basics Test`, async ({ browser }) => {

    //chrome plugins
    // create a new browser context, it won't share cookies/cache with other contexts
    const context = await browser.newContext();
    // below line opens a new page in the context
    const page = await context.newPage();
    // navigate to the page
    await page.goto('https://www.google.com');
    
});

test(`No need to create context and page and use only the fixture`, async ({ page }) => {
    await page.goto('https://www.google.com');
    /*
    if action performed inside then await used inside
    */
    expect(await page.title()).toBe('Google');
    
    await expect(page).toHaveTitle('Google');
    // expect(await page.title())('Google');
    // expect the title to be Google    
});

test(`css selector`, async ({ page }) => {
     const applicationURL = "https://rahulshettyacademy.com/loginpagePractise/";

    const expectedApplicationTitle = "LoginPage Practise | Rahul Shetty Academy";

    const txtBox_username = page.locator('#username');
    const txtBox_password = page.locator('#password');
    const btn_SignIn = page.locator('#signInBtn');
    const msg_error_incorrect_credentials = page.locator('[style*=block]');

    // Go to the application
    await page.goto(applicationURL);

    // Get the Title and Print
    console.log(await page.title());

    // Assert the Page Title
    await expect(page).toHaveTitle(expectedApplicationTitle);

    //Playwright will look for the element having CSS selector '#username' and once
    // it finds the element, then, it will fill 'rahulshetty'
    //await page.locator('#username').type('rahulshettyacademy');
    await txtBox_username.fill('rahulshetty');

    await txtBox_password.fill('learning');

    console.log('Click on Sign In button');
    await btn_SignIn.click();
    console.log('Extract the element text');
    //[style*=block] -> This is the CSS Selector of Error message (Incorrect username/password.)
    console.log(await msg_error_incorrect_credentials.textContent());

    console.log('Assertion for Error message(Incorrect username/password.)');
    await expect(msg_error_incorrect_credentials).toHaveText('Incorrect username/password.');
    await expect(msg_error_incorrect_credentials).toContainText('Incorrect');

   //fill() -> This method will first clear the textbox. Then, will fill the value in the textBox
    await txtBox_username.fill('rahulshettyacademy');

    await new Promise(resolve => setTimeout(resolve, 3000)); // 2 sec

    await btn_SignIn.click();

    await new Promise(resolve => setTimeout(resolve, 3000)); // 2 sec
});

test.only('SignIn GetTitleOfFirstProduct using first().textContent(), nth(0).textContent()', async ({page} )=> {

    const applicationURL = "https://rahulshettyacademy.com/loginpagePractise/";

    const txtBox_username = page.locator('#username');
    const txtBox_password = page.locator('#password');
    const btn_SignIn = page.locator('#signInBtn');
    const title_products = page.locator('.card-body a')

    const data_login_username = "rahulshettyacademy";
    const data_login_password = "learning";

    // Go to the application
    await page.goto(applicationURL);

    console.log('Filling '+data_login_username+' in Username textBox');
    //fill() -> This method will first clear the textbox. Then, will fill the value in the textBox
    await txtBox_username.fill(data_login_username);
    
    console.log('Filling '+data_login_password+' in Password textBox');
    await txtBox_password.fill(data_login_password);

    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 sec
    
    console.log('Click on Sign In button');
    await btn_SignIn.click();

    await new Promise(resolve => setTimeout(resolve, 3000)); // 2 sec

    //.card-body a -> This is a CSS Selector; Returning 4 elements
    //console.log(await page.locator('.card-body a').textContent()); // Strict mode violation
    console.log(await title_products.nth(0).textContent()); //This will look for the 1st element
    console.log(await title_products.first().textContent()); //This will look for the 1st element

    //allTextContents() 
        // -> This will get the title of all the elements and put into one array
        // -> Playwright does not auto-wait for this method
    console.log(await title_products.allTextContents());




});