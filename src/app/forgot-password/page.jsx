"use client";
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useAxios } from "@/context/AxiosContext";
import Link from "next/link";


const ForgotPassword = () => {
    const router = useRouter();
    const { postAUTH } = useAxios();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await postAUTH('/auth/forgot-password', { email: data.email });
            router.push('/check-email');
        } catch (error) {
            console.error('Forgot password error:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">Forgot Your Password?</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input
                            {...register("email", { required: true })}
                            type="email"
                            placeholder="Enter your email"
                            className="border-gray-300 focus:border-black focus:ring-black"
                        />
                        {errors.email && <p className="text-red-500">Email is required</p>}
                    </div>
                    <Button type="submit" className="w-full">Send Reset Link</Button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Remember your password? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
