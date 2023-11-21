import { Link } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { HiMiniUserCircle, HiMiniMusicalNote } from "react-icons/hi2";

const PlayItem = ({ playlist, onClick }) => {
  return (
    <div className="card mb-3" style="max-width: 540px;">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={playlist.author.avatar}
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                Last updated 3 mins ago
              </small>
            </p>
          </div>
        </div>
      </div>
      <picture>
        <img src={playlist.author.avatar} alt={playlist.author.username} />
      </picture>
      <section>
        <h2>{playlist.title}</h2>
        <p>
          <b>
            <span>
              <HiMiniUserCircle />
            </span>
            <span>{playlist.author.username}</span>
          </b>
          <span>
            <b>
              <HiMiniMusicalNote />
            </b>
            {playlist.musics.length}
          </span>
        </p>
      </section>
      <div>
        <a onClick={onClick} style={{ fontSize: "30px", color: "green" }}>
          <HiOutlinePencilAlt />
        </a>
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
      </div>
    </div>
  );
};

export default PlayItem;
