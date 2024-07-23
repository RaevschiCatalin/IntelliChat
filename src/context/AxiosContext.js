"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from "@/lib/axiosInstance";

const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const loginAUTH = async (email, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            console.log('Login response:', response.data);
            const { access_token } = response.data;
            localStorage.setItem('jwtToken', access_token);
            setToken(access_token);
        } catch (error) {
            console.error('Login failed:', error.response.data);
            throw error;
        }
    };

    const registerAUTH = async (username, email, password) => {
        try {
            await axiosInstance.post('/auth/register', { username, email, password });
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logoutAUTH = () => {
        localStorage.removeItem('jwtToken');
        setToken(null);
    };

    const getAUTH = async (url) => {
        return await axiosInstance.get(url);
    };

    const postAUTH = async (url, data) => {
        return await axiosInstance.post(url, data);
    };

    const putAUTH = async (url, data) => {
        return await axiosInstance.put(url, data);
    };

    const deleteAUTH = async (url) => {
        return await axiosInstance.delete(url);
    };

    return (
        <AxiosContext.Provider value={{ token, loginAUTH, registerAUTH, logoutAUTH, getAUTH, postAUTH, putAUTH, deleteAUTH }}>
            {children}
        </AxiosContext.Provider>
    );
};

export const useAxios = () => {
    return useContext(AxiosContext);
};
