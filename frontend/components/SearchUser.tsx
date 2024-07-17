//@ts-nocheck
"use client"
import { useState } from "react";
import userService from "@/app/userService";

const SearchUser = () => {
    const [id, setId] = useState('');
    const [foundUser, setFoundUser] = useState(null);

    const searchUser = async () => {
        try {
            const response = await userService.getUserById(id);
            setFoundUser(response.data);
        } catch (e) {
            console.error(e);
            setFoundUser(null);
        }
    };

    const onChange = (e) => {
        setId(e.target.value);
    };


    return (
        <>
            <h1>Search User by Id</h1>
            <input onChange={onChange} value={id} type="text" />
            <button onClick={searchUser}>Search</button>
            {foundUser && (
                <div>
                    <h2>User Details</h2>
                    <p>Username: {foundUser.username}</p>
                    <p>Email: {foundUser.email}</p>
                </div>
            )}
        </>
    );
};

export default SearchUser;