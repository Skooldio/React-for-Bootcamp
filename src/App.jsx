import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function randomSixDigits() {
  return [...Array(6)].map(() => Math.floor(Math.random() * 10));
}

function IntervalNumber() {
  const [number, setNumber] = useState(randomSixDigits());
  const [turn, setTurn] = useState(0); // 0 - 1 in 30s
  const duration = 20; // 30s

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNumber(randomSixDigits());
      setTurn(0);
    }, [duration * 1000]);
    return () => clearTimeout(timeout);
  }, [number, duration]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTurn((prev) => prev + 1 / duration);
    }, [1000]);
    return () => clearTimeout(timeout);
  }, [turn, duration]);

  return (
    <div
      style={{
        fontSize: "1.5rem",
        color: "blueviolet",
        display: "flex",
        alignItems: "center",
      }}
    >
      {number.map((num, i) => (
        <span key={i} style={{ marginLeft: i === 3 ? "0.75rem" : 0 }}>
          {num}
        </span>
      ))}
      <span
        style={{
          marginLeft: "auto",
          display: "block",
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: `conic-gradient(transparent 0deg, transparent ${turn}turn, violet ${turn}turn)`,
        }}
      />
    </div>
  );
}

function App() {
  const [accounts, setAccounts] = useState([{ name: "Google", code: "1" }]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      if (location.state.action === "edit" && location.state.data) {
        setAccounts((prev) =>
          prev.map((item) =>
            item.code === location.state.data.code ? location.state.data : item
          )
        );
        // Reset location.state after adding new account
        navigate(location.pathname, { replace: true });
      } else if (location.state.name && location.state.code) {
        setAccounts((prev) =>
          // effect can run more than once, so need to check duplicate before adding new account
          prev.find((item) => item.code === location.state.code)
            ? prev
            : [
                ...prev,
                { name: location.state.name, code: location.state.code },
              ]
        );
        // Reset location.state after adding new account
        navigate(location.pathname, { replace: true });
      }
    }
  }, [location, navigate]);

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ flex: "auto" }}>Authenticator</h1>
        <button
          style={{
            display: "flex",
            backgroundColor: "violet",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            fontWeight: 500,
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/accounts/new")}
        >
          New
        </button>
      </div>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        {accounts.map((item) => (
          <li
            key={item.code}
            style={{
              borderBottom: "1px solid rgba(0 0 0 / 0.12)",
              paddingBlock: "0.5rem",
            }}
          >
            <div style={{ fontSize: "1.25rem" }}>
              <Link
                to="/accounts/edit"
                state={item}
                style={{ textDecoration: "none" }}
              >
                {item.name}
              </Link>
            </div>
            <IntervalNumber />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
