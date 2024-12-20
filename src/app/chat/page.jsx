"use client";
import { useState } from 'react';
import { getAiResponse, stopAiResponse } from "../chat/chat";
import useAuth from '../../hooks/useAuth';
import LoadingInfinity from "../../components/LoadingInfinity";
import LoadingDots from "../../components/LoadingDots";

export default function Chat() {
    const { loading: authLoading, isAuthenticated } = useAuth();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [temperature, setTemperature] = useState(0.7);
    const [isAsking, setIsAsking] = useState(false);

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
        if(isAsking) return;
        setLoading(true);
        setIsAsking(true);

        setMessages(prevMessages => [...prevMessages, { type: 'user', text: input }]);

        const onData = (data) => {
            setMessages(prevMessages => {
                if (prevMessages.length === 0 || prevMessages[prevMessages.length - 1].type !== 'ai') {
                    return [...prevMessages, { type: 'ai', text: data }];
                }
                const newMessages = [...prevMessages];
                newMessages[newMessages.length - 1].text += data;
                return newMessages;
            });
        };

        const onComplete = () => {
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
        await stopAiResponse();
        setLoading(false);
        setIsAsking(false);
    };

    const handleClearChat = () => {
        setMessages([]);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-4">
            <div className="w-4/5 bg-gray-100 border-t border-gray-300 p-0 mt-12 mb-12 rounded-lg shadow-lg flex flex-col h-[80vh]">
                <h1 className="text-2xl font-extrabold mb-4 text-center mt-4">Ask IntelliChat</h1>
                <div className="flex-1 flex flex-col border border-gray-300 rounded-lg overflow-hidden">
                    <div className="flex-1 p-4 bg-white space-y-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-4 rounded-lg max-w-3/5 ${msg.type === 'user' ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'}`}>
                                    <p className="text-lg">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {loading && <LoadingDots />}
                    </div>
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 border-t border-gray-300 flex flex-col space-y-4">
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
                                className={`btn ${isAsking ? 'btn-disabled' : 'btn-outline'}`}
                                disabled={isAsking}
                            >
                               <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M4.02 42l41.98-18-41.98-18-.02 14 30 4-30 4z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
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
                                onClick={() => setTemperature(0.1)}
                                className={`btn ${temperature === 0.1 ? 'btn-active text-white' : 'btn-outline text-black'}`}
                            >
                                Precise
                            </button>
                            <button
                                type="button"
                                onClick={() => setTemperature(0.7)}
                                className={`btn ${temperature === 0.7 ? 'btn-active text-white' : 'btn-outline text-black'}`}
                            >
                                Balanced
                            </button>
                            <button
                                type="button"
                                onClick={() => setTemperature(0.9)}
                                className={`btn ${temperature === 0.9 ? 'btn-active text-white' : 'btn-outline text-black'}`}
                            >
                                Creative
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={handleClearChat}
                            className="btn btn-outline w-full mt-2"
                        >
                            Clear Chat
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
