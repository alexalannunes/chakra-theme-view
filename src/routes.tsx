import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: ":color",
        element: <HomePage />,
      },
    ],
  },
]);

export { router };
