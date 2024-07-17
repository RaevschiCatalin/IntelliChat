//@ts-nocheck
"use client"
import { useState } from 'react';
import userService from "@/userService";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';

const SearchUser = () => {
    const [id, setId] = useState('');
    const [foundUser, setFoundUser] = useState(null);
    const [error, setError] = useState(null);

    const searchUser = async () => {
        try {
            const response = await userService.getUserById(id);
            setFoundUser(response.data);
        } catch (e) {
            console.error(e);
            setFoundUser(null);
            setError('Failed to find user.');
        }
    };

    const onChange = (e) => {
        setId(e.target.value);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 space-y-4">
            <h1 className="text-2xl font-semibold mb-4 text-gray-900 text-center">Search User by Id</h1>
            {error && (
                <Alert variant="destructive" className="mb-4">
                    {error}
                </Alert>
            )}
            <div className="space-y-4">
                <Input
                    onChange={onChange}
                    value={id}
                    type="text"
                    placeholder="Enter user ID"
                />
                <div className="flex justify-center">
                    <Button type="button" onClick={searchUser}>Search</Button>
                </div>
                {foundUser && (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">User Details</h2>
                        <p>Username: {foundUser.username}</p>
                        <p>Email: {foundUser.email}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchUser;
