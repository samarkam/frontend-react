import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("https://localhost:7260/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": "http://localhost:5173",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Échec de la connexion");
      }

      Cookies.set("jwt_token", data.token, { secure: true, sameSite: "strict" });
      Cookies.set("user_email", email, { expires: 7 });

      // Check admin status
      fetch("https://localhost:7260/api/Auth/check-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.isAdmin) {
            window.location.replace("/articles");

          } else {
            window.location.replace("/homePage");

          }
        })
        .catch((error) => {
          console.error("Error checking admin status:", error);
          window.location.replace("/homePage");
        });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="confirm-order-wrapper">
        <div className="confirm-order-container">
          <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="email">Email :</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="password">Mot de passe :</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: "10px 15px",
                  backgroundColor: isLoading ? "#ccc" : "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? "Chargement..." : "Connexion"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
