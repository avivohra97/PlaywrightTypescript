const {test,expect} = require('@playwright/test');

test('pop up hover and frames', async ({page} )=> {

    const applicationURL = "https://rahulshettyacademy.com/AutomationPractice/";

    const alertBtn = page.locator('#alertbtn');
    const confirmBtn = page.getByText('Confirm');
    
    await page.goto(applicationURL);

    
    await expect(alertBtn).toBeVisible();
    // const [popup] = await Promise.all([
    //     page.waitForEvent('popup'),
    //     alertBtn.click()
    // ]);
    page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
    });
    await alertBtn.click();
    await page.locator('#mousehover').hover();

    await waitForSomeTime(2);

    const framePage = page.frameLocator('#courses-iframe');
    await framePage.getByText('Core java for Automation Testers + Interview Programs').click();
    await waitForSomeTime(5);
    
});


async function clickOnElement(element,elementText) {
    console.log('Clicking on: '+elementText);
    await element.click();
}


async function waitForSomeTime(timeInSeconds) {
    console.log('Additional Wait for '+timeInSeconds+' seconds.');
    await new Promise(resolve => setTimeout(resolve, (timeInSeconds*1000)));
}