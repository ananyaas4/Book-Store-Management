import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Get the book id from the URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current book details to pre-fill the form
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://your-books-api-url/books/${id}`);
        const data = await response.json();

        if (response.ok) {
          setName(data.name);
          setCategory(data.category);
          setPrice(data.price);
        } else {
          setError('Failed to fetch book details');
        }
      } catch (error) {
        setError('An error occurred while fetching the book details');
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      setError('Name and price are required');
      return;
    }

    setLoading(true);
    setError('');

    const updatedBook = { name, category, price: parseFloat(price) };

    try {
      const response = await fetch(`https://your-books-api-url/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to the books list after successful update
        navigate(`/books/${id}`);
      } else {
        setError(data.message || 'Failed to update book');
      }
    } catch (error) {
      setError('An error occurred while updating the book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category: </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
};

export default EditBook;