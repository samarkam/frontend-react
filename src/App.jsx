import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/screen/homePage';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
              path="/homePage"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
        </Routes>
    </Router>
    
    
  );
}

export default App;

