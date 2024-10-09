import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    if (username === "admin" && password === "admin") {
      try {
        await login(username);
        navigate("/");
      } catch (error) {
        setError("An error occurred while logging in");
      }
    } else {
      setError("Incorrect username or password");
      setUsername("");
      setPassword("");
    }
    setIsLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleLogin} style={{ width: "300px" }}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
            disabled={isLoading}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
            disabled={isLoading}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
