import { test, expect } from '@playwright/test';

test.describe('API CRUD Testing Suite', () => {
  const apiUrl = 'https://api.practicesoftwaretesting.com';
  
  let authToken = '';
  let createdProductId = '';
  let activeCategoryId = '';
  let activeBrandId = '';

  test.beforeAll(async ({ request }) => {
    // 1. Connexion Admin
    const loginResponse = await request.post(`${apiUrl}/users/login`, {
      data: { email: 'admin@practicesoftwaretesting.com', password: 'welcome01' }
    });
    const loginData = await loginResponse.json();
    authToken = loginData.access_token;

    // 2. Récupération d'une catégorie
    const categoriesResponse = await request.get(`${apiUrl}/categories`);
    const categories = await categoriesResponse.json();
    const categoryList = categories.data || categories;
    if (categoryList && categoryList.length > 0) activeCategoryId = categoryList[0].id;

    // 3. Récupération d'une marque
    const brandsResponse = await request.get(`${apiUrl}/brands`);
    const brands = await brandsResponse.json();
    const brandsList = brands.data || brands;
    if (brandsList && brandsList.length > 0) activeBrandId = brandsList[0].id;

    // 4. CRÉATION DYNAMIQUE
    const newProductResponse = await request.post(`${apiUrl}/products`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      data: {
        name: "Test Drill Base",
        description: "Initial description for testing purposes",
        price: 99.99,
        stock: 10,
        category_id: activeCategoryId,
        brand_id: activeBrandId
      }
    });
    
    const createdProductData = await newProductResponse.json();
    const product = createdProductData.data || createdProductData;
    createdProductId = product.id;

    if (!createdProductId) {
      const productsResponse = await request.get(`${apiUrl}/products`);
      const productsData = await productsResponse.json();
      const productsList = productsData.data || productsData;
      if (productsList && productsList.length > 0) {
        createdProductId = productsList[0].id;
      }
    }
  });

  // GET TEST
  test("Get api response and validate products body", async ({ request }) => {
    const response = await request.get(`${apiUrl}/products`);
    expect(response.status()).toBe(200);
    
    const productsData = await response.json();
    const productsList = Array.isArray(productsData) ? productsData : (productsData.data || []);
    expect(Array.isArray(productsList)).toBe(true);
  });

  // PUT TEST (Corrigé avec re-fetch GET pour valider la modification)
  test("PUT - Update an existing product", async ({ request }) => {
    expect(createdProductId).toBeTruthy(); 

    const updatedData = {
      name: "Comby Drill - Premium Edition",
      description: "Updated product description required by the API schema",
      price: 199.99,
      stock: 20,
      category_id: activeCategoryId,
      brand_id: activeBrandId
    };

    // Exécuter la mise à jour (PUT)
    const response = await request.put(`${apiUrl}/products/${createdProductId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      data: updatedData
    });

    expect(response.status()).toBe(200);

    // Récupérer l'état actuel du produit sur le serveur pour valider les changements
    const getUpdatedResponse = await request.get(`${apiUrl}/products/${createdProductId}`);
    expect(getUpdatedResponse.status()).toBe(200);

    const freshProductData = await getUpdatedResponse.json();
    const updatedProduct = freshProductData.data || freshProductData;

    // Comparaison finale et robuste de la valeur enregistrée
    expect(String(updatedProduct.price)).toBe(String(updatedData.price));
    expect(updatedProduct.name).toBe(updatedData.name);
  });

});