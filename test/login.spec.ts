import { test, expect } from '@playwright/test';

test('E2E Scenario: Login, Search and Add Products to Cart', async ({ page }) => {
  // 1. Aller sur la page d'accueil
  await page.goto('https://practicesoftwaretesting.com/', { waitUntil: 'load' });

  // 2. Aller sur la page de connexion
  await page.getByTestId('nav-sign-in').click();

  // 3. Connexion avec le compte Customer
  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  
  // Attendre la redirection vers la page de compte après le clic
  await Promise.all([
    page.waitForURL('**/account', { timeout: 15000 }),
    page.getByTestId('login-submit').click()
  ]);

  // 📸 CORRECTION SCREENSHOT : On enregistre directement à la racine pour éviter l'erreur de dossier manquant en CI
  await page.screenshot({ path: 'login-success.png', fullPage: true });

  // 4. Retour à l'accueil pour ajouter le premier produit disponible
  await page.getByTestId('nav-home').click();
  
  const firstProduct = page.locator('.card').first();
  await expect(firstProduct).toBeVisible({ timeout: 15000 });
  await firstProduct.click();
  
  // Attendre et cliquer sur l'ajout au panier
  await page.getByTestId('add-to-cart').click();
  
  // Augmenter la quantité deux fois
  await page.getByTestId('quantity-up').click();
  await page.getByTestId('quantity-up').click();
  await page.getByTestId('add-to-cart').click();

  // 5. Retourner sur la page d'accueil pour retrouver la barre de recherche
  await page.getByTestId('nav-home').click();

  // 6. Recherche d'un autre produit (Hammer)
  await page.getByTestId('search-query').fill('hammer');
  await page.getByTestId('search-submit').click();

  // 💡 STABILISATION : Attendre que l'URL change ou que les résultats filtrent pour éviter de re-cliquer sur le premier produit de l'accueil
  await page.waitForTimeout(2000); 

  const firstHammerResult = page.locator('.card').first();
  await expect(firstHammerResult).toBeVisible({ timeout: 10000 });
  await firstHammerResult.click();
  
  // Ajouter le marteau au panier
  await page.getByTestId('add-to-cart').click();

  // Assertion finale : Vérifier que le badge du panier est visible
  const cartBadge = page.getByTestId('cart-quantity');
  await expect(cartBadge).toBeVisible({ timeout: 10000 });

  // 📸 CORRECTION SCREENSHOT : Enregistrement sécurisé à la racine
  await page.screenshot({ path: 'cart-end-result.png', fullPage: true });
});