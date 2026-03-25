# 🎭 Playwright Automation Framework

A professional end-to-end (E2E) test automation framework built with **Playwright** and **TypeScript**, designed for scalability, maintainability, and CI/CD integration across Jenkins and GitHub Actions.

---

## 📂 Project Structure

* **.github/workflows**: CI pipeline for automated test execution using GitHub Actions.
* **configuration**: Centralized environment configuration and global settings management.
* **fixtures/test-fixture.ts**: Core Playwright test setup and dependency injection layer.
* **fixtures/data-fixture.ts**: Handles structured test data injection into test context.
* **fixtures/fake-data-provider.ts**: Generates dynamic mock data for testing scenarios.
* **page-objects**: Page Object Model (POM) layer encapsulating UI interactions.
* **tests**: Feature-based test specifications organized by domain (login, purchase, etc.).
* **utility**: Shared utilities such as logger, decorators, and helper functions.
* **playwright.config.ts**: Main Playwright configuration (browser, retries, reporters, etc.).
* **Jenkinsfile**: CI pipeline definition for Jenkins execution.
* **DockerFile**: Containerized environment for consistent test execution.

---

## 🏗 Architecture Overview

This framework follows a **layered test automation architecture**:

1. **Test Layer** → Defines test scenarios (spec files).
2. **Fixture Layer** → Handles setup, teardown, and dependency injection.
3. **Page Object Layer** → Encapsulates UI interactions and selectors.
4. **Utility Layer** → Shared logic (logging, decorators, helpers).
5. **Execution Layer** → Playwright test runner.

---

## ✨ Key Features

* **Page Object Model (POM)** for clean UI abstraction.
* **Custom Fixtures** for dependency injection and test isolation.
* **Data-driven Testing** with reusable test datasets.
* **Dynamic Mock Data Generation** via fake data providers.
* **Cross-browser Execution** (Chromium, Firefox, WebKit).
* **CI/CD Ready** with Jenkins + GitHub Actions.
* **Docker Support** for consistent execution environments.
* **Type-safe Test Design** using TypeScript strict mode.
* **Decorator-based Logging System** for better traceability.

---

## 🛠 Getting Started

### 1. Installation
```bash
npm install
npx playwright install

# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/login/tc02.spec.ts

# Open UI mode
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Generate HTML report
npx playwright show-report

BASE_URL=https://your-app-url.com
USER_NAME=your_username
PASSWORD=your_password

docker build -t playwright-framework .
docker run playwright-framework

 Roadmap
Introduce API service layer abstraction
Improve test data architecture (move to typed factories)
Enhance fixture responsibility separation
Add test tagging (smoke / regression / e2e)
Integrate reporting dashboard (Allure / custom reporter)
