import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navigation from './components/navigation';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/screen/homePage';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from './components/securedViews/UserProfile';
import AboutApp from './components/screen/AboutApp';
import Contact from './components/screen/Contact';
import "/styles.css";
import { CartProvider } from "use-shopping-cart";
import Cart from './components/shopping/Cart';
import ConfirmOrder from './components/shopping/ConfirmOrder';
function App() {
  return (
    <>
    <CartProvider>
    <Router>
    <Navigation />

      <Routes>
      <Route path="/homePage" element={<HomePage />} />
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<AboutApp />} />
      <Route path="/contact" element={<Contact />} />
      <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <UserProfile/>
                </ProtectedRoute>
              }
            />
      <Route
              path="/confirmOrder/:orderId"
              element={
                <ProtectedRoute>
                  <ConfirmOrder/>
                </ProtectedRoute>
              }
            />
      <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart/>
                </ProtectedRoute>
              }
            />
            
        </Routes>
    </Router>
    
    </CartProvider>
    </>
  );
}

export default App;

