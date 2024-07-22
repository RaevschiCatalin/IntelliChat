"use client"
import { useState, useCallback } from 'react';
import userService from "@/userService";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';


const fetchUser = async (id) => {
    const response = await userService.getUserById(id);
    return response.data;
};

const SearchUser = () => {
    const [id, setId] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const { data: foundUser, error, isError, isFetching } = useQuery({
        queryKey: ['user', id],
        queryFn: () => fetchUser(id),
        enabled: !!id,
        keepPreviousData: true,
    });

    const debouncedSearch = useCallback(
        debounce((value) => {
            setId(value);
        }, 800),
        []
    );

    const onChange = (e) => {
        const { value } = e.target;
        setSearchInput(value);
        debouncedSearch(value);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 space-y-4">
            <h1 className="text-2xl font-semibold mb-4 text-gray-900 text-center">Search User by Email</h1>
            {isError && (
                <Alert variant="destructive" className="mb-4">
                    {error.message}
                </Alert>
            )}
            <div className="space-y-4">
                <Input
                    onChange={onChange}
                    value={searchInput}
                    type="text"
                    placeholder="Enter user email"
                />
                <div className="flex justify-center">
                    <Button type="button" onClick={() => debouncedSearch(searchInput)} disabled={isFetching}>
                        {isFetching ? 'Searching...' : 'Search'}
                    </Button>
                </div>
                {foundUser && !isFetching && (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">User Details</h2>
                        <p>Username: {foundUser.username}</p>
                        <p>Email: {foundUser.email}</p>
                        <p>Profile Created at: {foundUser.createdAt}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchUser;
