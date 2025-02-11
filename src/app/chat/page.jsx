"use client";
import { useState } from "react";
import { getAiResponse } from "../chat/chat";
import useAuth from "../../hooks/useAuth";
import LoadingInfinity from "../../components/LoadingInfinity";
import LoadingDots from "../../components/LoadingDots";

export default function Chat() {
    const { loading: authLoading, isAuthenticated } = useAuth();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [temperature, setTemperature] = useState(0.7);
    const [isAsking, setIsAsking] = useState(false);
    const [currentResponse, setCurrentResponse] = useState(null);

    if (authLoading) return <LoadingInfinity />;
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
        if (isAsking) return;
        setLoading(true);
        setIsAsking(true);

        setMessages((prev) => [...prev, { type: "user", text: input }]);

        const onData = (data) => {
            setMessages((prev) => {
                if (prev.length === 0 || prev[prev.length - 1].type !== "ai") {
                    return [...prev, { type: "ai", text: data }];
                }
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = data;
                return newMessages;
            });
        };

        const onComplete = () => {
            setLoading(false);
            setIsAsking(false);
            setCurrentResponse(null);
        };

        const onError = (error) => {
            console.error("Error fetching AI response:", error);
            setLoading(false);
            setIsAsking(false);
            setCurrentResponse(null);
        };

        setInput("");
        const response = await getAiResponse(input, temperature, onData, onComplete, onError);
        setCurrentResponse(response); // Store the response object
    };

    const handleStop = () => {
        currentResponse?.stop();
        setIsAsking(false);
        setLoading(false);
        setCurrentResponse(null);
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-6">
            <div className="w-3/4 max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col h-[85vh]">
                {/* Header */}
                <header className="p-6 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-center text-purple-600">Ask IntelliChat</h1>
                </header>

                {/* Chat Messages */}
                <main className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`px-4 py-3 max-w-[75%] rounded-xl break-words ${
                                    msg.type === "user"
                                        ? "bg-purple-200 text-purple-800"
                                        : "bg-green-200 text-green-800"
                                }`}
                            >
                                <p className="text-lg">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {loading && <LoadingDots />}
                </main>

                {/* Input Area */}
                <footer className="p-6 border-t border-gray-200 bg-white">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        {/* Temperature Preference (Swapped with Send Button) */}
                        <div className="flex justify-center space-x-2">
                            <button
                                type="button"
                                onClick={() => setTemperature(0.1)}
                                className={`btn rounded-full text-white ${
                                    temperature === 0.1 ? "bg-purple-600" : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            >
                                Precise
                            </button>
                            <button
                                type="button"
                                onClick={() => setTemperature(0.7)}
                                className={`btn rounded-full text-white ${
                                    temperature === 0.7 ? "bg-purple-600" : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            >
                                Balanced
                            </button>
                            <button
                                type="button"
                                onClick={() => setTemperature(0.9)}
                                className={`btn rounded-full text-white ${
                                    temperature === 0.9 ? "bg-purple-600" : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            >
                                Creative
                            </button>
                        </div>

                        {/* Chat Input */}
                        <div className="flex items-center space-x-2">
                            <input
                                id="question"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your question here..."
                                className="input input-bordered w-full rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300"
                                autoComplete="off"
                                spellCheck="false"
                            />
                            <button
                                type="submit"
                                onClick={isAsking ? handleStop : handleSubmit}
                                className={`btn transition-all duration-300 text-white px-6 ${
                                    isAsking
                                        ? "bg-red-600 hover:bg-red-700 w-14 h-14 rounded-full"
                                        : "bg-purple-600 hover:bg-purple-700 rounded-full"
                                }`}
                            >
                                {isAsking ? "Stop" : "Send"}
                            </button>
                        </div>


                        <button
                            type="button"
                            onClick={() => setMessages([])}
                            className="btn btn-outline w-full rounded-full border-gray-400 text-gray-600 hover:border-gray-600 hover:text-black"
                        >
                            Clear Chat
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );

}
