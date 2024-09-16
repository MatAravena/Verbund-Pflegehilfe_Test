import { test, expect } from '@playwright/test';
import { mockApi } from './mockApi';

test.describe('App main component', () => {

    test.beforeEach(async ({ page }) => {

        //mockApi
        await mockApi(page);


        await page.context().setDefaultNavigationTimeout(30000); 

        //await page.context().newPage({ ignoreHTTPSErrors: true });
        //await page.goto('https://localhost:5173/', { timeout: 600000 });

        await page.goto('https://localhost:5173/', { timeout: 600000 });

    });

    test('Simple ToDos title and list tasks', async ({ page }) => {
        const title = page.locator('text=List of ToDos');
        await expect(title).toBeVisible();

    });

    test('Task too short', async ({ page }) => {

        await page.fill('input[placeholder="Task description"]', 'ShorTask');
        //await page.pause();

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
        await page.pause();
        expect(descriptionValue).toBe('');

        const task = page.locator('text=This is a valid task description.');
        expect(task).toBeVisible();
    });
});
