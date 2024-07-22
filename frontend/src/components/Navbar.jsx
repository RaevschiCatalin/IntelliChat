"use client"
import React from 'react';
import { useAxios } from '@/context/AxiosContext';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Logo from "@/assets/logo.svg";

const Navbar = () => {
    const { token, logoutAUTH } = useAxios();
    const router = useRouter();
    const handleLogout = () => {
        logoutAUTH();
        router.push('/');
    };

    return (
        <nav className="py-4 mb-6 fixed w-full top-0 left-0 bg-transparent z-50">
            <div className="container mx-auto flex items-center justify-between px-4">
                <div className="text-2xl mx-3 font-bold text-gray-900">
                    <Link href="/">
                    <Image src={Logo} width={40} height={40} alt={"Logo"}/>
                    </Link>
                </div>
                <div className="hidden md:flex space-x-6">
                    <Link href="/admin" className="text-gray-900 hover:underline hover:font-bold transition">Admin</Link>
                    <Link href="#about" className="text-gray-900 hover:underline hover:font-bold transition">About</Link>
                    <Link href="#services" className="text-gray-900 hover:underline hover:font-bold transition">Services</Link>
                    <Link href="#contact" className="text-gray-900 hover:underline hover:font-bold transition">Contact</Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    {token ? (
                        <>
                            <Link href="/profile">
                                <Button className="custom-button">
                                    <svg className="w-4/5 h-4/5" fill="none" stroke="var(--svg-stroke-color)"
                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 14.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zM21 21v-1a4.5 4.5 0 0 0-4.5-4.5H6.5A4.5 4.5 0 0 0 2 20v1"/>
                                    </svg>
                                </Button>
                            </Link>
                            <Button onClick={handleLogout} className="rounded-3xl border-2 border-black hover:bg-slate-100 hover:text-black">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button className="bg-slate100 text-black rounded-3xl border-2 border-black hover:bg-black hover:text-white">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button className="rounded-3xl hover:bg-slate-100 hover:text-black border-2 border-black">Register</Button>
                            </Link>
                        </>
                    )}
                </div>
                <button className="md:hidden text-gray-900">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;