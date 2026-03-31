import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "./router/RouterContext";
import LayoutApp from "./LayoutApp";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider>
      <LayoutApp />
    </RouterProvider>
  </React.StrictMode>
  
);