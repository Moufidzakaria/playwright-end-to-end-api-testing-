import { test, expect } from '@playwright/test';

test.describe('Homepage & Cart Tests Suite', () => {

  test('should login, navigate home, and add a product to the cart with screenshots', async ({ page }) => {
    // Augmenter le timeout global du test pour les environnements plus lents
    test.setTimeout(60000);

    // 1. Accéder au site et se connecter
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId("nav-sign-in").click();
    
    await page.getByTestId("email").fill('customer@practicesoftwaretesting.com');
    await page.getByTestId("password").fill('welcome01');
    await page.getByTestId("login-submit").click();

    // Attendre la confirmation de redirection sur le compte
    await page.waitForURL('**/account', { timeout: 20000 });

    // 2. Retourner à l'accueil via la barre de navigation pour préserver la session
    await page.getByRole('link', { name: 'Home' }).click();
    await page.waitForLoadState('networkidle');
    
    // Sélectionner le premier produit de manière fiable
    const firstProductLink = page.locator('a[href*="/product/"]').first();
    
    // S'assurer qu'il est visible et cliquer dessus
    await expect(firstProductLink).toBeVisible({ timeout: 15000 });
    await firstProductLink.click();

    // Attendre d'être sur la page du produit
    await page.waitForURL('**/product/**', { timeout: 20000 });

    // 3. Ajouter au panier
    const addToCartBtn = page.getByTestId("add-to-cart");
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    await addToCartBtn.click();

    // 4. Vérifier que la quantité dans le panier est passée à 1
    const cartBadge = page.getByTestId("cart-quantity");
    await expect(cartBadge).toHaveText("1", { timeout: 15000 });
  });

});