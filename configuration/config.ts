// This ensures dotenv is configured before the config object is accessed
import * as dotenv from 'dotenv';
dotenv.config();

interface Config {
  TEST_USERNAME: string;
  TEST_PASSWORD: string;
}

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

export const config = getConfig();