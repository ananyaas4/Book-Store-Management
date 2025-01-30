import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Book Store</h1>
      <p>Your one-stop shop for all your reading needs. Explore a wide variety of books across different genres, including fiction, non-fiction, and more!</p>
      <div className="explore-books">
        <h2>Explore Our Collection</h2>
        <p>Browse through our vast collection of books to find your next read.</p>
        <Link to="/books">
          <button className="explore-btn">Explore Books</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;