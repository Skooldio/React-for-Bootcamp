import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function EditAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState(location.state?.name || "");
  const code = location.state?.code;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/", {
      state: { action: "edit", data: { name, code } },
      replace: true,
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ flex: "auto" }}>Edit Account</h1>
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
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <label htmlFor="account-name">Name: </label>
          <input
            id="account-name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "violet",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            fontWeight: 500,
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EditAccount;
