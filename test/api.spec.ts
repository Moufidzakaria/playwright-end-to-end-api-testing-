import { test, expect } from '@playwright/test';

test.describe('API CRUD Testing Suite', () => {
  // Définition propre de l'URL de l'API
  const apiUrl = 'https://api.practicesoftwaretesting.com';
  
  let authToken = '';
  let createdProductId = '';
  let activeCategoryId = '';
  let activeBrandId = ''; // Ajout indispensable de la marque pour éviter le 422

  // 1. configuration initiale : récupération dynamique des IDs et du Token
  test.beforeAll(async ({ request }) => {
    // A. Connexion pour récupérer le Token Admin
    const loginResponse = await request.post(`${apiUrl}/users/login`, {
      data: {
        email: 'admin@practicesoftwaretesting.com',
        password: 'welcome01'
      }
    });
    const loginData = await loginResponse.json();
    authToken = loginData.access_token;

    // B. Récupération d'une catégorie réelle et valide
    const categoriesResponse = await request.get(`${apiUrl}/categories`);
    const categories = await categoriesResponse.json();
    const categoryList = categories.data || categories;
    if (categoryList && categoryList.length > 0) {
      activeCategoryId = categoryList[0].id;
    }

    // C. Récupération d'une marque (Brand) réelle et valide (OBLIGATOIRE pour l'API)
    const brandsResponse = await request.get(`${apiUrl}/brands`);
    const brands = await brandsResponse.json();
    const brandsList = brands.data || brands;
    if (brandsList && brandsList.length > 0) {
      activeBrandId = brandsList[0].id;
    }
  });

  // 2. GET TEST: Récupérer tous les produits
  test("Get api response and validate products body", async ({ request }) => {
    const response = await request.get(`${apiUrl}/products`);
    expect(response.status()).toBe(200);
    
    const productsData = await response.json();
    const productsList = productsData.data || productsData;
    expect(Array.isArray(productsList)).toBe(true);
    expect(productsList.length).toBeGreaterThan(0);
  });

 

  // 4. PUT TEST: Mise à jour du produit créé
  test("PUT - Update an existing product", async ({ request }) => {
    // Saute le test si le POST a échoué pour éviter les fausses erreurs en cascade
    test.skip(!createdProductId, 'Skipping PUT because POST failed to create a valid product');

    const updatedData = {
      name: "Comby Drill - Premium Edition",
      price: 199.99,
      stock: 20 // Correction ici : 'stock' au lieu de 'in_stock'
    };

    const response = await request.put(`${apiUrl}/products/${createdProductId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      data: updatedData
    });

    expect(response.status()).toBe(200);
    const updatedProduct = await response.json();
    expect(updatedProduct.price).toBe(updatedData.price);
    console.log('✅ Updated Product Success:', updatedProduct);
  });

});