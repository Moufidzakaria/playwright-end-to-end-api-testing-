# Playwright QA Automation Testing Project

## Overview

This project demonstrates different testing approaches using **Playwright**:

* UI Login Testing
* Data-Driven Testing (JSON)
* API Testing (CRUD Operations)
* End-to-End (E2E) Testing
* Cross-Browser Testing (Chromium & Firefox)
* Screenshots, Videos, and Trace Collection

The project uses the public testing platform:

https://practicesoftwaretesting.com

---

# Tech Stack

* Playwright
* TypeScript / JavaScript
* JSON Test Data
* REST API Testing
* HTML Reporting

---

# Project Structure

```bash
project/
│
├── test/
│   ├── login.spec.ts
│   ├── api.spec.ts
│   ├── e2e.spec.ts
│
├── users.json
│
├── screenshots/
│
├── playwright.config.ts
│
├── package.json
│
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/your-username/playwright-qa-project.git
```

Navigate to project folder:

```bash
cd playwright-qa-project
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test test/login.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests using Chromium only:

```bash
npx playwright test --project=chromium
```

Run tests using Firefox only:

```bash
npx playwright test --project=firefox
```

---

# Data Driven Login Testing

User credentials are stored inside:

```bash
users.json
```

Example:

```json
[
  {
    "name": "Admin User",
    "email": "admin@practicesoftwaretesting.com",
    "password": "welcome01"
  }
]
```

The test dynamically executes a login scenario for every user contained in the JSON file.

---

# API Testing

Covered API operations:

### GET

Retrieve all products

```http
GET /products
```

### Authentication

Retrieve Admin Access Token

```http
POST /users/login
```

### PUT

Update existing product

```http
PUT /products/{id}
```

Validations include:

* Status Codes
* Response Body
* Product Data Verification

---

# End-to-End Testing Scenario

The E2E workflow performs:

1. Login
2. Navigate Home
3. Open Product Details
4. Add Product To Cart
5. Increase Quantity
6. Search Product
7. Add Another Product
8. Verify Cart Quantity

Artifacts generated:

* Screenshots
* Videos
* Traces

---

# Playwright Configuration

Configured Features:

* Headless Execution
* HTML Reports
* Automatic Screenshots on Failure
* Video Recording
* Trace Collection
* Action Timeout
* Navigation Timeout
* HTTPS Error Handling

Supported Browsers:

* Chromium
* Firefox

---

# Generate HTML Report

After execution:

```bash
npx playwright show-report
```

The report contains:

* Passed Tests
* Failed Tests
* Execution Time
* Screenshots
* Videos
* Traces



The configuration includes:

```ts
retries: process.env.CI ? 2 : 0
workers: process.env.CI ? 1 : undefined
```

# QA Skills Demonstrated

* Test Automation
* API Testing
* Data Driven Testing
* E2E Testing
* Cross Browser Testing
* UI Automation
* Assertions & Validation
* Reporting
* CI/CD Integration

---

# Author

Zakaria Moufid

QA Automation Engineer

Technologies:

* Playwright
* TypeScript
* JavaScript
* REST API Testing
* Git & GitHub

