"use client";
import Link from 'next/link';
import { Button } from "../../components/ui/button";
import { Input } from '../../components/ui/input';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAxios } from "../../context/AxiosContext";
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
    const router = useRouter();
    const { postAUTH } = useAxios();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = async (data) => {
        try {
            await postAUTH('/auth/forgot-password', { email: data.email });
            setMessage('If the email address exists, a password reset link has been sent.');
            setIsSuccess(true);
        } catch (error) {
            setMessage('Failed to send password reset link. Please try again.');
            setIsSuccess(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">Forgot Password</h1>
                {message && (
                    <p className={`text-center mb-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input
                            {...register("email", { required: true })}
                            type="email"
                            placeholder="Enter your email address"
                            className="border-gray-300 focus:border-black focus:ring-black"
                        />
                        {errors.email && <p className="text-red-500">Email is required</p>}
                    </div>
                    <Button type="submit" className="w-full">Send Reset Link</Button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Remembered your password? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
