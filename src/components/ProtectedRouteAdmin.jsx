import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRouteAdmin = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = Cookies.get("user_email");

    if (!userEmail) {
      navigate("/login");
      return;
    }

    fetch("https://localhost:7260/api/Auth/check-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isAdmin) {
          return children; 
                } else {
          Cookies.remove("user_email");
          navigate("/homePage");
        }
      })
      .catch((error) => {
        console.error("Error checking admin status:", error);
        Cookies.remove("user_email");
        navigate("/login");
      });
  }, [navigate]);

  return children; // Render children if admin check passed
};

export default ProtectedRouteAdmin;
