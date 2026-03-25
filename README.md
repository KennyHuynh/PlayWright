# Playwright Automation Framework

A professional end-to-end (E2E) test automation framework built with **Playwright** and **TypeScript**, designed for scalability, maintainability, and CI/CD integration across Jenkins and GitHub Actions.

---

## Project Structure

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
* **package.json**: Dependency and script management.
* **tsconfig.json**: TypeScript compiler configuration.

---

## Architecture Overview

This framework follows a **layered test automation architecture**:

* **Test Layer** → Defines test scenarios (spec files)
* **Fixture Layer** → Handles setup, teardown, and dependency injection
* **Page Object Layer** → Encapsulates UI interactions and selectors
* **Utility Layer** → Shared logic (logging, decorators, helpers)
* **Execution Layer** → Playwright test runner

---

## Key Features

* **Page Object Model (POM)** for clean UI abstraction
* **Custom Fixtures** for dependency injection and test isolation
* **Data-driven testing support** with reusable test datasets
* **Dynamic mock data generation** via fake data providers
* **Cross-browser execution** (Chromium, Firefox, WebKit)
* **CI/CD ready** with Jenkins + GitHub Actions
* **Docker support** for consistent execution environments
* **Type-safe test design** using TypeScript strict mode
* **Decorator-based logging system** for better traceability

---

## Getting Started

### 1. Installation

```bash
npm install
npx playwright install

### 2. Running Tests
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

### 3. Environment Setup
BASE_URL=https://your-app-url.com
USER_NAME=your_username
PASSWORD=your_password

### 4. CI/CD Integration
GitHub Actions
Automated test execution defined in:
.github/workflows/playwright.yml
Jenkins

Pipeline configuration located in:

Jenkinsfile
upports:

Parallel test execution
Test reporting
Artifact collection
Docker Support

Run tests inside a containerized environment:

docker build -t playwright-framework .
docker run playwright-framework
Roadmap
Introduce API service layer abstraction
Improve test data architecture (move to typed factories)
Enhance fixture responsibility separation
Add test tagging (smoke / regression / e2e)
Integrate reporting dashboard (Allure / custom reporter)
Author

Maintained by: Loc Huynh
