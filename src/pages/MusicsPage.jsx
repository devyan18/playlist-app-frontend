import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { HiOutlineTrash } from "react-icons/hi";
import Navbar from "../components/Navbar";

const MusicsPage = () => {
  const { playlistId } = useParams();

  const [playlist, setPlaylist] = useState(null);

  const { auth } = useContext(AuthContext);
  const formRef = useRef(null);

  const getPlaylist = () => {
    fetch(`${API_URL}/playlist/${playlistId}`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => {
        if (res.status !== 200) return alert("Error getting playlist");

        return res.json();
      })
      .then((data) => {
        setPlaylist(data);
      });
  };

  useEffect(() => {
    getPlaylist();
  }, [playlistId, auth]);

  const handleDeleteMusic = (musicId) => {
    fetch(`${API_URL}/musics/${playlistId}/${musicId}`, {
      method: "DELETE",
      headers: {
        Authorization: auth.token,
      },
    }).then((res) => {
      if (!res.ok) return alert("Error deleting music");
      getPlaylist();
    });
  };

  const handleCreateNewMusic = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch(`${API_URL}/musics/${playlistId}`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        artist: formData.get("author"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    }).then((res) => {
      if (!res.ok) return alert("Error creating new music");
      getPlaylist();
    });

    formRef.current.reset();
  };

  if (!playlist) return <h1>Loading...</h1>;

  return (
    <div>
      <Navbar />
      <h1>{playlist.title}</h1>
      <form onSubmit={handleCreateNewMusic} ref={formRef}>
        <input type="text" name="name" placeholder="music name" />
        <input type="text" name="author" placeholder="author" />
        <button>Create new Music</button>
      </form>
      {playlist.musics.map((music) => {
        return (
          <div key={music.id} className="music">
            <h2>{music.name}</h2>
            <p>
              <i>{music.artist}</i> {music.year}
            </p>
            <button
              className="delete-button"
              onClick={() => handleDeleteMusic(music._id)}
            >
              <HiOutlineTrash />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MusicsPage;
