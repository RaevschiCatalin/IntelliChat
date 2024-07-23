"use client";
import { useState } from 'react';
import userService from "@/userService";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchUsers = async () => {
    const response = await userService.getAllUsers();
    return response.data;
};

const UserList = () => {
    const queryClient = useQueryClient();
    const [editUserId, setEditUserId] = useState(null);
    const [editUserData, setEditUserData] = useState({ username: '', email: '' });
    const [error, setError] = useState("");

    const { data: users = [], isError, error: fetchError } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        onError: (error) => {
            console.error('Failed to fetch users:', error);
            setError('Failed to fetch users.');
        },
    });

    const deleteUser = useMutation({
        mutationFn: userService.deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error('Failed to delete user:', error);
            setError('Failed to delete user.');
        }
    });

    const updateUser = useMutation({
        mutationFn: ({ id, data }) => userService.updateUser(id, data),
        onSuccess: () => {
            setEditUserId(null);
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error('Failed to update user:', error);
            setError('Failed to update user.');
        }
    });

    const handleDelete = (id) => {
        deleteUser.mutate(id);
    };

    const handleEdit = (user) => {
        setEditUserId(user.id);
        setEditUserData({ username: user.username, email: user.email });
    };

    const handleSave = (id) => {
        updateUser.mutate({ id, data: editUserData });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUserData({ ...editUserData, [name]: value });
    };

    if (isError) {
        return <Alert variant="destructive">{fetchError.message}</Alert>;
    }

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
