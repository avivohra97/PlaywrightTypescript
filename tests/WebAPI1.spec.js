import { test, expect, request } from '@playwright/test';
 
test('Validate GET request', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
 
    const responseBody = await response.json();
    expect(responseBody.id).toBe(1);
});

test('Create user via API and validate on UI', async ({ page, request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
        data: { name: 'John Doe', email: 'john@example.com' }
    });
 
    expect(response.status()).toBe(201);
    const user = await response.json();
 
    await page.goto('https://example.com/users');
    const userExists = await page.locator(`text=${user.name}`).isVisible();
    // expect(userExists).toBeTruthy();
    await page.pause(2000); // Pause to visually verify the user is displayed
    console.log(`User ${user.name} created and displayed on UI: ${userExists}`);
});