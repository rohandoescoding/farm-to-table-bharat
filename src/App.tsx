
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import Support from "./pages/Support";
import FarmerDashboard from "./pages/FarmerDashboard";
import AddProduct from "./pages/AddProduct";
import ManageProducts from "./pages/ManageProducts";
import FarmerEarnings from "./pages/FarmerEarnings";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Delivery from "./pages/Delivery";
import Deals from "./pages/Deals";
import WhatsNew from "./pages/WhatsNew";
import Farmers from "./pages/Farmers";
import FarmerDetail from "./pages/FarmerDetail";
import BuyerOrders from "./pages/BuyerOrders";
import BuyerSettings from "./pages/BuyerSettings";
import FarmerProducts from "./pages/FarmerProducts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<Order />} />
            <Route path="/support" element={<Support />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
            <Route path="/farmer/add-product" element={<AddProduct />} />
            <Route path="/farmer/products" element={<FarmerProducts />} />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/farmer-earnings" element={<FarmerEarnings />} />
            <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
            <Route path="/buyer/orders" element={<BuyerOrders />} />
            <Route path="/buyer/settings" element={<BuyerSettings />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/whats-new" element={<WhatsNew />} />
            <Route path="/farmers" element={<Farmers />} />
            <Route path="/farmers/:id" element={<FarmerDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
