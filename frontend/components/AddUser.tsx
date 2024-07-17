//@ts-nocheck
"use client"
import { useState } from 'react';
import userService from "@/app/userService";


const AddUser = ({ onUserAdded:any }) => {
    const [newUser, setNewUser] = useState({ username: '', email: '' });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userService.createUser(newUser);
            setNewUser({ username: '', email: '' });
            setError(null);
            onUserAdded();
        } catch (error) {
            setError('Failed to add user.');
            console.error('Failed to add user:', error);
        }
    };

    return (
        <div>
            <h1>Add User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={newUser.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Add User</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default AddUser;