import { Page } from '@playwright/test';

export async function mockApi(page: Page) {

    await page.route('**/api/task', async (route) => {
        switch (route.request().method()) {
            case 'GET':
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
                break;
            case 'POST':
                route.fulfill({
                    status: 201,
                    body: JSON.stringify({ id: 3, description: 'New Mock Task', deadline: '2024-03-01', isDone: false }),
                    headers: { 'Content-Type': 'application/json' }
                });
                break;
            //case 'DELETE':
            case 'PUT':
                route.fulfill({
                    status: 200,
                    body: JSON.stringify({ success: true }),
                    headers: { 'Content-Type': 'application/json' }
                });
                break;
            default:
        }
    });

    await page.route('**/api/task?id=*', async (route) => {
        if (route.request().method() === 'DELETE') {
            // Extract the ID from the URL
            const url = new URL(route.request().url());
            const id = url.searchParams.get('id');

            // Mock success response
            if (id) {
                route.fulfill({
                    status: 200,
                    body: JSON.stringify({ success: true }),
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }
    });
}