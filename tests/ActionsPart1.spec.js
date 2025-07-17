import { test, expect } from '@playwright/test';
test(`action app login`, async ({ page }) => {
    await page.goto(`https://rahulshettyacademy.com/angularpractice/`);
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByPlaceholder("Password").fill("Rajat");
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").check();
    // await page.locator("[name='bday']").keyboard.presssequentially("01091997", { delay: 1000 });
    await page.getByRole("button", { name: "Submit" }).click();
    await page.screenshot({ path: 'screenshot.png' });
});
