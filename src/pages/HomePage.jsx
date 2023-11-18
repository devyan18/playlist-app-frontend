import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function HomePage() {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
export default HomePage;
