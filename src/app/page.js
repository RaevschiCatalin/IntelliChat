"use client";
import { useState, useEffect } from 'react';
import { useAxios } from '@/context/AxiosContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
    const { token } = useAxios();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-4">
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    <motion.span
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, type: 'spring', stiffness: 300 }}
                    >
                        Welcome to AI Chat!
                    </motion.span>
                </h1>
                <p className="text-lg text-gray-700 mb-4">
                    Discover the future of conversation with our AI-powered chat service.
                </p>
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Get Started
                    </h2>
                    <p className="text-gray-600 mb-8">
                        {isLoggedIn ? (
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Button className="rounded-3xl hover:text-black hover:bg-white transition duration-500 ease-in-out">
                                    <Link href="/chat" className="hover:underline text-xl">
                                        Start Chatting
                                    </Link>
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Button className="rounded-3xl hover:text-black hover:bg-white transition duration-500 ease-in-out">
                                        <Link href="/login" className="hover:underline text-xl">
                                            Login
                                        </Link>
                                    </Button>
                                </motion.div>
                                <span className="mx-2 text-lg text-gray-600">or</span>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Button className="rounded-3xl hover:text-black hover:bg-white transition duration-500 ease-in-out">
                                        <Link href="/register" className="text-xl hover:underline">
                                            Register
                                        </Link>
                                    </Button>
                                </motion.div>
                            </div>
                        )}
                    </p>
                </motion.div>
                <motion.div
                    className="absolute bottom-6 right-6 text-gray-600 text-sm"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: 1 }}
                >
                    <p>Made with 💙 by Your Team</p>
                </motion.div>
            </motion.div>
        </div>
    );
}
