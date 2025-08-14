import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "./ux/Spinner";

function ProtectedRoute() {
  const { user, error, loading } = useAuth();
  
  if (loading) return <div className="full-width h-screen flex items-center justify-center"><Spinner /></div>
  error && (<div>Error: {error}</div>);
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;