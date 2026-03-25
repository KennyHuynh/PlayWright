# Playwright Automation Framework

A professional E2E testing suite built with **Playwright** and **TypeScript**, featuring automated CI/CD and Docker integration.

## 🏗 Project Structure

- **.github/workflows/**: Automated test execution via GitHub Actions.
- **configuration/**: Centralized environment management and global settings.
- **fixtures/**:
    - `data-fixture.ts`: Manages test data injection.
    - `fake-data-provider.ts`: Generates dynamic mock data for tests.
    - `test-fixture.ts`: Custom Playwright test hooks and setup.
- **Jenkinsfile**: Pipeline configuration for Jenkins CI server.
- **DockerFile**: Containerization for consistent test environments.
- **playwright.config.ts**: Main configuration for browsers, retries, and reporters.

## 🚀 Key Features

* **Dynamic Data Generation**: Uses custom providers to create fresh test data for every run.
* **Hybrid CI/CD Support**: Built-in support for both GitHub Actions and Jenkins.
* **Environment Isolation**: Secure configuration using `.env` and TypeScript-based config mapping.
* **Cross-Browser Testing**: Pre-configured for Chromium, Firefox, and WebKit.
* **Docker Ready**: Easily run tests in isolated containers to avoid "it works on my machine" issues.

## 🛠 Getting Started

### 1. Installation
```bash
npm install
npx playwright install

### 2. Running Tests
Headless Mode:
```bash
npx playwright test
UI Mode (Debugging):
```bash
npx playwright test --ui
Show Report:
```bash
npx playwright show-report

