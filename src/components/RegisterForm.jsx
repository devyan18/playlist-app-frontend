import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/consts";

function RegisterForm() {
  const ref = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { avatar, email, username, password } = e.target.elements;

    const formData = new FormData(e.target);

    const avatar = formData.get("avatar");
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");

    const user = {
      avatar,
      email,
      username,
      password,
    };

    const req = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.status !== 201) return alert("Error al registrar usuario");
    ref.current.reset();

    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} ref={ref}>
      <h1 className="h3 mb-3 fw-normal">Sign up</h1>
      <div className="form-floating">
        <input
          type="url"
          name="avatar"
          className="form-control"
          id="avatar"
          placeholder="name@example.com"
        />
        <label htmlFor="avatar">Avatar</label>
      </div>
      <div className="form-floating">
        <input
          type="text"
          name="username"
          className="form-control"
          id="username"
          placeholder="name@example.com"
        />
        <label htmlFor="username">Username</label>
      </div>
      <div className="form-floating">
        <input
          type="email"
          name="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
        />
        <label htmlFor="email">Email address</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          name="password"
          id="password"
          placeholder="Password"
        />
        <label htmlFor="password">Password</label>
      </div>

      <div className="form-check text-start my-3">
        <input
          className="form-check-input"
          type="checkbox"
          value="remember-me"
          id="flexCheckDefault"
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Remember me
        </label>
      </div>
      <button className="btn btn-primary w-100 py-2" type="submit">
        Sign up
      </button>
      <p className="mt-3 mb-3 text-body-secondary">&copy; 2017–2023</p>
    </form>
  );
}

export default RegisterForm;
