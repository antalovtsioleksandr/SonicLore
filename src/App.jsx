import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "./features/auth/AuthPage";
import { CatalogPage } from "./features/catalog/CatalogPage";
import { AlbumPage } from "./features/album/AlbumPage";
import { EditorPage } from "./features/editor/EditorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
