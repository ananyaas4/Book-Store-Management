import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Get authentication status from context

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  return children; // If authenticated, render the children (the BookListing page)
};

export default PrivateRoute;