import React, { useEffect, useState } from 'react';
import BookListing from './BookListing';

const BookListingPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books data when the component is mounted
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://your-books-api-url/books');
        const data = await response.json();
        if (response.ok) {
          setBooks(data);
        } else {
          console.error('Failed to fetch books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return <BookListing books={books} setBooks={setBooks} />;
};

export default BookListingPage;