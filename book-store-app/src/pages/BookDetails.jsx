import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`https://iris-chisel-mimosa.glitch.me/books/${id}`).then((response) => {
      setBook(response.data);
    });
  }, [id]);

  return book ? (
    <div>
      <h2>{book.name}</h2>
      <p>Category: {book.category}</p>
      <p>Price: ₹{book.price}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default SingleBook;