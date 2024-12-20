"use client";
import { useEffect, useState } from 'react';
import { useAxios } from '../../context/AxiosContext';
import LoadingInfinity from "../../components/LoadingInfinity";
import {jwtDecode} from "jwt-decode";



export default function Profile() {
    const { token, getAUTH } = useAxios();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const email = decodedToken.sub;
            console.log(email);
            const fetchUserData = async () => {
                try {
                    const response = await getAUTH(`/users/search?email=${email}`);
                    console.log(response);
                    setUserData(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                }
            };
            fetchUserData();
        }
    }, [token, getAUTH]);

    if (loading) {
        return <LoadingInfinity />;
    }

    if (!userData) {
        return <div>No user data found.</div>;
    }

    return (
        <div className="flex flex-col items-center align-middle justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-4">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6  text-center">User Profile</h1>
                <div className="p-6 bg-gray-50 border border-gray-300 rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Username: {userData.username}</h2>
                    <p className="text-gray-700 mb-2"><span className="font-bold">Email:</span> {userData.email}</p>
                    <p className="text-gray-700 mb-2"><span className="font-bold">Created At:</span> {new Date(userData.createdAt).toLocaleDateString()}</p>
                    <p className="text-gray-700 mb-2"><span className="font-bold">Updated At:</span> {new Date(userData.updatedAt).toLocaleDateString()}</p>
                    <div className="mt-6">
                        <button
                            className="w-full py-3 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-black border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => window.location.reload()}
                        >
                            Refresh Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
