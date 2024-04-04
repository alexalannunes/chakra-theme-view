import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RoutesApp } from "./routes.tsx";
import { Button } from "./theme";

const theme = extendTheme({
  components: {
    Button,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
