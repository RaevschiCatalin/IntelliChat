//@ts-nocheck
"use client"
import {Button} from "@/components/ui/button"
import {useState} from "react";
import AddUser from "@/components/AddUser";
import SearchUser from "@/components/SearchUser";
import UserList from "@/components/UserList";


export default function Admin() {
    const [show, setShow] = useState(false);
    const toggleUserList = () => {
        setShow(!show);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="main-container">
                <AddUser/>
                <SearchUser/>
                <button onClick={toggleUserList}>
                    {show ? "Hide" : "Show"}
                </button>
                {show && <UserList/>}
            </div>
        </main>
    );
}
