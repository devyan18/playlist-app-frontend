import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Navbar from "./Navbar";

function PrivateRoutes() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === null) {
      navigate("/login");
    }
  }, [auth, navigate]);

  if (auth === undefined) return <div>Loading...</div>;

  return (
    //  full screen div with class of bootstrap
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
export default PrivateRoutes;
