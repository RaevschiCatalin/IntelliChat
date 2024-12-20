"use client";
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from "../../components/ui/button";
import { Input } from '../../components/ui/input';
import { useRouter } from 'next/navigation';
import { useAxios } from "../../context/AxiosContext";

const Register = () => {
    const router = useRouter();
    const { registerAUTH } = useAxios();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await registerAUTH(data.username, data.email, data.password);
            router.push('/verify-email');
        } catch (error) {
            console.error('Registration error:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">Create an Account</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input
                            {...register("username", { required: true })}
                            type="text"
                            placeholder="Username"
                            className="border-gray-300 focus:border-black focus:ring-black"
                        />
                        {errors.username && <p className="text-red-500">Username is required</p>}
                    </div>
                    <div>
                        <Input
                            {...register("email", { required: true })}
                            type="email"
                            placeholder="Email"
                            className="border-gray-300 focus:border-black focus:ring-black"
                        />
                        {errors.email && <p className="text-red-500">Email is required</p>}
                    </div>
                    <div>
                        <Input
                            {...register("password", { required: true })}
                            type="password"
                            placeholder="Password"
                            className="border-gray-300 focus:border-black focus:ring-black"
                        />
                        {errors.password && <p className="text-red-500">Password is required</p>}
                    </div>
                    <Button type="submit" className="w-full">Register</Button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
