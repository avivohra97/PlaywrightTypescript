# PlaywrightTypescript

To start 
`npm init playwright`
`npx playwright test`
npx playwright point to playwright in node  and test will run that

all tests are executed in sequence

making test.only will apply the filter
`npx playwright test /tests/handleChildWindow.spec.js --debug`
will start in debug mode

await page.screenshot({ path: 'screenshot.png' });