import { useEffect, useState } from "react";
import PlayItem from "./PlayItem";
import { Link, useNavigate } from "react-router-dom";

const Playlist = ({ playlists, getPlaylist }) => {
  // la información que NO vamos a modificar.
  const [search, setSearch] = useState("");
  const [filterPlaylists, setFilterPlaylists] = useState(playlists);

  const navigate = useNavigate();

  useEffect(() => {
    const filtered = playlists.filter((play) => {
      return play.title.toLowerCase().includes(search.toLowerCase());
    });

    setFilterPlaylists(filtered);
  }, [search, playlists]);

  return (
    <div>
      <div>
        <Link to="/playlist/new" className="btn btn-success">
          Create
        </Link>
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <>
        {filterPlaylists.map((playlist) => {
          return (
            <PlayItem
              getPlaylist={getPlaylist}
              key={playlist._id}
              playlist={playlist}
              onClick={() => {
                navigate(`/playlist/${playlist._id}`);
              }}
            />
          );
        })}
      </>
    </div>
  );
};

export default Playlist;
