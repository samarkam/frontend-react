import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Assurez-vous d'importer useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Utilisez useNavigate ici

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Échec de la connexion");
      }

      Cookies.set("jwt_token", data.token, { secure: true, sameSite: "strict" });

      navigate("/HomePage");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
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
  );
};

export default Login;
