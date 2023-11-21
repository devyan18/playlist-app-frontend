import { useContext, useState } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NewPlaylistPage = () => {
  const [title, setTitle] = useState("");
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch(`${API_URL}/playlist`, {
      method: "POST",
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }).then((res) => {
      if (res.status !== 201)
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          timer: 2500,
        });

      setTitle("");
      navigate("/playlist");
    });
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-4">
      <h1 className="text-center">New Playlist</h1>
      <form className="d-flex mt-4" onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            placeholder="name@example.com"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title">Title of Playlist</label>
        </div>
        <button className="btn btn-success">Create</button>
      </form>
    </div>
  );
};

export default NewPlaylistPage;
