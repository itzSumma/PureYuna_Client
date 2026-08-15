"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  ShoppingBag, 
  Loader2, 
  X, 
  Check, 
  AlertCircle, 
  TrendingUp,
  Search,
  Filter,
  Eye
} from "lucide-react";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { productService } from "@/services/product.service";
import { orderService } from "@/services/order.service";
import { useToastStore } from "@/stores/toastStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { getApiErrorMessage } from "@/lib/errors";
import type { Product, Category } from "@/types/product";
import type { Order } from "@/types/order";

function AdminContent() {
  const showToast = useToastStore((state) => state.showToast);

  // Core Lists State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // UI States
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders">("overview");
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [submittingProduct, setSubmittingProduct] = useState(false);
  const [updatingOrderStatus, setUpdatingOrderStatus] = useState<string | null>(null);

  // Products Search and Filter States
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("ALL");
  const [stockFilter, setStockFilter] = useState("ALL"); // ALL, LOW_STOCK, OUT_OF_STOCK

  // CRUD Product Modals/State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Delete Confirmation Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState(false);

  // View Order Details Modal State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Product Form state
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formStock, setFormStock] = useState("");
  const [formCategoryId, setFormCategoryId] = useState("");
  const [formSkinType, setFormSkinType] = useState("NORMAL");
  const [formTargetAudience, setFormTargetAudience] = useState("ALL");
  const [formProductType, setFormProductType] = useState("ORGANIC");
  const [formImage, setFormImage] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Initial Load
  useEffect(() => {
    loadProducts();
    loadCategories();
    loadOrders();
  }, []);

  async function loadProducts() {
    setLoadingProducts(true);
    try {
      const response = await productService.getProducts({ limit: 100 });
      setProducts(response.data || []);
    } catch (err) {
      console.error("Failed to load products:", err);
      showToast("Could not load products from API.", "error");
    } finally {
      setLoadingProducts(false);
    }
  }

  async function loadCategories() {
    try {
      const data = await productService.getCategories();
      setCategories(data || []);
      if (data && data.length > 0 && !formCategoryId) {
        setFormCategoryId(data[0].id);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  }

  async function loadOrders() {
    setLoadingOrders(true);
    try {
      const data = await orderService.getAllOrders();
      setOrders(data || []);
    } catch (err) {
      console.error("Failed to load admin orders:", err);
      showToast("Could not retrieve store orders.", "error");
    } finally {
      setLoadingOrders(false);
    }
  }

  // Open Product Modal (New / Edit)
  const openModal = (product: Product | null = null) => {
    setFormErrors({});
    if (product) {
      setEditingProduct(product);
      setFormName(product.name);
      setFormDescription(product.description || "");
      setFormPrice(String(product.price));
      setFormStock(String(product.stock));
      setFormCategoryId(product.categoryId);
      setFormSkinType(product.skinType);
      setFormTargetAudience(product.targetAudience || "ALL");
      setFormProductType(product.productType);
      setFormImage(product.image);
    } else {
      setEditingProduct(null);
      setFormName("");
      setFormDescription("");
      setFormPrice("");
      setFormStock("");
      if (categories.length > 0) setFormCategoryId(categories[0].id);
      setFormSkinType("NORMAL");
      setFormTargetAudience("ALL");
      setFormProductType("ORGANIC");
      setFormImage("");
    }
    setProductModalOpen(true);
  };

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formName.trim()) errors.name = "Product name is required.";
    if (!formDescription.trim()) errors.description = "Description is required.";
    
    const priceNum = parseFloat(formPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      errors.price = "Price must be a valid positive number.";
    }

    const stockNum = parseInt(formStock);
    if (isNaN(stockNum) || stockNum < 0) {
      errors.stock = "Stock must be a non-negative integer.";
    }

    if (!formCategoryId) errors.categoryId = "Category is required.";
    if (!formImage.trim()) errors.image = "Image URL is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save/Submit Product CRUD Form
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmittingProduct(true);
    const payload = {
      name: formName.trim(),
      description: formDescription.trim(),
      price: parseFloat(formPrice),
      stock: parseInt(formStock),
      categoryId: formCategoryId,
      skinType: formSkinType as any,
      targetAudience: formTargetAudience,
      productType: formProductType as any,
      image: formImage.trim(),
    };

    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, payload);
        showToast("Product updated successfully.", "success");
      } else {
        await productService.createProduct(payload);
        showToast("Product created successfully.", "success");
      }
      setProductModalOpen(false);
      loadProducts();
    } catch (err) {
      const msg = getApiErrorMessage(err, "Failed to save product.");
      showToast(msg, "error");
    } finally {
      setSubmittingProduct(false);
    }
  };

  // Open Delete Confirmation
  const openDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  // Delete Product
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    setDeletingProduct(true);
    try {
      await productService.deleteProduct(productToDelete.id);
      showToast("Product deleted successfully.", "success");
      setDeleteModalOpen(false);
      setProductToDelete(null);
      loadProducts();
    } catch (err) {
      const msg = getApiErrorMessage(err, "Failed to delete product.");
      showToast(msg, "error");
    } finally {
      setDeletingProduct(false);
    }
  };

  // PATCH Order Status
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingOrderStatus(orderId);
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      showToast("Order status updated successfully.", "success");
      
      // Update state instantly locally to improve UI performance
      setOrders(prevOrders => 
        prevOrders.map(ord => ord.id === orderId ? { ...ord, status: newStatus as any } : ord)
      );
    } catch (err) {
      const msg = getApiErrorMessage(err, "Failed to update status.");
      showToast(msg, "error");
    } finally {
      setUpdatingOrderStatus(null);
    }
  };

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((ord) => ord.status === "PENDING").length;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  // Filtered Products Catalog
  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          prod.description?.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = selectedCategoryFilter === "ALL" || prod.categoryId === selectedCategoryFilter;
    
    let matchesStock = true;
    if (stockFilter === "LOW_STOCK") {
      matchesStock = prod.stock <= 5 && prod.stock > 0;
    } else if (stockFilter === "OUT_OF_STOCK") {
      matchesStock = prod.stock === 0;
    }
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#3D1B22] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Page Title */}
        <header className="pb-6 border-b border-[#EBDCD2]">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#4A1E27] uppercase">
              Management Portal
            </span>
            <h1 className="font-heading text-4xl font-medium tracking-tight mt-1">
              Sanctuary Administration
            </h1>
          </div>
        </header>

        {/* Tab Switchers */}
        <div className="flex border-b border-[#EBDCD2]/60">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 px-6 text-sm font-medium tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === "overview"
                ? "border-[#4A1E27] text-[#4A1E27] font-semibold"
                : "border-transparent text-charcoal/60 hover:text-[#3D1B22]"
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-4 px-6 text-sm font-medium tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === "products"
                ? "border-[#4A1E27] text-[#4A1E27] font-semibold"
                : "border-transparent text-charcoal/60 hover:text-[#3D1B22]"
            }`}
          >
            🧴 Products Management
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-4 px-6 text-sm font-medium tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === "orders"
                ? "border-[#4A1E27] text-[#4A1E27] font-semibold"
                : "border-transparent text-charcoal/60 hover:text-[#3D1B22]"
            }`}
          >
            📦 Orders Management
          </button>
        </div>

        {/* VIEW 1: Overview & Analytics Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Overview & Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-[#FAF5F0] border border-[#EBDCD2] text-[#4A1E27] rounded-2xl p-5 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[0.68rem] font-bold tracking-wider uppercase text-charcoal/60 block">Total Revenue</span>
                  <span className="text-2xl font-bold mt-1 block font-heading">${totalRevenue.toFixed(2)}</span>
                </div>
                <TrendingUp className="size-8 opacity-40 text-[#4A1E27]" />
              </div>

              <div className="bg-[#FAF5F0] border border-[#EBDCD2] text-[#4A1E27] rounded-2xl p-5 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[0.68rem] font-bold tracking-wider uppercase text-charcoal/60 block">Total Orders</span>
                  <span className="text-2xl font-bold mt-1 block font-heading">{totalOrdersCount}</span>
                </div>
                <ShoppingBag className="size-8 opacity-40 text-[#4A1E27]" />
              </div>

              <div className="bg-[#FAF5F0] border border-[#EBDCD2] text-[#4A1E27] rounded-2xl p-5 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[0.68rem] font-bold tracking-wider uppercase text-charcoal/60 block">Pending Orders</span>
                  <span className="text-2xl font-bold mt-1 block font-heading">{pendingOrdersCount}</span>
                </div>
                <Loader2 className={`size-8 opacity-40 text-[#4A1E27] ${pendingOrdersCount > 0 ? "animate-spin" : ""}`} />
              </div>

              <div className="bg-[#FAF5F0] border border-[#EBDCD2] text-[#4A1E27] rounded-2xl p-5 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[0.68rem] font-bold tracking-wider uppercase text-charcoal/60 block">Low Stock Items</span>
                  <span className="text-2xl font-bold mt-1 block font-heading">{lowStockCount} Products</span>
                </div>
                <AlertCircle className={`size-8 opacity-40 ${lowStockCount > 0 ? "text-rose-600 animate-pulse" : "text-[#4A1E27]"}`} />
              </div>
            </div>

            {/* Quick Action Dashboard Block */}
            <div className="bg-[#FAF5F0] border border-[#EBDCD2] rounded-3xl p-6 space-y-4">
              <h2 className="font-heading text-xl font-medium text-[#4A1E27]">Administrative Quick Actions</h2>
              <p className="text-xs text-charcoal/80">Easily navigate to administrative functions or perform direct product setup actions below.</p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => {
                    setActiveTab("products");
                    setTimeout(() => openModal(), 50);
                  }}
                  className="bg-[#4A1E27] hover:bg-[#3D1B22] text-[#FAF5F0] rounded-xl flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Plus className="size-4" />
                  Add New Product
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setActiveTab("orders")}
                  className="border-[#EBDCD2] hover:bg-[#FDF8F5] text-[#4A1E27] rounded-xl flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <ShoppingBag className="size-4" />
                  View Pending Orders
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Products Management Tab */}
        {activeTab === "products" && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-heading text-2xl font-medium">Store Catalog</h2>
              <Button 
                onClick={() => openModal()}
                className="bg-[#4A1E27] hover:bg-[#3D1B22] text-[#FAF5F0] rounded-xl flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <Plus className="size-4" />
                Add Product
              </Button>
            </div>

            {/* Search and Filters Bar */}
            <div className="bg-[#FAF5F0] border border-[#EBDCD2] rounded-2xl p-4 grid gap-4 sm:grid-cols-3 text-xs">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 size-4 text-charcoal/40" />
                <Input
                  placeholder="Search formula name or info..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="pl-9 bg-[#FDF8F5] border border-[#EBDCD2] rounded-xl text-xs py-2"
                />
              </div>

              <div>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#EBDCD2] bg-[#FDF8F5] text-[#3D1B22] focus:outline-none text-xs"
                >
                  <option value="ALL">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#EBDCD2] bg-[#FDF8F5] text-[#3D1B22] focus:outline-none text-xs"
                >
                  <option value="ALL">All Stock Statuses</option>
                  <option value="LOW_STOCK">Low Stock (≤ 5 units)</option>
                  <option value="OUT_OF_STOCK">Out of Stock</option>
                </select>
              </div>
            </div>

            {/* Products Table */}
            {loadingProducts ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="size-8 animate-spin text-[#4A1E27]" />
                <span className="text-xs text-charcoal/60 tracking-wider">Retrieving Catalog Formulas...</span>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-[#FAF5F0] rounded-3xl border border-[#EBDCD2] space-y-3">
                <p className="text-xs text-charcoal/70">No products match your active search or filters.</p>
                <Button onClick={() => { setProductSearch(""); setSelectedCategoryFilter("ALL"); setStockFilter("ALL"); }} variant="outline" className="text-xs">Reset Filters</Button>
              </div>
            ) : (
              <div className="bg-[#FAF5F0] border border-[#EBDCD2] rounded-3xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF5F0]/80 border-b border-[#EBDCD2] text-[#3D1B22]/70 uppercase font-semibold tracking-wider">
                        <th className="p-4">Formula</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Skin Target</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBDCD2]/50">
                      {filteredProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-[#FDF4EE]/40 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-[#FAF6F2] border border-[#EBDCD2]/30">
                              <ImageWithFallback
                                src={prod.image}
                                alt={prod.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <span className="font-semibold text-sm block">{prod.name}</span>
                              <span className="text-[0.68rem] text-charcoal/60">{prod.id.slice(0, 8).toUpperCase()}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[0.62rem] font-semibold border ${
                              prod.productType === "ORGANIC" 
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}>
                              {prod.productType}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-charcoal/80">{prod.skinType}</td>
                          <td className="p-4 font-semibold">${prod.price.toFixed(2)}</td>
                          <td className={`p-4 font-bold ${prod.stock <= 5 ? "text-rose-600 animate-pulse" : "text-[#3D1B22]"}`}>
                            {prod.stock === 0 ? "Out of Stock" : `${prod.stock} units`}
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => openModal(prod)}
                              className="p-2 hover:bg-[#4A1E27]/10 text-charcoal hover:text-[#4A1E27] rounded-lg transition-colors cursor-pointer"
                              title="Edit Formula"
                            >
                              <Edit className="size-4" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(prod)}
                              className="p-2 hover:bg-rose-50 text-charcoal hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}

        {/* VIEW 3: Orders Management Tab */}
        {activeTab === "orders" && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <h2 className="font-heading text-2xl font-medium">Orders Registry</h2>

            {loadingOrders ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="size-8 animate-spin text-[#4A1E27]" />
                <span className="text-xs text-charcoal/60 tracking-wider">Retrieving Order Registry...</span>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 bg-[#FAF5F0] rounded-3xl border border-[#EBDCD2]">
                <p className="text-xs text-charcoal/70">No orders placed in the store yet.</p>
              </div>
            ) : (
              <div className="bg-[#FAF5F0] border border-[#EBDCD2] rounded-3xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF5F0]/80 border-b border-[#EBDCD2] text-[#3D1B22]/70 uppercase font-semibold tracking-wider">
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Items Count</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBDCD2]/50">
                      {orders.map((ord) => {
                        const dateStr = new Date(ord.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                        const itemsCount = ord.orderItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
                        return (
                          <tr key={ord.id} className="hover:bg-[#FDF4EE]/40 transition-colors">
                            <td className="p-4">
                              <span className="font-semibold block">#{ord.id.slice(0, 8).toUpperCase()}</span>
                              <span className="text-[0.68rem] text-charcoal/60">{dateStr}</span>
                            </td>
                            <td className="p-4">
                              <span className="font-medium block">{ord.user?.name || "Customer"}</span>
                              <span className="text-[0.68rem] text-charcoal/60 truncate block max-w-[15ch]" title={`${ord.address}, ${ord.city}`}>
                                {ord.address}, {ord.city}
                              </span>
                            </td>
                            <td className="p-4 font-medium text-charcoal/70">{ord.phone}</td>
                            <td className="p-4 font-medium text-center">{itemsCount} items</td>
                            <td className="p-4 font-bold text-sm text-[#4A1E27]">
                              ${ord.totalAmount.toFixed(2)}
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded-full text-[0.62rem] font-bold border uppercase ${
                                ord.status === "PENDING" && "bg-amber-50 text-amber-700 border-amber-200" ||
                                ord.status === "PROCESSING" && "bg-blue-50 text-blue-700 border-blue-200" ||
                                ord.status === "SHIPPED" && "bg-purple-50 text-purple-700 border-purple-200" ||
                                ord.status === "DELIVERED" && "bg-emerald-50 text-emerald-700 border-emerald-200" ||
                                "bg-rose-50 text-rose-700 border-rose-200"
                              }`}>
                                {ord.status}
                              </span>
                            </td>
                            <td className="p-4 text-right flex items-center justify-end gap-2.5">
                              <button
                                onClick={() => setSelectedOrder(ord)}
                                className="p-2 hover:bg-[#4A1E27]/10 text-charcoal hover:text-[#4A1E27] rounded-lg transition-colors cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="size-4" />
                              </button>
                              
                              {updatingOrderStatus === ord.id ? (
                                <Loader2 className="size-4 animate-spin text-[#4A1E27] inline" />
                              ) : (
                                <select
                                  value={ord.status}
                                  onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                                  className="text-xs p-1.5 rounded-lg border border-[#EBDCD2] bg-[#FAF6F2] text-[#3D1B22] focus:outline-none focus:border-[#4A1E27] cursor-pointer"
                                >
                                  <option value="PENDING">PENDING</option>
                                  <option value="PROCESSING">PROCESSING</option>
                                  <option value="SHIPPED">SHIPPED</option>
                                  <option value="DELIVERED">DELIVERED</option>
                                  <option value="CANCELLED">CANCELLED</option>
                                </select>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}

        {/* PRODUCT ADD/EDIT MODAL */}
        {productModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
            <div className="bg-[#FAF5F0] border border-[#EBDCD2] rounded-3xl p-6 w-full max-w-lg shadow-xl relative animate-in fade-in zoom-in-95 duration-200 text-xs">
              <button 
                onClick={() => setProductModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-charcoal/10 transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>

              <h3 className="font-heading text-2xl font-medium text-[#3D1B22] mb-6 pb-2 border-b border-[#EBDCD2]/50">
                {editingProduct ? "Edit Product Formula" : "Register New Product"}
              </h3>

              <form onSubmit={handleSaveProduct} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                
                {/* Name */}
                <div className="space-y-1">
                  <Label htmlFor="prodName" className="font-semibold text-[0.68rem] tracking-wider uppercase text-charcoal/80">Name</Label>
                  <Input
                    id="prodName"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Rice Ferment Essence"
                    className="bg-[#FDF8F5] border border-[#EBDCD2] rounded-xl px-3 py-2.5 text-xs"
                  />
                  {formErrors.name && <p className="text-red-600 text-[0.68rem]">{formErrors.name}</p>}
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <Label htmlFor="prodDesc" className="font-semibold text-[0.68rem] tracking-wider uppercase text-charcoal/80">Description</Label>
                  <textarea
                    id="prodDesc"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Describe formulation and ritual benefits..."
                    className="w-full min-h-16 p-3 rounded-xl border border-[#EBDCD2] bg-[#FDF8F5] text-[#3D1B22] outline-none focus:border-[#4A1E27] focus:ring-0 text-xs"
                  />
                  {formErrors.description && <p className="text-red-600 text-[0.68rem]">{formErrors.description}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Price */}
                  <div className="space-y-1">
                    <Label htmlFor="prodPrice" className="font-semibold text-[0.68rem] tracking-wider uppercase text-charcoal/80">Price ($)</Label>
                    <Input
                      id="prodPrice"
                      type="number"
                      step="0.01"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="28.00"
                      className="bg-[#FDF8F5] border border-[#EBDCD2] rounded-xl px-3 py-2.5 text-xs"
                    />
                    {formErrors.price && <p className="text-red-600 text-[0.68rem]">{formErrors.price}</p>}
                  </div>

                  {/* Stock */}
                  <div className="space-y-1">
                    <Label htmlFor="prodStock" className="font-semibold text-[0.68rem] tracking-wider uppercase text-charcoal/80">Stock</Label>
                    <Input
                      id="prodStock"
                      type="number"
                      value={formStock}
                      onChange={(e) => setFormStock(e.target.value)}
                      placeholder="40"
                      className="bg-[#FDF8F5] border border-[#EBDCD2] rounded-xl px-3 py-2.5 text-xs"
                    />
                    {formErrors.stock && <p className="text-red-600 text-[0.68rem]">{formErrors.stock}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Category */}
                  <div className="space-y-1">
                    <Label htmlFor="prodCat" className="font-semibold text-[0.68rem] tracking-wider uppercase text-charcoal/80">Category</Label>
                    <select
                      id="prodCat"
                      value={formCategoryId}
                      onChange={(e) => setFormCategoryId(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#EBDCD2] bg-[#FDF8F5] text-[#3D1B22] focus:outline-none text-xs"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    {formErrors.categoryId && <p className="text-red-600 text-[0.68rem]">{formErrors.categoryId}</p>}
                  </div>

                  {/* Product Type */}
                  <div className="space-y-1">
                    <Label htmlFor="prodType" className="font-semibold text-[0.68rem] tracking-wider uppercase text-charcoal/80">Product Type</Label>
                    <select
                      id="prodType"
                      value={formProductType}
                      onChange={(e) => setFormProductType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#EBDCD2] bg-[#FDF8F5] text-[#3D1B22] focus:outline-none text-xs"
                    >
                      <option value="ORGANIC">ORGANIC</option>
                      <option value="FORMULATED">FORMULATED</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Skin Type */}
                  <div className="space-y-1">
                    <Label htmlFor="prodSkin" className="font-semibold text-[0.68rem] tracking-wider uppercase text-charcoal/80">Skin Type</Label>
                    <select
                      id="prodSkin"
                      value={formSkinType}
                      onChange={(e) => setFormSkinType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#EBDCD2] bg-[#FDF8F5] text-[#3D1B22] focus:outline-none text-xs"
                    >
                      <option value="NORMAL">NORMAL</option>
                      <option value="DRY">DRY</option>
                      <option value="OILY">OILY</option>
                      <option value="SENSITIVE">SENSITIVE</option>
                      <option value="COMBINATION">COMBINATION</option>
                    </select>
                  </div>

                  {/* Target Audience */}
                  <div className="space-y-1">
                    <Label htmlFor="prodAud" className="font-semibold text-[0.68rem] tracking-wider uppercase text-charcoal/80">Target Audience</Label>
                    <select
                      id="prodAud"
                      value={formTargetAudience}
                      onChange={(e) => setFormTargetAudience(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#EBDCD2] bg-[#FDF8F5] text-[#3D1B22] focus:outline-none text-xs"
                    >
                      <option value="ALL">ALL</option>
                      <option value="WOMEN">WOMEN</option>
                      <option value="MEN">MEN</option>
                      <option value="UNISEX">UNISEX</option>
                    </select>
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-1">
                  <Label htmlFor="prodImg" className="font-semibold text-[0.68rem] tracking-wider uppercase text-charcoal/80">Image URL</Label>
                  <Input
                    id="prodImg"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://images.unsplash.com/... or /images/..."
                    className="bg-[#FDF8F5] border border-[#EBDCD2] rounded-xl px-3 py-2.5 text-xs"
                  />
                  {formErrors.image && <p className="text-red-600 text-[0.68rem]">{formErrors.image}</p>}
                </div>

                {/* Submit buttons */}
                <div className="pt-4 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setProductModalOpen(false)}
                    className="w-1/2 border-[#EBDCD2] hover:bg-charcoal/10 rounded-xl cursor-pointer text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submittingProduct}
                    className="w-1/2 bg-[#4A1E27] hover:bg-[#3D1B22] text-[#FAF5F0] rounded-xl cursor-pointer text-xs"
                  >
                    {submittingProduct ? (
                      <>
                        <Loader2 className="size-3 animate-spin mr-1.5" />
                        Saving...
                      </>
                    ) : (
                      "Save Product"
                    )}
                  </Button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {deleteModalOpen && productToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
            <div className="bg-[#FAF5F0] border border-[#EBDCD2] rounded-3xl p-6 w-full max-w-sm shadow-xl relative animate-in fade-in zoom-in-95 duration-200 text-xs space-y-4">
              <h3 className="font-heading text-xl font-medium text-[#3D1B22]">
                Delete Product
              </h3>
              <p className="text-xs text-charcoal/80">
                Are you sure you want to delete <span className="font-semibold text-[#4A1E27]">{productToDelete.name}</span>? This action soft deletes the formula from active storefront lists.
              </p>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => { setDeleteModalOpen(false); setProductToDelete(null); }}
                  className="w-1/2 border-[#EBDCD2] hover:bg-charcoal/10 rounded-xl cursor-pointer text-xs"
                >
                  Cancel
                </Button>
                <Button
                  disabled={deletingProduct}
                  onClick={handleDeleteProduct}
                  className="w-1/2 bg-rose-600 hover:bg-rose-700 text-[#FAF5F0] rounded-xl cursor-pointer text-xs"
                >
                  {deletingProduct ? (
                    <>
                      <Loader2 className="size-3 animate-spin mr-1.5" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Formula"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW ORDER DETAILS MODAL */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
            <div className="bg-[#FAF5F0] border border-[#EBDCD2] rounded-3xl p-6 w-full max-w-lg shadow-xl relative animate-in fade-in zoom-in-95 duration-200 text-xs">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-charcoal/10 transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>

              <h3 className="font-heading text-2xl font-medium text-[#3D1B22] mb-4 pb-2 border-b border-[#EBDCD2]/50">
                Order #{selectedOrder.id.slice(0, 8).toUpperCase()} Details
              </h3>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                {/* Customer Details */}
                <div className="bg-[#FDF8F5] border border-[#EBDCD2] rounded-2xl p-4 space-y-2">
                  <span className="font-semibold text-charcoal/80 uppercase tracking-wider block text-[0.68rem]">Recipient & Delivery</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-charcoal/60 block">Name:</span>
                      <span className="font-medium text-[#3D1B22]">{selectedOrder.user?.name || "Customer"}</span>
                    </div>
                    <div>
                      <span className="text-charcoal/60 block">Phone:</span>
                      <span className="font-medium text-[#3D1B22]">{selectedOrder.phone}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-charcoal/60 block">Shipping Address:</span>
                      <span className="font-medium text-[#3D1B22]">{selectedOrder.address}, {selectedOrder.city}</span>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  <span className="font-semibold text-charcoal/80 uppercase tracking-wider block text-[0.68rem]">Order Items</span>
                  <div className="border border-[#EBDCD2] rounded-2xl overflow-hidden bg-[#FDF8F5]">
                    <div className="divide-y divide-[#EBDCD2]/40">
                      {selectedOrder.orderItems?.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 text-xs">
                          <div>
                            <span className="font-semibold block text-[#3D1B22]">{item.product?.name || "Product Formula"}</span>
                            <span className="text-charcoal/60 block">{item.quantity} x ${item.price.toFixed(2)}</span>
                          </div>
                          <span className="font-bold text-[#4A1E27]">${(item.quantity * item.price).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-2 font-bold text-sm text-[#4A1E27]">
                  <span>Total Amount Paid</span>
                  <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <RequireAuth roles={["ADMIN"]}>
      <AdminContent />
    </RequireAuth>
  );
}
