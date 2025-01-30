import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar"> {/* Add the 'navbar' class */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {isAuthenticated ? (
            <>
              <Link to="/books">Books</Link>
              <Link to="/add-book">Add Book</Link> {/* Link to Add Book page */}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;