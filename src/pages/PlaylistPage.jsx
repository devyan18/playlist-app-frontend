import PlayItem from "../components/PlayItem";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../utils/consts";
import { Link } from "react-router-dom";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);

  const [search, setSearch] = useState("");

  const { auth } = useContext(AuthContext);

  const getAllPlaylist = () => {
    fetch(`${API_URL}/playlist`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  };

  useEffect(() => {
    getAllPlaylist();
  }, []);

  useEffect(() => {
    const filtereds = playlists.filter((play) => {
      return play.title.toLowerCase().includes(search.toLowerCase().trim());
    });

    setFilteredPlaylists(filtereds);
  }, [playlists, search]);

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-4">
      <h1>Playlist Page</h1>
      <div className="w-50 d-flex flex-row gap-2 mt-4">
        <Link className="btn btn-success" to="/playlist/new">
          Create
        </Link>
        <input
          type="search"
          placeholder="Search"
          className="form-control"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="w-50 d-flex flex-column gap-2 mt-4">
        {filteredPlaylists.map((play) => {
          return (
            <PlayItem
              key={play._id}
              playlistId={play._id}
              title={play.title}
              username={play.author.username}
              avatar={play.author.avatar}
              musics={play.musics}
              refresh={getAllPlaylist}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistPage;
