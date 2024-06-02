import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const ProtectedRoute = ({ component: Component, allowedRoles }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const user = jwtDecode(token);
        const response = await axios.get(`http://localhost:8080/gebruiker/titel/id=${user.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data.titel);
        const role = response.data.titel;
        if (allowedRoles.includes(role)) {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Er is iets fout gegaan bij het ophalen van de gebruiker", error);
      }
      setIsLoading(false);
    };

    checkAuthorization();
  }, [allowedRoles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? <Component /> : <Navigate to="/forbidden" />;
};

export default ProtectedRoute;
