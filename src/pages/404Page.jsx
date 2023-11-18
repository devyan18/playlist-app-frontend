import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>Not found</p>

      <Link to="/">Go to home</Link>
    </div>
  );
}
export default NotFoundPage;
