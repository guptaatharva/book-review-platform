import React , {useEffect, useState} from "react";
import { fetchBooks } from "../api/api";
import RegisterPage from "./RegisterPage";

const BookList=() =>{
    const [books, setBooks] = useState([]);
    useEffect(()=>{
        const getBooks = async()=>{
            try{
                const response = await fetchBooks();
                setBooks(response.data);
            }catch(error){
                console.error('Failed to fetch books', error);
            }
        };
        getBooks();
    },[]);

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map((book)=>(
                    <li key={book._id}>{book.title}-{book.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default RegisterPage;