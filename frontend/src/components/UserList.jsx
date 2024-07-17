//@ts-nocheck
"use client"
import { useEffect, useState } from 'react';
import userService from "@/userService";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';



const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [editUserData, setEditUserData] = useState({ username: '', email: '' });
    const [error, setError] = useState("");


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await userService.getAllUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setError('Failed to fetch users.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await userService.deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Failed to delete user:', error);
            setError('Failed to delete user.');
        }
    };

    const handleEdit = (user) => {
        setEditUserId(user.id);
        setEditUserData({ username: user.username, email: user.email });
    };

    const handleSave = async (id) => {
        try {
            await userService.updateUser(id, editUserData);
            setEditUserId(null);
            fetchUsers();
        } catch (error) {
            console.error('Failed to update user:', error);
            setError('Failed to update user.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUserData({ ...editUserData, [name]: value });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
            <h1 className="text-2xl font-semibold mb-4 text-gray-900">User List</h1>
            {error && (
                <Alert variant="destructive" className="mb-4">
                    {error}
                </Alert>
            )}
            <ul className="space-y-4">
                {users.map(user => (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm border border-gray-200" key={user.id}>
                        {editUserId === user.id ? (
                            <div className="space-y-2 flex-1">
                                <Input
                                    type="text"
                                    name="username"
                                    value={editUserData.username}
                                    onChange={handleInputChange}
                                    placeholder="Username"
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    value={editUserData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                />
                                <div className="flex gap-2">
                                    <Button type="button" onClick={() => handleSave(user.id)}>Save</Button>
                                    <Button type="button" onClick={() => setEditUserId(null)}>Cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700">{user.username} - {user.email}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button type="button" onClick={() => handleDelete(user.id)}>Delete</Button>
                                    <Button type="button" onClick={() => handleEdit(user)}>Edit</Button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
