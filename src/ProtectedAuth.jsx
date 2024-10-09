import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isLoggedIn } from "./auth";

const ProtectedAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isLoggedIn();
      if (!loggedIn) {
        navigate("/login", { replace: true });
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedAuth;
