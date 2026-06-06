import { test, expect } from '@playwright/test';

test('E2E Scenario: Login, Search and Add Products to Cart', async ({ page }) => {

  // Aller sur le site
  await page.goto('https://practicesoftwaretesting.com/', {
    waitUntil: 'domcontentloaded'
  });

  // Page Login
  await page.getByTestId('nav-sign-in').click();

  // Connexion
  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');

  // SOLUTION : Remplacement du Promise.all par un enchaînement linéaire propre
  await page.getByTestId('login-submit').click();
  
  // On attend explicitement que l'URL change vers le compte avec un timeout étendu pour la CI
  await page.waitForURL('**/account', { timeout: 15000 });

  // Vérifier que la connexion est réussie
  await expect(page).toHaveURL(/.*account/);

  await page.screenshot({
    path: 'login-success.png',
    fullPage: true
  });

  // Retour accueil
  await page.goto('https://practicesoftwaretesting.com/');

  // Premier produit
  const firstProduct = page.locator('.card').first();
  await expect(firstProduct).toBeVisible();
  await firstProduct.click();

  // Ajouter au panier
  await page.getByTestId('add-to-cart').click();

  // Augmenter quantité
  await page.getByTestId('quantity-up').click();
  await page.getByTestId('quantity-up').click();
  await page.getByTestId('add-to-cart').click();

  // Retour accueil
  await page.goto('https://practicesoftwaretesting.com/');

  // Recherche Hammer
  await page.getByTestId('search-query').fill('hammer');
  await page.getByTestId('search-submit').click();

  // SOLUTION : Éviter networkidle et cibler directement le produit attendu
  const hammerProduct = page.locator('.card').filter({ hasText: /hammer/i }).first();
  await expect(hammerProduct).toBeVisible({ timeout: 10000 });
  await hammerProduct.click();

  // Ajouter Hammer
  await page.getByTestId('add-to-cart').click();

  // Vérifier le panier
  const cartBadge = page.getByTestId('cart-quantity');
  await expect(cartBadge).toBeVisible();

  await page.screenshot({
    path: 'cart-end-result.png',
    fullPage: true
  });
});