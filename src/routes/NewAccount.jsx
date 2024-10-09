import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewAccount() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [existed, setExisted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Simulating a check for existing account
    if (code !== "existing") {
      navigate("/", {
        state: { name: name || "Unknown", code },
        replace: true,
      });
    } else {
      setExisted(true);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ flex: "auto" }}>New Account</h1>
        <button
          style={{
            display: "flex",
            backgroundColor: "lightgrey",
            border: "none",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            fontWeight: 500,
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => navigate(-1, { replace: true })}
        >
          Cancel
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "1rem",
        }}
      >
        {existed && (
          <div
            style={{
              gridColumn: "span 2",
              backgroundColor: "lightsalmon",
              borderRadius: "4px",
              padding: "0.5rem 0.75rem",
              marginBottom: "1rem",
            }}
          >
            ⚠️ Account existed! Please try another code.
          </div>
        )}
        <label htmlFor="account-name">Name: </label>
        <input
          id="account-name"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="account-code">Code: </label>
        <input
          id="account-code"
          placeholder="Code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
        <button
          style={{
            gridColumn: "span 2",
            backgroundColor: "violet",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            fontWeight: 500,
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default NewAccount;
