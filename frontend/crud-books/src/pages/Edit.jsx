import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Edit = () => {
    const [book, setBook] = useState({
        title: '',
        desc: '',
        price: null,
        cover: '',
    });

    const navigate = useNavigate();
    const location = useLocation();

    const bookId = location.pathname.split("/")[2];


    const handleChange = (e) => {
        setBook(prev => ({...prev, [e.target.name]: e.target.value}))
        console.log(book);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8080/books/" + bookId, book);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='form'>
            <h1>Edit Book</h1>
            <input type="text" placeholder='title' onChange={handleChange} name='title' />
            <input type="text" placeholder='desc' onChange={handleChange} name='desc'/>
            <input type="number" placeholder='price' onChange={handleChange} name='price'/>
            <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>
            <button className='formButton' onClick={handleClick}>Edit book</button>
        </div>
    )
}

export default Edit