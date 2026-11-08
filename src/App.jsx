import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "./features/auth/AuthPage";
import { CatalogPage } from "./features/catalog/CatalogPage";
import { AlbumPage } from "./features/album/AlbumPage";
import { EditorPage } from "./features/editor/EditorPage";
import { AddAlbumPage } from "./features/album/AddAlbumPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/add-album" element={<AddAlbumPage />} />
        <Route path="/catalog/:id" element={<AlbumPage />} />
        <Route path="/editor/:albumId" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
