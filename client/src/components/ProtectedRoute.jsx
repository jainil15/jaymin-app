import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return null;  // Optionally, return a loading spinner while the authentication status is loading
  }

  return isAuthenticated ? children : <Navigate to="/UserLogin" state={{ from: location }} />;
};

export default ProtectedRoute;  
