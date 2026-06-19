# Playwright QA Automation Testing Project

## Overview
This project demonstrates different testing approaches using **Playwright**:
* UI Login Testing
* Data-Driven Testing (JSON)
* API Testing (CRUD Operations)
* End-to-End (E2E) Testing
* Cross-Browser Testing (Chromium & Firefox)
* Screenshots, Videos, and Trace Collection

The project uses the public testing platform: [Practice Software Testing](https://practicesoftwaretesting.com)

---

## Tech Stack
* **Framework:** Playwright
* **Language:** TypeScript / JavaScript
* **Data Format:** JSON Test Data
* **API:** REST API Testing
* **CI/CD:** GitHub Actions & Azure DevOps Pipelines
* **Reporting:** HTML Reporting

---

## Project Structure
```text
project/
│
├── .github/workflows/
│   └── playwright.yml         # GitHub Actions Configuration
│
├── test/
│   ├── api.spec.ts            # API Tests (CRUD)
│   ├── auth.setup.ts          # Authentication Setup
│   ├── home.spec.ts           # Homepage & Cart Tests
│   └── login.spec.ts          # E2E & Login Tests
│
├── azure-pipelines.yml        # Azure DevOps Pipeline Configuration
├── users.json                 # Data-Driven Test Inputs
├── playwright.config.ts       # Playwright Configuration
├── package.json
└── README.md
Installation
Clone the repository:

Bash


git clone [https://github.com/Moufidzakaria/playwright-end-to-end-api-testing-.git](https://github.com/Moufidzakaria/playwright-end-to-end-api-testing-.git)
Navigate to project folder:

Bash


cd playwright-end-to-end-api-testing-
Install dependencies:

Bash


npm install
Install Playwright browsers:

Bash


npx playwright install
Running Tests Local
Run all tests:

Bash


npx playwright test
Run a specific test:

Bash


npx playwright test test/login.spec.ts
Run tests in headed mode:

Bash


npx playwright test --headed
Run tests using Chromium only:

Bash


npx playwright test --project=chromium
CI/CD Pipeline Integration
This project is fully automated and optimized for Continuous Integration (CI) platforms to prevent timeouts on shared environments by targeting stable virtualized runners.

1. GitHub Actions
The project includes a multi-browser workflow located in .github/workflows/playwright.yml that triggers automatically on every push or pull_request to the main branch.

2. Azure DevOps Pipelines
A dedicated azure-pipelines.yml file is configured for enterprise-grade automation. It runs seamlessly on an Azure-hosted Ubuntu agent.

Pipeline Key Features:

Node.js environment setup (v20).

Isolated dependency installation via npm ci.

Chromium Pre-fetching: Optimized to download only the Chromium binary to save build time and guarantee VM stability.

Resilient Redirects: Bypasses responsive layout breakpoints using direct root navigation (page.goto('/')).

Artifact Publishing: Automatically attaches the playwright-report to the Azure run dashboard whether the tests pass or fail (condition: always()).

Data Driven Login Testing
User credentials are stored inside users.json. The test dynamically executes a login scenario for every user profile contained in the file.

JSON


[
  {
    "name": "Admin User",
    "email": "admin@practicesoftwaretesting.com",
    "password": "welcome01"
  }
]
API Testing
Covered API operations and validations include status codes, response bodies, and schema data verifications:

GET - Retrieve all products (/products)

POST - Retrieve Admin Access Token (/users/login)

PUT - Update existing product (/products/{id})

End-to-End Testing Scenario
The E2E workflow simulates a complete real-world user journey:

Login with safe state injection.

Direct stable home routing (handling responsive UI).

Product details selection & validation.

Cart incrementation and item additions.

Dynamic keyword search (e.g., "hammer").

Persistent badge count verification.

Reporting & Artifacts
After execution, a rich HTML report is generated. On the CI platforms, these files are published as build artifacts.

View report locally:

Bash


npx playwright show-report
The generated reports natively bundle Screenshots on failure, Video captures, and full Trace ZIP logs for quick debugging.

Author
Zakaria Moufid QA Automation Engineer * Specialty: Playwright | TypeScript | CI/CD Integration (GitHub Actions & Azure DevOps)

