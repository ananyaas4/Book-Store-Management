import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams(); // Get the book id from the URL

  useEffect(() => {
    // Fetch the book details from the API
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://your-books-api-url/books/${id}`);
        const data = await response.json();

        if (response.ok) {
          setBook(data);
        } else {
          setError('Failed to fetch book details');
        }
      } catch (error) {
        setError('An error occurred while fetching the data');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {book && (
        <>
          <h2>{book.name}</h2>
          <p>Category: {book.category}</p>
          <p>Price: ₹{book.price}</p>
        </>
      )}
    </div>
  );
};

export default SingleBook;