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

  // Clic et attente linéaire de l'URL
  await page.getByTestId('login-submit').click();
  await page.waitForURL('**/account');

  // Vérifier que la connexion est réussie
  await expect(page).toHaveURL(/.*account/);

  await page.screenshot({
    path: 'login-success.png',
    fullPage: true
  });

  // Retour accueil
  await page.goto('https://practicesoftwaretesting.com/');

  // Premier produit (on attend qu'il soit visible avant de cliquer)
  const firstProduct = page.locator('.card').first();
  await expect(firstProduct).toBeVisible();
  await firstProduct.click();

  // Ajouter au panier
  await page.getByTestId('add-to-cart').click();

  // Augmenter quantité
  await page.getByTestId('quantity-up').click();
  await page.getByTestId('quantity-up').click();
  await page.getByTestId('add-to-cart').click();

  // Retour accueil pour la recherche
  await page.goto('https://practicesoftwaretesting.com/');

  // Recherche Hammer
  await page.getByTestId('search-query').fill('hammer');
  await page.getByTestId('search-submit').click();

  // On attend un produit qui contient spécifiquement "Hammer" pour éviter l'ancien DOM
  const hammerProduct = page.locator('.card').filter({ hasText: /hammer/i }).first();
  await expect(hammerProduct).toBeVisible();
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