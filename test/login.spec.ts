import { test, expect } from '@playwright/test';

test('E2E Scenario: Login, Search and Add Products to Cart', async ({ page }) => {
  // 1. Navigate to the homepage (Suppression du waitUntil instable)
  await page.goto('https://practicesoftwaretesting.com/');

  // 2. Go to Login Page
  await page.getByTestId('nav-sign-in').click();

  // 3. Perform Login
  await page.getByTestId('email').fill('admin@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();

  // 📸 Take a screenshot right after login success
  await page.screenshot({ path: 'screenshots/login-success.png', fullPage: true });

  // 4. Return Home and Add First Product
  await page.getByTestId('nav-home').click();
  await page.getByTestId('product-01KT4DK3Q67HSZWFVMR0FHTAJF').click();
  await page.getByTestId('add-to-cart').click();
  
  // Increase quantity twice
  await page.getByTestId('increase-quantity').click();
  await page.getByTestId('increase-quantity').click();
  await page.getByTestId('add-to-cart').click();

  // 💡 CORRECTION : Retourner sur la page d'accueil pour retrouver la barre de recherche
  await page.getByTestId('nav-home').click();

  // 5. Search for another product (Hammer)
  await page.getByTestId('search-query').fill('hammer');
  await page.getByTestId('search-submit').click();

  // 6. Select and Add the Searched Product
  await page.getByTestId('product-01KT4DK3QPH671JYVEG86YFVRS').click();
  await page.getByTestId('add-to-cart').click();

  // Final Assertion
  const cartBadge = page.getByTestId('cart-quantity');
  await expect(cartBadge).toBeVisible();

  // 📸 Take a final screenshot of the full E2E workflow completed
  await page.screenshot({ path: 'screenshots/cart-end-result.png', fullPage: true });
});