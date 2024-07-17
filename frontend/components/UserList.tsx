//@ts-nocheck
"use client"
import { useEffect, useState } from 'react';
import userService from "@/app/userService";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [editUserData, setEditUserData] = useState({ username: '', email: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await userService.getAllUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await userService.deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Failed to delete user:', error);
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
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUserData({ ...editUserData, [name]: value });
    };

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <div className="user-list" key={user.id}>
                        {editUserId === user.id ? (
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    value={editUserData.username}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={editUserData.email}
                                    onChange={handleInputChange}
                                />
                                <button onClick={() => handleSave(user.id)}>Save</button>
                                <button onClick={() => setEditUserId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <li>{user.username} - {user.email}</li>
                        )}
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                        {editUserId !== user.id && (
                            <button onClick={() => handleEdit(user)}>Edit</button>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default UserList;