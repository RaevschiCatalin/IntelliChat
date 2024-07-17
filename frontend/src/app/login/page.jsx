// src/app/login/page.jsx
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

const Login = () => {
    const handleSubmit = async (e) => {

    }

    const onSubmit = async (data) => {

        console.log(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">Login to Your Account</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input
                            type="email"
                            placeholder="Email"

                            className="border-gray-300 focus:border-black focus:ring-black"
                        />

                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"

                            className="border-gray-300 focus:border-black focus:ring-black"
                        />

                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
