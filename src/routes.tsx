import { Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/home";
import { SavedPalettePage } from "./pages/saved";

export function RoutesApp() {
  return (
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route index path="/saved" element={<SavedPalettePage />} />
    </Routes>
  );
}
