import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api/authority', 
});

// Authority Register API
export const registerAuthority = async (authData) => {
    try {
        const response = await API.post('/register', authData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Registration failed";
    }
};

//  Authority Login API
export const loginAuthority = async (authData) => {
    try {
        const response = await API.post('/login', authData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

//  Get Authority Profile (Optional for now)
export const getAuthorityProfile = async (id) => {
    try {
        const response = await API.get(`/profile/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Could not fetch profile";
    }
};