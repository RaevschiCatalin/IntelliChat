//@ts-nocheck
"use client"
import { useState } from 'react';
import userService from "@/userService";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const AddUser = ({ onUserAdded }) => {
    const [newUser, setNewUser] = useState({ username: '', email: '' });
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.createUser(newUser);
            setNewUser({ username: '', email: '' });
            setError(null);
            onUserAdded();
        } catch (error) {

            console.error('Failed to add user:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Add User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username:</label>
                    <Input
                        type="text"
                        name="username"
                        value={newUser.username}
                        onChange={handleInputChange}
                        placeholder="Enter username"
                        required
                        className="mt-1"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <Input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        required
                        className="mt-1"
                    />
                </div>
                <Button type="submit" className="w-full">
                    Add User
                </Button>
                {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </form>
        </div>
    );
};

export default AddUser;
