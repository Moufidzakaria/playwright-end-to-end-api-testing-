import { test as setup, expect } from '@playwright/test';
// 1. Import users data from the JSON file safely
import users from '../users.json' 

setup.describe('Authentication Tests Suite - Data Driven', () => {

  // 2. Loop through each user in the JSON file
  users.forEach((user) => {

    setup(`should login successfully as ${user.name}`, async ({ page }) => {
      
      // Navigate directly to the login page with the tracking URL parameter you provided
      await page.goto('/auth/login?utm_source=chatgpt.com', { waitUntil: 'domcontentloaded' });

      // Fill in the Email field using JSON data
      await page.getByTestId('email').fill(user.email);

      // Fill in the Password field using JSON data
      await page.getByTestId('password').fill(user.password);

      // Click the Login/Submit button
      await page.getByTestId('login-submit').click();

      // ASSERTION 1: Verify the user is redirected to the account page
      await expect(page).toHaveURL(/\/account/i);
      
      // ASSERTION 2: Verify that the profile page header or dashboard element is visible
      const accountHeader = page.getByTestId('page-title');
      await expect(accountHeader).toBeVisible({ timeout: 15000 });
    });

  });

});