import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookListing = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [page, setPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);

  const limit = 5;

  // Fetch books with query parameters
  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://your-books-api-url/books', {
        params: {
          sort: selectedSort,
          category: selectedCategory,
          page: page,
          limit: limit,
        },
      });

      setBooks(response.data.books);
      setTotalBooks(response.data.totalBooks); // Assuming API returns totalBooks count
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Fetch categories for filtering
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://your-books-api-url/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch books and categories on initial load
  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, [selectedSort, selectedCategory, page]);

  // Handle sorting change
  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
    setPage(1); // Reset to first page on sort change
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPage(1); // Reset to first page on category change
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="book-listing-container">
      <h2>Book List</h2>

      {/* Sorting and Filtering */}
      <div className="filters">
        <select onChange={handleSortChange} value={selectedSort}>
          <option value="">Sort By</option>
          <option value="name_asc">Name (A-Z)</option>
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
        </select>

        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Display Books */}
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.price} USD</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page * limit >= totalBooks}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookListing;