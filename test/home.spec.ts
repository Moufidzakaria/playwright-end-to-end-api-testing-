import { test, expect } from '@playwright/test';

test.describe('Homepage & Cart Tests Suite', () => {

  test('should login, navigate home, and add a product to the cart with screenshots', async ({ page }) => {
    test.setTimeout(60000);

    await page.goto('https://practicesoftwaretesting.com/', { waitUntil: 'load' });
    await page.getByTestId("nav-sign-in").click();
    
    await page.getByTestId("email").fill('customer@practicesoftwaretesting.com');
    await page.getByTestId("password").fill('welcome01');
    await page.getByTestId("login-submit").click();

    // Attendre la redirection
    await page.waitForURL('**/account', { timeout: 20000 });

    // Retour à l'accueil
    await page.goto('https://practicesoftwaretesting.com/', { waitUntil: 'load' });
    
    const productCards = page.locator('.card');
    await productCards.first().waitFor({ state: 'visible', timeout: 20000 });
    await productCards.first().click();

    // Attendre le bouton ajouter au panier
    const addToCartBtn = page.getByTestId("add-to-cart");
    await addToCartBtn.waitFor({ state: 'visible', timeout: 20000 });
    await addToCartBtn.click();

    // Vérifier le badge
    const cartBadge = page.getByTestId("cart-quantity");
    await expect(cartBadge).toHaveText("1", { timeout: 20000 });
  });

});