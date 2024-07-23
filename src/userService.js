
import axios from 'axios';


const API_URL = 'http://localhost:8080/api/users';


const getAllUsers = () => {
    return axios.get(API_URL);
}
const getUserById = (id) => {
    return axios.get(API_URL + '/' + id);
}
const createUser = (user) => {
    return axios.post(API_URL, user);
}
const deleteUser = (id) => {
    return axios.delete(API_URL + '/' + id);
}
const updateUser = (id, user) => {
    return axios.put(API_URL + '/' + id, user);
}

export const fetchUserDataByIdentifier = async (identifier) => {
    try {
        const response = await axios.get(`${API_URL}${identifier}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data: ", error);
        return null;
    }
};


export default {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
}