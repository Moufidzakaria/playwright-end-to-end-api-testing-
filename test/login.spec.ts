import { test, expect } from '@playwright/test';

test('E2E Scenario: Login, Search and Add Products to Cart', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByTestId('nav-sign-in').click();

  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();
  await page.waitForURL('**/account', { timeout: 20000 });

  // Remplacement par une navigation directe à l'accueil
  await page.goto('/');

  const firstProduct = page.getByTestId('product-name').first();
  await expect(firstProduct).toBeVisible({ timeout: 20000 });
  await firstProduct.click();

  await page.waitForURL('**/product/**', { timeout: 20000 });

  const addToCartBtn = page.getByTestId('add-to-cart');
  await expect(addToCartBtn).toBeEnabled();
  await addToCartBtn.click();

  const increaseQtyBtn = page.getByRole('button', { name: 'Increase quantity' });
  await expect(increaseQtyBtn).toBeVisible();
  await increaseQtyBtn.click();
  await page.waitForTimeout(500);
  await increaseQtyBtn.click();
  await addToCartBtn.click();

  // Retour à l'accueil pour la recherche
  await page.goto('/');

  await page.getByTestId('search-query').fill('hammer');
  await page.getByTestId('search-submit').click();

  const hammerProduct = page.locator('.card').filter({ hasText: /hammer/i }).first();
  await expect(hammerProduct).toBeVisible({ timeout: 20000 });
  await hammerProduct.click();

  await page.waitForURL('**/product/**', { timeout: 20000 });
  await expect(addToCartBtn).toBeEnabled();
  await addToCartBtn.click();

  const cartBadge = page.getByTestId('cart-quantity');
  await expect(cartBadge).toBeVisible({ timeout: 20000 });
});
