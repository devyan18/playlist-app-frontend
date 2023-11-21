import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center gap-4 pt-5">
      <h1 className="text-center">Home Page</h1>
      <p className="w-75">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        labore placeat repellendus earum eum obcaecati tempora ipsum ab magnam
        impedit, quod dolores eos soluta voluptatum eveniet fuga eius. Laborum,
        quasi?
      </p>
      <Link
        to="/playlist"
        className="btn btn-primary btn-lg"
        style={{ width: "250px" }}
      >
        Go to Playlist
      </Link>
    </div>
  );
}
export default HomePage;
