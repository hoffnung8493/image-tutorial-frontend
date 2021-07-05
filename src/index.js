import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ImageProvider } from "./context/ImageContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ImageProvider>
          <App />
        </ImageProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
