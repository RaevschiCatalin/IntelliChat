"use client";
import { useState } from 'react';
import { getAiResponse } from "@/app/chat/chat";
import { motion } from 'framer-motion';
import LoadingDots from "@/components/LoadingDots";

export default function Chat() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse('');

        console.log('Submitting input:', input);

        const onData = (data) => {
            console.log('Received data:', data);
            setResponse(prev => prev + data);
        };

        const onComplete = () => {
            console.log('Response complete.');
            setLoading(false);
        };

        const onError = (error) => {
            console.error('Error fetching AI response:', error);
            setLoading(false);
        };

        await getAiResponse(input, onData, onComplete, onError);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-4">
            <div className="w-4/5 bg-white p-0 mt-12 mb-12 rounded-lg shadow-lg">
                <h1 className="text-2xl font-extrabold mb-4 text-center mt-4">Ask IntelliChat</h1>
                <div className="flex flex-col h-[80vh] border border-gray-300 rounded-lg overflow-y-auto">
                    <div className="flex-1 p-4 space-y-4">
                        {/* Displaying response */}
                        {response && (
                            <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg text-left">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">IntelliChat:</h2>
                                <p>{response}</p>
                            </div>
                        )}
                        {/* Loading animation */}
                        {loading && (
                            <LoadingDots />
                        )}
                    </div>
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 border-t border-gray-300">
                        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your question
                        </label>
                        <input
                            id="question"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your question here..."
                            className="block w-full p-3 border bg-white border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
                            autoComplete="off"
                            spellCheck="false"
                        />
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Ask
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
