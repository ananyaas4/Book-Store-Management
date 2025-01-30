import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import BookListingPage from './pages/BookListingPage';
import PrivateRoute from './components/PrivateRoute';
import SingleBook from './pages/SingleBook';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import './index.css'; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <BookListingPage />
              </PrivateRoute>
            }
          />
          <Route path="/books/:id" element={<SingleBook />} />
          <Route
            path="/add-book"
            element={
              <PrivateRoute>
                <AddBook />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-book/:id"
            element={
              <PrivateRoute>
                <EditBook />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;