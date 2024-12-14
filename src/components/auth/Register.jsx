import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Install with npm install js-cookie

const Register = () => {
  const [formData, setFormData] = useState({
    UserName: "",
    email: "",
    password: "",
    avatar: "https://res.cloudinary.com/iset-sfax/image/upload/v1701446211/images/image.PNG.png", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
        await axios.post('https://localhost:7260/api/Auth/register', formData);
        Cookies.set("user_email", formData.email, { expires: 7 }); 

        navigate('/login');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
      {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Name Field */}
        <div style={styles.formGroup}>
          <label htmlFor="UserName">Name</label>
          <input
            type="text"
            id="UserName"
            name="UserName"
            value={formData.UserName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Email Field */}
        <div style={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Password Field */}
        <div style={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

       

        {/* Avatar Field */}
        <div style={styles.formGroup}>
          <label htmlFor="avatar">Avatar (optional)</label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            placeholder="https://res.cloudinary.com/iset-sfax/image/upload/v1701446211/images/image.PNG.png"
            value={formData.avatar}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Register;
