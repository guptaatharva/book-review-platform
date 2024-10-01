import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = async(email, password)=>{
    return axios.post(`${API_URL}/auth/login`, {email , password});
};

export const register = async (username , email, password)=>{
    return axios.post(`${API_URL}/auth/register`, {username , email , password});
};

export const fetchBooks = async ()=> {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/books`, {
        headers: { Authorization: `Bearer ${token}`}
    });
};