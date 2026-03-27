# The First Playwright Project

## Overview

This repository is a UI test automation project built with Playwright and TypeScript. It exercises user flows against the demo storefront at `https://demo.testarchitect.com/` and is structured around reusable page objects, custom Playwright fixtures, externalized test data, and lightweight schema validation.

The current codebase focuses on two main areas:

- login flow automation
- purchase flow automation

## Tech Stack

- Playwright Test
- TypeScript
- Zod
- Jsonnet
- dotenv

## Project Structure

```text
.
|-- configuration/   # Global Playwright setup and environment loading
|-- fixtures/        # Custom Playwright fixtures for pages, data, logging, and step helpers
|-- page-objects/    # Page Object Model classes for the application under test
|-- schemas/         # Zod schema definitions and Jsonnet data templates
|-- tests/           # Automated test specs and their test data files
|-- utility/         # Shared helpers such as logging, decorators, and data loading
|-- playwright.config.ts
|-- Jenkinsfile
`-- DockerFile
```

## How It Works

### Test execution

Tests run through Playwright Test with:

- HTML reporting
- JUnit XML output at `test-results/junit-report.xml`
- retry on CI
- trace collection on first retry
- browser coverage for Chromium, Firefox, and WebKit

### Page Object Model

The automation logic is encapsulated in page classes under `page-objects/`, including:

- `BasePage`
- `LoginPage`
- `ElectronicComponentsSupplierPage`
- `ItemPreviewPage`
- `CheckoutPage`

This keeps navigation, element access, and business actions out of the spec files.

### Custom fixtures

The project extends Playwright fixtures to provide:

- shared page object instances
- custom logging
- step wrappers for readable test reporting
- automatic screenshot capture on test failure
- per-test data loading based on test case ID

### Test data strategy

Test data is stored next to each test suite and loaded dynamically:

- `tests/login/data.json` for JSON-based data
- `tests/purchase/data.jsonnet` for Jsonnet-based data generation

For the purchase suite, the test fixture derives the case ID from the test title, finds the matching spec file, loads the corresponding data file, and injects the resolved object into the test.

### Schema validation

The purchase flow uses Zod schema validation from `schemas/user.schema.ts` before running the test. Jsonnet templates in `schemas/user.libsonnet` provide reusable base data for scenarios.

## Current Test Coverage

### `tc01`

Validates a purchase journey that:

- logs in
- navigates through the product catalog
- switches product view mode
- selects an item
- adds it to the cart
- proceeds to checkout
- fills billing details

### `tc02`

Covers a basic user login scenario.

## Environment Variables

The global setup expects these variables:

- `TEST_USERNAME`
- `TEST_PASSWORD`

An optional `.env` file is supported through `dotenv`.

## Available Commands

```bash
npm test
npm run test:report
```

## CI and Execution Options

The repository includes:

- `Jenkinsfile` for CI pipeline execution
- `DockerFile` for container-based test runs

The Jenkins pipeline supports running tests either in a WSL environment or inside Docker, and publishes Playwright HTML report artifacts after execution.

## Summary

This project is a Playwright-based UI automation framework that combines:

- cross-browser execution
- page-object-driven test design
- fixture-based dependency injection
- externalized test data
- optional schema validation
- CI-oriented reporting

It is set up as a maintainable foundation for expanding end-to-end test coverage around storefront login and checkout workflows.
