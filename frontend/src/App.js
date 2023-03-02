import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./pages/homePage";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/productPage";
import { ProductsProvider } from "./context/productsContext";
import CartPage from "./pages/cartPage";
import { CartProvider } from "./context/cartContext";
import { UserProvider } from "./context/userContext";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import ProfilePage from "./pages/profilePage";
import Logout from "./pages/logout";
import ShippingPage from "./pages/shippingPage";
import PlacerOrderPage from "./pages/placeOrderPage";
import OrderDetailsPage from "./pages/orderDetailsPage";
import "./App.css";
import ConfirmationPage from "./pages/confirmationPage";
import PaymentPage from "./pages/paymentPage";
import SearchPage from "./pages/searchPage";

function App() {
  const [keyword, setKeyword] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const keywordParam = queryParams.get("keyword")
    ? queryParams.get("keyword")
    : "";

  useEffect(() => {
    setKeyword(keywordParam);
  });

  return (
    <div>
      <UserProvider>
        <Header keyword={keyword} setKeyword={setKeyword} />
        <main className="py-3">
          <Container>
            <ProductsProvider>
              <CartProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} exact />
                  <Route
                    path="/search"
                    element={<SearchPage keyword={keyword} />}
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/products/:id" element={<ProductPage />} />
                  <Route path="/orders/:id" element={<OrderDetailsPage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/shipping" element={<ShippingPage />} />
                  <Route path="/confirmation" element={<ConfirmationPage />} />
                  <Route path="/placeorder" element={<PlacerOrderPage />} />
                  <Route path="/cart" element={<CartPage />} />
                </Routes>
              </CartProvider>
            </ProductsProvider>
          </Container>
        </main>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
