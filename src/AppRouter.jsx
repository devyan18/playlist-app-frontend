import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import NotFoundPage from "./pages/404Page";
import PlaylistPage from "./pages/PlaylistPage";
import PrivateRoutes from "./components/PrivateRoutes";
import NewPlaylistPage from "./pages/NewPlaylistPage";
import MusicPage from "./pages/MusicPage";
import NewMusicPage from "./pages/NewMusicPage";

function AppRouter() {
  return (
    <Routes>
      {/* Rutas Protegidas */}
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/playlist/new" element={<NewPlaylistPage />} />
        <Route path="/playlist/:playlistId" element={<MusicPage />} />
        <Route path="/music/:playlistId" element={<NewMusicPage />} />
      </Route>

      {/* Rutas Públicas */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default AppRouter;
