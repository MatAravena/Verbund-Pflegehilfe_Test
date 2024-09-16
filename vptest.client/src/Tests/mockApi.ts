import { Page } from '@playwright/test';

export async function mockApi(page: Page) {

    await page.route('/api/tasks', async (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify([
                { id: 1, description: 'Mock Task 1', deadline: '2024-01-01', isDone: false },
                { id: 2, description: 'Mock Task 2', deadline: '2024-02-01', isDone: true },
                { id: 3, description: 'Mock Task 3', deadline: '2024-03-01', isDone: false },
                { id: 4, description: 'Mock Task 4', deadline: '2024-04-01', isDone: true },
                { id: 5, description: 'Mock Task 5', deadline: '2024-05-01', isDone: false },
            ]),
        });
    });


    await page.route('/api/task', async (route) => {

        switch (route.request().method()) {
            case 'POST':
                route.fulfill({
                    status: 201,
                    body: JSON.stringify({ id: 3, description: 'New Mock Task', deadline: '2024-03-01', isDone: false }),
                    headers: { 'Content-Type': 'application/json' }
                });
                break;
            case 'PUT' :
            case 'DELETE':
                route.fulfill({
                    status: 200,
                    body: JSON.stringify({ success: true }),
                    headers: { 'Content-Type': 'application/json' }
                });
                break;
            default:
        }
    });
}