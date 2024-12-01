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
function App() {
  return (
    <>
    <Router>
    <Navigation />

      <Routes>
      <Route path="/homePage" element={<HomePage />} />

      <Route path="/" element={<Login />} />
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

            
        </Routes>
    </Router>
    </>
  );
}

export default App;

