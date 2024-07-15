// import { useState } from "react";

import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import About from "./components/About";
import Home from "./components/Home";
import Signup from "./components/Signup";
import NoteContextProvider from "./Context/Notes/NoteContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/notesboard",
          element: <ProtectedRoute />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
    
      ],
    },
  ]);

  return (
    <NoteContextProvider>
      <RouterProvider router={router} />
    </NoteContextProvider>
  );
}

export default App;
