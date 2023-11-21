import { Link } from "react-router-dom";
import styles from "../styles/Playlist.module.css";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useId } from "react";
import DeletePlaylistModel from "./DeletePlaylistModel";

const PlayItem = ({ playlist, getPlaylist, onClick }) => {
  const modalId = useId();

  return (
    <div
      key={playlist._id}
      className={styles.item}
      onClick={(e) => {
        // stop propagation to avoid triggering the onClick of the parent

        e.stopPropagation();

        onClick();
      }}
    >
      <picture>
        <img src={playlist.author.avatar} alt={playlist.author.username} />
      </picture>
      <section>
        <h2>{playlist.title}</h2>
        <p>
          <b>{playlist.author.username}</b>
          <span>{playlist.musics.length}</span>
        </p>
      </section>
      <div>
        <Link
          style={{ fontSize: "30px", color: "green" }}
          className="font-warning"
        >
          <HiOutlinePencilAlt />
        </Link>
        <Link
          onClick={(e) => {
            e.stopPropagation();
          }}
          data-bs-toggle="modal"
          data-bs-target={"#modal" + playlist._id}
          style={{ fontSize: "30px", color: "red" }}
        >
          <HiOutlineTrash />
        </Link>

        <DeletePlaylistModel
          getPlaylist={getPlaylist}
          modalId={modalId}
          playlistId={playlist._id}
        />
      </div>
    </div>
  );
};

export default PlayItem;
