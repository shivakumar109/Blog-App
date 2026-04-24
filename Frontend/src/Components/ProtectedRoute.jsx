import { useAuth } from "../Store/AuthStore.js";
import { Navigate } from "react-router";
import api from "../APIs/axios";

function ProtectedRoute({ children, allowedRoles }) {
  //get user login status from store
  const { loading, currentUser, isAuthenticated, logout } = useAuth();
  //loading state
  if (loading) {
    return <p>Loading...</p>;
  }
  //if user not loggedin
  if (!isAuthenticated) {
    //redirect to Login
    return <Navigate to="/login" replace />;
  }

  //console.log("current user role", currentUser.role);
  //console.log("aloowed role", allowedRoles);
  //console.log(allowedRoles.includes(currentUser?.role));
  //check roles
  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    console.log("first");
    //redirect to Login
    return <Navigate to="/unauthorized" replace state={{ redirectTo: "login" }} />;
  }

  return children;
}

export default ProtectedRoute;
