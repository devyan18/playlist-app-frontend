import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const NewMusicPage = () => {
  const { playlistId } = useParams();

  const [playlist, setPlaylist] = useState(null);

  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const getPlaylist = (playlistId) => {
    fetch(`${API_URL}/playlist/${playlistId}`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setPlaylist(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      artist: formData.get("artist"),
      year: formData.get("year"),
    };

    fetch(`${API_URL}/musics/${playlistId}`, {
      method: "POST",
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status !== 201) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          timer: 2500,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Music added to playlist",
          timer: 2500,
        }).then(() => {
          navigate(`/playlist/${playlistId}`);
        });
      }
    });
  };

  useEffect(() => {
    getPlaylist(playlistId);
  }, []);

  if (!playlist) {
    return (
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-4">
        <h3 className="text-center mt-4">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-4">
      <h1 className="text-center">New Music from "{playlist.title}"</h1>

      <form
        className="d-flex flex-column mt-4 gap-2"
        onSubmit={handleSubmit}
        style={{ width: "500px" }}
      >
        <div className="form-floating">
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="name@example.com"
          />
          <label htmlFor="name">Song Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            name="artist"
            className="form-control"
            id="artist"
            placeholder="name@example.com"
          />
          <label htmlFor="artist">Artist</label>
        </div>
        <div className="form-floating">
          <input
            type="number"
            name="year"
            className="form-control"
            id="year"
            placeholder="name@example.com"
          />
          <label htmlFor="year">Year</label>
        </div>
        <button className="btn btn-success" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewMusicPage;
