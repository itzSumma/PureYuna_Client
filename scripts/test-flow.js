const axios = require("axios");

const BASE_URL = "http://localhost:5000/api/v1";

const CUSTOMER_CREDENTIALS = {
  email: "newuser@gmail.com",
  password: "password123"
};

const ADMIN_CREDENTIALS = {
  email: "admin@gmail.com",
  password: "yourpassword123"
};

async function runTests() {
  console.log("==================================================");
  console.log("🧪 PureYuna E2E Programmatic Integration Tests");
  console.log("==================================================");

  let customerToken = "";
  let adminToken = "";
  let targetProductId = "";
  let createdOrderId = "";

  // Step A: Admin Authentication (Needed for optional seeding)
  try {
    console.log("\n🔑 Step A: Authenticating Admin account for potential setup...");
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, ADMIN_CREDENTIALS);
    adminToken = loginRes.data.data.token || loginRes.data.token;
    console.log("✅ Admin authenticated.");
  } catch (err) {
    console.error("❌ Admin authentication failed:", err.response?.data || err.message);
    process.exit(1);
  }

  // Step B: Ensure at least one Category and Product exists
  let categoryId = "";
  try {
    console.log("\n📁 Step B1: Checking categories list...");
    const categoriesRes = await axios.get(`${BASE_URL}/categories`);
    const categoriesList = categoriesRes.data.data || categoriesRes.data || [];
    
    if (categoriesList.length === 0) {
      console.log("   No categories found. Creating a test category...");
      const newCatRes = await axios.post(
        `${BASE_URL}/categories`,
        { name: "Serums & Treatments" },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      const newCat = newCatRes.data.data || newCatRes.data;
      categoryId = newCat.id;
      console.log(`✅ Test Category created: "${newCat.name}" (ID: ${categoryId})`);
    } else {
      categoryId = categoriesList[0].id;
      console.log(`✅ Category available: "${categoriesList[0].name}" (ID: ${categoryId})`);
    }
  } catch (err) {
    console.error("❌ Category setup failed:", err.response?.data || err.message);
    process.exit(1);
  }

  try {
    console.log("\n📦 Step B2: Checking products catalog...");
    const productsRes = await axios.get(`${BASE_URL}/products`);
    const productsList = productsRes.data.data || [];
    
    if (productsList.length === 0) {
      console.log("   No products found. Seeding a test product...");
      const productPayload = {
        name: "Fermented Peptide Serum",
        description: "A luxury editorial formulation to hydrate and restore.",
        price: 34.00,
        stock: 100,
        categoryId: categoryId,
        skinType: "DRY", // Changed from "ALL" to valid schema enum value "DRY"
        targetAudience: "ALL",
        productType: "ORGANIC",
        image: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600"
      };
      
      const newProdRes = await axios.post(
        `${BASE_URL}/products`,
        productPayload,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      const newProd = newProdRes.data.data || newProdRes.data;
      targetProductId = newProd.id;
      console.log(`✅ Seeded Product: "${newProd.name}" (ID: ${targetProductId})`);
    } else {
      targetProductId = productsList[0].id;
      console.log(`✅ Product available: "${productsList[0].name}" (ID: ${targetProductId})`);
    }
  } catch (err) {
    console.error("❌ Product setup failed:", err.response?.data || err.message);
    process.exit(1);
  }

  // 1. Customer Authentication & token capture
  try {
    console.log("\n🔑 Step 1: Authenticating Customer account...");
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, CUSTOMER_CREDENTIALS);
    customerToken = loginRes.data.data.token || loginRes.data.token;
    
    if (!customerToken) {
      throw new Error("Token missing from login response");
    }
    console.log("✅ Customer logged in successfully. JWT Token captured.");
  } catch (err) {
    console.error("❌ Customer authentication failed:", err.response?.data || err.message);
    process.exit(1);
  }

  // 2. Order creation via POST /orders
  try {
    console.log("\n🛍️ Step 2: Placing customer order via POST /orders...");
    const orderPayload = {
      address: "123 Botanical Ave",
      city: "New York",
      phone: "+1234567890",
      items: [
        {
          productId: targetProductId,
          quantity: 2
        }
      ]
    };
    
    console.log("Payload:", JSON.stringify(orderPayload, null, 2));

    const orderRes = await axios.post(`${BASE_URL}/orders`, orderPayload, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });

    const orderData = orderRes.data.data || orderRes.data;
    createdOrderId = orderData.id;
    console.log(`✅ Order placed successfully! ID: ${createdOrderId}`);
    console.log(`   Initial Status: ${orderData.status}`);
    console.log(`   Total Amount: $${orderData.totalAmount}`);
  } catch (err) {
    console.error("❌ Order placement failed:", err.response?.data || err.message);
    process.exit(1);
  }

  // 3. Role Authorization Check: Try to fetch all orders with Customer token
  try {
    console.log("\n🛡️ Step 3: Verifying role guard (Attempting GET /orders with CUSTOMER token)...");
    await axios.get(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });
    console.error("❌ FAIL: Customer was allowed to retrieve all store orders!");
    process.exit(1);
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      console.log(`✅ SUCCESS: Customer was blocked with status ${err.response.status} (${err.response.data?.message || "Forbidden"})`);
    } else {
      console.error("❌ Unexpected error during role guard check:", err.message);
      process.exit(1);
    }
  }

  // 4. Admin retrieves all orders to confirm placed order exists
  try {
    console.log("\n📋 Step 4: Admin retrieving orders registry via GET /orders...");
    const ordersRes = await axios.get(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    const ordersList = ordersRes.data.data || ordersRes.data || [];
    const foundOrder = ordersList.find(o => o.id === createdOrderId);

    if (foundOrder) {
      console.log(`✅ Placed order #${createdOrderId.slice(0, 8).toUpperCase()} found in registry.`);
      console.log(`   Order Customer ID: ${foundOrder.userId}`);
      console.log(`   Order Status: ${foundOrder.status}`);
    } else {
      console.error(`❌ Placed order #${createdOrderId} NOT found in admin registry.`);
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Admin failed to retrieve orders:", err.response?.data || err.message);
    process.exit(1);
  }

  // 5. Update order status as Admin via PATCH /orders/:id/status
  try {
    console.log("\n🔄 Step 5: Transitioning order status via PATCH /orders/:id/status...");
    const patchPayload = { status: "PROCESSING" };
    
    const patchRes = await axios.patch(
      `${BASE_URL}/orders/${createdOrderId}/status`,
      patchPayload,
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    const updatedOrder = patchRes.data.data || patchRes.data;
    console.log(`✅ Status update request succeeded.`);
    console.log(`   New Status returned: ${updatedOrder.status}`);

    // Re-verify in orders registry
    console.log("   Re-verifying registry data...");
    const verifyRes = await axios.get(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const ordersList = verifyRes.data.data || verifyRes.data || [];
    const foundOrder = ordersList.find(o => o.id === createdOrderId);

    if (foundOrder && foundOrder.status === "PROCESSING") {
      console.log("✅ SUCCESS: Registry shows updated status 'PROCESSING'.");
    } else {
      console.error(`❌ FAIL: Registry order status is '${foundOrder?.status}' instead of 'PROCESSING'.`);
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Status transition failed:", err.response?.data || err.message);
    process.exit(1);
  }

  console.log("\n==================================================");
  console.log("🎉 All E2E Integration tests passed successfully!");
  console.log("==================================================");
}

runTests();
