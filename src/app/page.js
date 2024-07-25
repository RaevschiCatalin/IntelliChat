"use client";
import { useState } from 'react';
import { useAxios } from '@/context/AxiosContext';

export default function Home() {
    const { getLlamaResponse } = useAxios();
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await getLlamaResponse(input);
            setResponse(result);
        } catch (error) {
            console.error('Error fetching Llama response:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Ask Llama</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your question
                </label>
                <input
                    id="question"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question here..."
                    className="block w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
            {response && (
                <div className="mt-6 w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Response:</h2>
                    <p className="p-4 bg-gray-50 border border-gray-300 rounded-lg">{response}</p>
                </div>
            )}
        </div>
    );
}
