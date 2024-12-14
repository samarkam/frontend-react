import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get("jwt_token");

      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const response = await fetch("https://localhost:7260/api/Auth/validate-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:5173",

            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        console.error("Token validation failed", err);
        setIsValid(false);
      }
    };

    validateToken();
  }, []);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    Cookies.remove("jwt_token");
    return <Navigate to="/login" />;
  }


  return children;
};

export default ProtectedRoute;
