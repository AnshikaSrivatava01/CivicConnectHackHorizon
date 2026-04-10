import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api/complaints', 
});

// Fetch all complaints for the logged-in user
export const getUserComplaints = async (userId) => {
    try {
        const response = await API.get(`/user/${userId}`); 
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error fetching reports";
    }
};

export const getAllComplaints = async () => {
    try {
        const response = await API.get('/'); 
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error fetching reports";
    }
};