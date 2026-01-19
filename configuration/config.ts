// This ensures dotenv is configured before the config object is accessed
import { FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

interface Config {
    TEST_USERNAME: string;
    TEST_PASSWORD: string;
}

async function globalSetup(config: FullConfig) {
    // You can perform any global setup tasks here if needed
    const getConfig = (): Config => {
        const username = process.env.TEST_USERNAME;
        const password = process.env.TEST_PASSWORD;

        if (!username) {
            throw new Error('Missing required environment variable: TEST_USERNAME');
        }

        if (!password) {
            throw new Error('Missing required environment variable: TEST_PASSWORD');
        }

        // Return the validated config object
        return {
            TEST_USERNAME: username,
            TEST_PASSWORD: password,
        };
    };
    console.log('Global setup completed.');
}

export default globalSetup;