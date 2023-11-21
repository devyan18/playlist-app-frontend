import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../utils/consts";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import Swal from "sweetalert2";

const MusicPage = () => {
  const { playlistId } = useParams();

  const { auth } = useContext(AuthContext);

  const [playlist, setPlaylist] = useState(null);

  const getPlaylist = (playlistId) => {
    fetch(`${API_URL}/playlist/${playlistId}`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setPlaylist(data));
  };

  const handleDelete = (playlistId, musicId) => {
    return fetch(`${API_URL}/musics/${playlistId}/${musicId}`, {
      method: "DELETE",
      headers: {
        Authorization: auth.token,
      },
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
      <h1 className="text-center mt-4">{playlist.title}</h1>
      <div className="d-flex flex-row align-items-center gap-2">
        <img
          src={playlist.author.avatar}
          height={60}
          width={60}
          style={{
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
        <h3>@{playlist.author.username}</h3>
      </div>
      <div className="w-50 d-flex flex-column gap-2 mt-4">
        <div>
          <Link className="btn btn-success" to={`/music/${playlistId}`}>
            Create
          </Link>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th scope="col">Song</th>
              <th scope="col">Artist</th>
              <th scope="col">Year</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {playlist.musics.map((music) => {
              return (
                <tr key={music._id} className="text-center">
                  <td>{music.name}</td>
                  <td>{music.artist}</td>
                  <td>{music.year}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDelete(playlistId, music._id).then((res) => {
                              if (res.status !== 200) {
                                return Swal.fire({
                                  icon: "error",
                                  title: "Oops...",
                                  text: "Something went wrong!",
                                  timer: 2500,
                                });
                              } else {
                                Swal.fire({
                                  title: "Deleted!",
                                  text: "Your file has been deleted.",
                                  icon: "success",
                                });
                                getPlaylist(playlistId);
                              }
                            });
                          }
                        });
                      }}
                    >
                      <BsFillTrashFill />
                    </button>
                    <button className="btn btn-warning">
                      <BsFillPencilFill />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MusicPage;
