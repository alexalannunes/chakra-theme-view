import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { ColorViewPage } from "./pages/color-view";
import { LayoutPage } from "./pages/layout";

export function RoutesApp() {
  return (
    <Routes>
      <Route element={<LayoutPage />}>
        <Route index path="/" element={<HomePage />} />
        <Route path=":colorShades" element={<HomePage />} />
        <Route path="/color/:color" element={<ColorViewPage />} />
      </Route>
    </Routes>
  );
}
