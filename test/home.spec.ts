import { test, expect } from '@playwright/test';

test.describe('Homepage & Cart Tests Suite', () => {
  test('should login, navigate home, and add a product to the cart with screenshots', async ({ page }) => {
    test.setTimeout(60000);

    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId("nav-sign-in").click();
    
    await page.getByTestId("email").fill('customer@practicesoftwaretesting.com');
    await page.getByTestId("password").fill('welcome01');
    await page.getByTestId("login-submit").click();
    await page.waitForURL('**/account', { timeout: 20000 });

    // Sélecteur robuste par Test ID
    await page.getByTestId('nav-home').click();
    
    const firstProduct = page.getByTestId('product-name').first();
    await expect(firstProduct).toBeVisible({ timeout: 20000 });
    await firstProduct.click();

    await page.waitForURL('**/product/**', { timeout: 20000 });

    const addToCartBtn = page.getByTestId("add-to-cart");
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    await addToCartBtn.click();

    const cartBadge = page.getByTestId("cart-quantity");
    await expect(cartBadge).toHaveText("1", { timeout: 20000 });
  });
});
