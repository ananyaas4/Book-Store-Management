import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const BookDetails = ()=>{
    const {id} = useParams();
    const [book, setBook] = useState(null);
    useEffect(()=>{
        axios.get(`https://iris-chisel-mimosa.glitch.me/books/${id}`).then((res)=>setBooks(res.data));
    },[id]);
    if(!book) return <h2>Loading...</h2>;
    return (
        <div>
            <h2>{book.name}</h2>
            <p>Category: {book.category}</p>
            <p>Price: {book.price}</p>
        </div>
    );
};
export default BookDetails;