import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Books = ()=>{
    const [books, setBooks] = useState([]);
    useEffect(()=>{
        axios.get("https://iris-chisel-mimosa.glitch.me/books").then((res)=>setBooks(res.data));
    },[]);
    return (
        <div>
            <h1>Books</h1>
            {books.map((book)=>(
                <div key={book.id}>
                    <h3>{book.name}</h3>
                    <p>Category: {book.category}</p>
                    <p>Price: {book.price}</p>
                    <Link to={`/books/${book.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    );
};
export default Books;