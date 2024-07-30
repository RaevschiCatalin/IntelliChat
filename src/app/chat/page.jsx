"use client";
import { useState } from 'react';
import { getAiResponse, stopAiResponse } from "@/app/chat/chat"; // Update import if needed
import useAuth from '@/hooks/useAuth';
import LoadingInfinity from "@/components/LoadingInfinity";
import LoadingDots from "@/components/LoadingDots";

export default function Chat() {
    const { loading: authLoading, isAuthenticated } = useAuth();
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [temperature, setTemperature] = useState(0.7); // Default temperature
    const [isAsking, setIsAsking] = useState(false); // Track asking state

    if (authLoading) {
        return <LoadingInfinity />;
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
                <div className="text-center text-2xl font-bold text-red-600">
                    You need to be logged in to access this page.
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse('');
        setIsAsking(true);

        console.log('Submitting input:', input);

        const onData = (data) => {
            console.log('Received data:', data);
            setResponse(prev => prev + data);
        };

        const onComplete = () => {
            console.log('Response complete.');
            setLoading(false);
            setIsAsking(false);
        };

        const onError = (error) => {
            console.error('Error fetching AI response:', error);
            setLoading(false);
            setIsAsking(false);
        };

        setInput('');
        await getAiResponse(input, temperature, onData, onComplete, onError);
    };

    const handleStop = async () => {
        // Implement stop functionality
        await stopAiResponse(); // Ensure stopAiResponse function is implemented in chat.js
        setLoading(false);
        setIsAsking(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-4">
            <div className="w-4/5 bg-white p-0 mt-12 mb-12 rounded-lg shadow-lg">
                <h1 className="text-2xl font-extrabold mb-4 text-center mt-4">Ask IntelliChat</h1>
                <div className="flex flex-col h-[80vh] border border-gray-300 rounded-lg overflow-y-auto">
                    <div className="flex-1 p-4 space-y-4">
                        {response && (
                            <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg text-center">
                                <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                                    IntelliChat:
                                </h2>
                                <p className="text-lg">{response}</p>
                            </div>
                        )}
                        {loading && <LoadingDots />}
                    </div>
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 border-t border-gray-300 flex flex-col">
                        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your question
                        </label>
                        <div className="flex items-center space-x-2 mb-4">
                            <input
                                id="question"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your question here..."
                                className="block w-full p-3 border bg-gray-200 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                autoComplete="off"
                                spellCheck="false"
                            />
                            <button
                                type="submit"
                                className={`btn ${isAsking ? 'btn-disabled' : 'btn'}`}
                            >
                                Ask
                            </button>
                            {isAsking && (
                                <button
                                    type="button"
                                    onClick={handleStop}
                                    className="btn btn-error"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <div className="flex justify-center space-x-2">
                            <button
                                type="button"
                                onClick={() => setTemperature(0.3)}
                                className={`btn ${temperature === 0.3 ? 'btn-active' : 'btn-outline'}`}
                            >
                                Precise
                            </button>
                            <button
                                type="button"
                                onClick={() => setTemperature(0.7)}
                                className={`btn ${temperature === 0.7 ? 'btn-active' : 'btn-outline'}`}
                            >
                                Balanced
                            </button>
                            <button
                                type="button"
                                onClick={() => setTemperature(1.0)}
                                className={`btn ${temperature === 1.0 ? 'btn-active' : 'btn-outline'}`}
                            >
                                Creative
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
