// src/components/Navbar.jsx
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Navbar = () => {
    return (
        <nav className="py-4 mb-4 fixed w-full top-0 left-0 bg-transparent backdrop-blur-md z-50">
            <div className="container mx-auto flex items-center justify-between px-4">

                <div className="text-2xl font-bold text-gray-900">
                    <Link href="/">MyLogo</Link>
                </div>

                <div className="hidden md:flex space-x-6 ">
                    <Link href="#home"
                          className="text-gray-900 hover:underline  transition">Home</Link>
                    <Link href="#about"
                          className="text-gray-900 hover:underline transition">About</Link>
                    <Link href="#services"
                          className="text-gray-900 hover:underline  transition">Services</Link>
                    <Link href="#contact"
                          className="text-gray-900 hover:underline transition">Contact</Link>
                </div>

                <div className="hidden md:flex space-x-4">
                    <Link href="/login">
                        <Button
                            className="bg-slate100 text-black rounded-3xl border-2 border-black hover:bg-black hover:text-white">Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button
                            className="rounded-3xl hover:bg-slate-100 hover:text-black border-2 border-black">Register</Button>
                    </Link>
                </div>

                <button className="md:hidden text-gray-900">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                </button>
            </div>

            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg mt-2 rounded-md">
                <Link href="#home" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Home</Link>
                <Link href="#about" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">About</Link>
                <Link href="#services" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Services</Link>
                <Link href="#contact" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Contact</Link>
                <div className="p-4">
                    <Link href="/login">
                        <Button className="w-full">Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button className="w-full mt-2">Register</Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;
