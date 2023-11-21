import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center gap-4 pt-5">
      <h1 className="text-center">Home page</h1>
      <p className="w-75">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse cum
        veniam, tenetur deleniti vel aut quos, blanditiis repellendus numquam
        doloribus suscipit amet quaerat a ab doloremque aliquid debitis earum
        nostrum. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
        rerum sint eius quibusdam animi assumenda accusantium deleniti,
        cupiditate exercitationem asperiores?
      </p>
      <Link className="btn btn-primary btn-lg" to="/playlist">
        Go to Playlist
      </Link>
    </div>
  );
}
export default HomePage;
