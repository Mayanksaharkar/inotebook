import NoteBoard from "./NoteBoard";
import { Navigate } from "react-router-dom";
function ProtectedRoute() {
  let isLoggedIn = localStorage.getItem("token");
  if (isLoggedIn) {
    return <NoteBoard />;
  } else {
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;
