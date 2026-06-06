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

  // Clic et attente de la navigation
  await page.getByTestId('login-submit').click();
  await page.waitForURL('**/account', { timeout: 15000 });

  // Vérifier la connexion
  await expect(page).toHaveURL(/.*account/);

  await page.screenshot({
    path: 'login-success.png',
    fullPage: true
  });

  // Retour accueil
  await page.goto('https://practicesoftwaretesting.com/', {
    waitUntil: 'domcontentloaded'
  });

  // --- CORRECTION DU TIMEOUT ICI ---
  // On attend explicitement que le réseau soit calme pour que les produits (.card) soient chargés
  await page.waitForLoadState('networkidle');

  // On cible le premier produit
  const firstProduct = page.locator('.card').first();
  
  // On lui donne un timeout plus long (10s) pour s'afficher en CI si le serveur est lent
  await expect(firstProduct).toBeVisible({ timeout: 10000 });
  await firstProduct.click();

  // Ajouter au panier
  await page.getByTestId('add-to-cart').click();

  // Augmenter quantité
  await page.getByTestId('quantity-up').click();
  await page.getByTestId('quantity-up').click();
  await page.getByTestId('add-to-cart').click();

  // Retour accueil pour la recherche
  await page.goto('https://practicesoftwaretesting.com/', {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForLoadState('networkidle');

  // Recherche Hammer
  await page.getByTestId('search-query').fill('hammer');
  await page.getByTestId('search-submit').click();

  // Attendre que le produit recherché apparaisse spécifiquement
  const hammerProduct = page.locator('.card').filter({ hasText: /hammer/i }).first();
  await expect(hammerProduct).toBeVisible({ timeout: 10000 });
  await hammerProduct.click();

  // Ajouter Hammer
  await page.getByTestId('add-to-cart').click();

  // Vérifier le panier
  const cartBadge = page.getByTestId('cart-quantity');
  await expect(cartBadge).toBeVisible({ timeout: 10000 });

  await page.screenshot({
    path: 'cart-end-result.png',
    fullPage: true
  });
});