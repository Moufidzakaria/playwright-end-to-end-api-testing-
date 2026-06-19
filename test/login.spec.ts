import { test, expect } from '@playwright/test';

test('E2E Scenario: Login, Search and Add Products to Cart', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByTestId('nav-sign-in').click();

  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();
  
  await page.waitForURL('**/account', { timeout: 15000 });
  await expect(page).toHaveURL(/.*account/);

  // Retour accueil
  await page.goto('https://practicesoftwaretesting.com/');
  await page.waitForLoadState('networkidle');

  const firstProductLink = page.locator('a[href*="/product/"]').first();
  await firstProductLink.scrollIntoViewIfNeeded();
  await firstProductLink.click();

  await page.waitForURL('**/product/**', { timeout: 15000 });

  // Premier ajout
  const addToCartBtn = page.getByTestId('add-to-cart');
  await expect(addToCartBtn).toBeEnabled();
  await addToCartBtn.click();

  // Augmenter la quantité via l'accessibilité
  const increaseQtyBtn = page.getByRole('button', { name: 'Increase quantity' });
  await expect(increaseQtyBtn).toBeVisible();
  await increaseQtyBtn.click();
  await page.waitForTimeout(500); // Laisse le temps à l'UI SPA de traiter le changement de quantité
  await increaseQtyBtn.click();
  
  // Deuxième ajout
  await addToCartBtn.click();

  // Aller à l'accueil pour chercher le marteau
  await page.goto('https://practicesoftwaretesting.com/');
  await page.waitForLoadState('networkidle');

  await page.getByTestId('search-query').fill('hammer');
  await page.getByTestId('search-submit').click();

  const hammerProduct = page.locator('.card').filter({ hasText: /hammer/i }).first();
  await expect(hammerProduct).toBeVisible({ timeout: 15000 });
  await hammerProduct.click();

  await page.waitForURL('**/product/**', { timeout: 15000 });
  await expect(addToCartBtn).toBeEnabled();
  await addToCartBtn.click();

  // Vérification finale du badge
  const cartBadge = page.getByTestId('cart-quantity');
  await expect(cartBadge).toBeVisible({ timeout: 15000 });
});