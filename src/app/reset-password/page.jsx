"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/ResetPasswordForm';

const ResetPasswordPage = async () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">Reset Password</h1>
                <ResetPasswordForm token={token} />
            </div>
        </div>
    );
};

export default ResetPasswordPage;
