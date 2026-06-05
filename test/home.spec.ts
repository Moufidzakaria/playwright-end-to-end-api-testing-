import { test, expect } from '@playwright/test';

test.describe('Homepage & Cart Tests Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('should login, navigate home, and add a product to the cart with screenshots', async ({ page }) => {
    
    // -----------------------------------------------------------------
    // ÉTAPPE 1 : Connexion (Login)
    // -----------------------------------------------------------------
    await page.getByTestId("nav-sign-in").click();
    
    await page.getByTestId("email").fill('admin@practicesoftwaretesting.com');
    await page.getByTestId("password").fill('welcome01');
    
    // Capture d'écran juste avant de cliquer sur Connexion (Formulaire rempli)
    await page.screenshot({ path: 'screenshots/1-formulaire-rempli.png' });
    
    await page.getByTestId("login-submit").click();

    // =============== MODIFICATION ICI ===============
    // On attend que l'URL change vers l'espace connecté ou que le réseau soit calme
    await page.waitForURL('**/account**', { waitUntil: 'networkidle', timeout: 15000 });
    // =================================================

    // Attendre que la connexion soit validée par le menu utilisateur
    await expect(page.getByTestId("nav-menu")).toBeVisible({ timeout: 15000 });
    
    // Capture d'écran confirmant que l'utilisateur est connecté
    await page.screenshot({ path: 'screenshots/2-connexion-reussie.png' });

    // -----------------------------------------------------------------
    // ÉTAPE 2 : Retour à la page d'accueil
    // -----------------------------------------------------------------
    await page.goto('/');
    
    const productCards = page.locator('.card');
    await expect(productCards.first()).toBeVisible({ timeout: 15000 });
    
    // Capture d'écran de la liste des produits après reconnexion
    await page.screenshot({ path: 'screenshots/3-retour-accueil-produits.png' });

    // -----------------------------------------------------------------
    // ÉTAPE 3 : Sélection du produit
    // -----------------------------------------------------------------
    const firstProduct = productCards.first();
    await firstProduct.click();

    // Attendre que le bouton d'ajout au panier soit visible sur la page de détails
    const addToCartBtn = page.getByTestId("add-to-cart");
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    
    // Capture d'écran de la page de détails du produit avant l'achat
    await page.screenshot({ path: 'screenshots/4-page-details-produit.png' });

    // -----------------------------------------------------------------
    // ÉTAPE 4 : Ajout au panier et Vérification
    // -----------------------------------------------------------------
    await addToCartBtn.click();

    // Vérifier que le badge passe à 1
    const cartBadge = page.getByTestId("cart-quantity");
    await expect(cartBadge).toHaveText("1");

    // Capture d'écran finale montrant le produit ajouté et le badge "1" dans le panier
    await page.screenshot({ path: 'screenshots/5-produit-ajoute-au-panier.png' });
  });

});