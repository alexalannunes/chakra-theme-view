import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";

export function RoutesApp() {
  return (
    <Routes>
      <Route index path="/" element={<HomePage />} />
    </Routes>
  );
}
