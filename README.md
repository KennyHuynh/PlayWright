🎭 Playwright Automation Framework
A robust, scalable, and production-ready E2E testing framework built with Playwright and TypeScript.
🚀 Overview
This project is designed with a modern automation architecture, focusing on maintainability, data-driven testing, and seamless CI/CD integration. It leverages Playwright's powerful features to ensure reliable testing across multiple browsers.
🏗️ Project Structure
fixtures/: The core of the framework. Contains test-fixture.ts for environment setup and fake-data-provider.ts for dynamic, automated test data generation.
.github/workflows/ & Jenkinsfile: Ready-to-use CI/CD pipelines for automated test execution on every pull request or scheduled build.
configuration/: Centralized environment and global settings management, extending the .env capabilities.
DockerFile: Standardized execution environment to ensure "it works on my machine" consistency across local and server environments.
playwright.config.ts: Optimized configuration for parallel execution, retries, and multi-browser support (Chromium, Firefox, WebKit).
✨ Key Features
Smart Data Injection: Uses custom fixtures and providers to inject mock/fake data automatically into test cases.
Containerization: Fully Dockerized for easy scaling and cloud deployment.
Hybrid CI/CD Support: Dual support for GitHub Actions and Jenkins pipelines.
Type Safety: Built with TypeScript for better developer experience and early bug detection.
Environment Management: Securely handles sensitive data and environment-specific variables via .env.
🛠️ Getting Started
Prerequisites
Node.js (v18 or higher)
Docker (optional, for containerized runs)
Installation
bash
npm install
npx playwright install
Use code with caution.

Running Tests
Command	Description
npx playwright test	Run all tests in headless mode
npx playwright test --ui	Open Playwright UI Mode for debugging
npx playwright show-report	View the latest HTML test results
