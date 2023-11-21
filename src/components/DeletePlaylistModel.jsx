import { useId, useRef } from "react";
import { API_URL } from "../utils/consts";

const DeletePlaylistModel = ({ playlistId, getPlaylist }) => {
  const labelId = useId();
  const ref = useRef(null);

  const handleDelete = () => {
    // eliminar la tarea con playlistId
    console.log("delete playlist", playlistId);
    fetch(`${API_URL}/playlist/${playlistId}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status !== 200) return alert("Error deleting playlist");

      // refresh page
      ref.current.click();
      getPlaylist();
    });
  };

  return (
    <div
      className="modal fade"
      id={"modal" + playlistId}
      aria-labelledby={labelId}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={labelId}>
              Delete Playlist
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this playlist?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={ref}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePlaylistModel;
