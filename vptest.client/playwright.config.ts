import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './src/Tests', // meantime the path for tests files
    timeout: 30000,
    use: {
        baseURL: 'https://localhost:5173',
        headless: false,
        viewport: { width: 1280, height: 720 }, // Browser viewport size
    },
    projects: [
        {
          name: 'Chromium',
          use: { browserName: 'chromium' },
        },
        //{
        //  name: 'Firefox',
        //  use: { browserName: 'firefox' },
        //},
        //{
        //    name: 'WebKit',
        //    use: { browserName: 'webkit' },
        //},
    ],
});