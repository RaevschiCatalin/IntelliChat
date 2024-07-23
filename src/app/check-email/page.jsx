"use client";
import Link from 'next/link';

const CheckEmail = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">Check Your Email</h1>
                <p className="text-center text-gray-700 mb-4">
                    If an account with the email you provided exists, you will receive an email with a link to reset your password.
                </p>
                <p className="text-center text-gray-700 mb-4">
                    Please check your spam or junk folder if you don't see the email in your inbox.
                </p>
                <div className="text-center">
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckEmail;
