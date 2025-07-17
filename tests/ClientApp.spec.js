const {test,expect} = require('@playwright/test');

test(`client app login`, async ({ page }) => {  
    await page.goto(`https://rahulshettyacademy.com/client/#/auth/login`);
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator(`[value='Login']`).click();
    await page.waitForLoadState('networkidle');
    const title = await page.locator(`.card-body b`).allTextContents();
    console.log(title);
    const products = page.locator(`.card-body`);
    const count = await products.count();
    const productName = 'ZARA COAT 3';
    console.log(count);
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
    await page.locator(`[routerlink='/dashboard/cart']`).click();
    await page.waitForLoadState('networkidle');
    await page.locator(`h1:has-text('My Cart')`).waitFor();
    const item = await page.locator(`//h3[contains(text(),'${productName}')]`).isVisible();
    const checkout = await page.locator(`//button[text()='Checkout']`).click();
    await page.locator(`[placeholder='Select Country']`).pressSequentially('Ind', { delay: 900 });
    
    const dropdown = await page.locator(`.ta-results`).isVisible();
    // await dropdown.waitForLoadState();
    const options = page.locator(`.ta-item`);
    const optionsCount = await options.count();
    for (let i = 0; i < optionsCount; i++) {
        if (await options.nth(i).textContent() === 'India') {
            await options.nth(i).click();
            break;
        }
    }
    page.pause(2000);
});