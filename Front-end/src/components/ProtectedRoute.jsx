import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ component: Component, allowedRoles }) => {
  const token = localStorage.getItem("authToken");

  console.log("ProtectedRoute token:", token);

  if (!token) {
    console.log("No token found, navigating to /login");
    return <Navigate to="/login" />;
  }

  try {
    const user = jwtDecode(token);
    console.log("Decoded user:", user);

    const role = user.Titel;

    if (allowedRoles.includes(role)) {
      console.log(`User role ${role} is allowed, rendering component`);
      return <Component />;
    } else {
      console.log(`User role ${role} is not allowed, navigating to /forbidden`);
      return <Navigate to="/forbidden" />;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
