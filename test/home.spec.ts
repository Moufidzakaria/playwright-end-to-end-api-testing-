import { test, expect } from '@playwright/test';

test.describe('Homepage & Cart Tests Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Il est préférable d'attendre le chargement complet (networkidle ou load) dans la CI de GitHub
    await page.goto('/', { waitUntil: 'load' });
  });

  test('should login, navigate home, and add a product to the cart with screenshots', async ({ page }) => {
    
    // -----------------------------------------------------------------
    // ÉTAPE 1 : Connexion (Login avec un compte client standard)
    // -----------------------------------------------------------------
    await page.getByTestId("nav-sign-in").click();
    
    await page.getByTestId("email").fill('customer@practicesoftwaretesting.com');
    await page.getByTestId("password").fill('welcome01');
    
    await page.screenshot({ path: 'screenshots/1-formulaire-rempli.png' });
    
    // Cliquer et attendre la navigation vers /account
    await Promise.all([
      page.waitForURL('**/account', { timeout: 15000 }),
      page.getByTestId("login-submit").click()
    ]);

    // OPTIONNEL : Si "nav-menu" n'existe pas pour le rôle customer, remplacez-le par un élément sûr :
    // Exemple : un sélecteur présent sur la page account (ex: page.getByTestId('change-password-submit') ou similaire)
    // Si 'nav-menu' est bien présent mais instable, on force l'attente de son état attaché :
    const navMenu = page.getByTestId("nav-menu");
    await expect(navMenu).toBeAttached({ timeout: 15000 });
    
    await page.screenshot({ path: 'screenshots/2-connexion-reussie.png' });

    // -----------------------------------------------------------------
    // ÉTAPE 2 : Retour à la page d'accueil
    // -----------------------------------------------------------------
    // Utiliser une URL relative pour éviter les problèmes d'environnement en CI
    await page.goto('/', { waitUntil: 'load' });
    
    const productCards = page.locator('.card');
    await expect(productCards.first()).toBeVisible({ timeout: 15000 });
    
    await page.screenshot({ path: 'screenshots/3-retour-accueil-produits.png' });

    // -----------------------------------------------------------------
    // ÉTAPE 3 : Sélection du produit
    // -----------------------------------------------------------------
    const firstProduct = productCards.first();
    await firstProduct.click();

    const addToCartBtn = page.getByTestId("add-to-cart");
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    
    await page.screenshot({ path: 'screenshots/4-page-details-produit.png' });

    // -----------------------------------------------------------------
    // ÉTAPE 4 : Ajout au panier et Vérification
    // -----------------------------------------------------------------
    await addToCartBtn.click();

    const cartBadge = page.getByTestId("cart-quantity");
    await expect(cartBadge).toHaveText("1", { timeout: 10000 });

    await page.screenshot({ path: 'screenshots/5-produit-ajoute-au-panier.png' });
  });

});