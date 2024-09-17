import { test, expect } from '@playwright/test';
import { mockApi } from './mockApi';

test.describe('App main component', () => {

    test.beforeEach(async ({ page }) => {

        // Allow consoleLog messages in browser
        page.on('console', msg => {
            if (msg.type() === 'log') {
                console.log(`Browser console log: ${msg.text()}`);
            }
        });

        //mockApi
        await mockApi(page);
        await page.context().setDefaultNavigationTimeout(30000);
        //await page.context().newPage({ ignoreHTTPSErrors: true });
        await page.goto('https://localhost:5173/', { timeout: 600000 });
    });

    test('Simple ToDos title and list tasks', async ({ page }) => {
        const title = page.locator('text=List of ToDos');
        await expect(title).toBeVisible();

        const tasksListed = page.locator('text=No tasks available.');
        await expect(tasksListed).toBeHidden();
    });

    test('Task too short', async ({ page }) => {

        await page.fill('input[placeholder="Task description"]', 'ShorTask');

        await page.click('button:has-text("Add Task")');

        const errorText = await page.locator('p.Mui-error').textContent();
        expect(errorText).toBe('tasks must be longer than 10.');
    });

    test('should add a task successfully', async ({ page }) => {
        const tasksListed = page.locator('text=No tasks available.');
        await expect(tasksListed).toBeHidden();

        await page.fill('input[placeholder="Task description"]', 'This is a valid task description.');
        await page.click('button:has-text("Add Task")');

        //Input should be empty after
        const descriptionValue = await page.inputValue('input[placeholder="Task description"]');
        expect(descriptionValue).toBe('');

        //const task = page.locator('td=This is a valid task description.');
        // const newTask = await page.locator('.MuiTableRow-root').nth(5)// .toContainText('This is a valid task description.');
        const newTask = await page.locator('.MuiTableRow-root >> text=This is a valid task description.');
        // await page.pause();
        await expect(newTask).toBeVisible();
    });

    test('should delete a task successfully', async ({ page }) => {
        const tasksListed = page.locator('text=No tasks available.');
        await expect(tasksListed).toBeHidden();

        const expectedTaskCount = 7;
        const firstRowCount = await page.getByRole('row').count();
        expect(firstRowCount).toBe(expectedTaskCount)

        const deleteButton = page.locator('button[data-testid="deleteButton5"]');
        await expect(deleteButton).toBeVisible();
        await deleteButton.click();

        const finalCount = await page.getByRole('row').count();
        expect(finalCount).toBe(expectedTaskCount - 1)
    });
});
