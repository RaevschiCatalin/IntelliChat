
"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import SearchUser from "@/components/SearchUser"
import UserList from "@/components/UserList"

export default function Admin() {
    const [show, setShow] = useState(false)
    const toggleUserList = () => {
        setShow(!show)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 pt-16  bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-6">
                <h1 className="text-2xl font-semibold text-gray-800 text-center">Admin Dashboard</h1>

                <div className="flex flex-col space-y-4">
                    <SearchUser />
                </div>

                <div className="flex justify-center">
                    <Button
                        onClick={toggleUserList}
                        type='button'
                    >
                        {show ? "Hide User List" : "Show User List"}
                    </Button>
                </div>

                {show && <UserList />}
            </div>
        </main>
    )
}
