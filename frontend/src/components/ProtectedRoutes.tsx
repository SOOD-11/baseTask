import React from "react";

import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

type ProtectedRoutesProps = {
  role: String;
  children: React.ReactNode;
};

function ProtectedRoutes({ role, children }: ProtectedRoutesProps) {
  const { user, loading } = useAuthContext();
  if (loading) {
    return <p> loading....</p>;
  }
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  if (role && user.role !== role) {
    return <Navigate to="/login"></Navigate>;
  }
  return <> {children}</>;
}

export default ProtectedRoutes;
