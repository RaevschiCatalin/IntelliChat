"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAxios } from "@/context/AxiosContext";
import jwtDecode from 'jwt-decode';

const VerifyEmail = () => {
    const [message, setMessage] = useState("");
    const router = useRouter();
    const { token, getAUTH } = useAxios();
    console.log(token)
    useEffect(() => {
        if (token) {
            try {
                // Decode the token
                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken);

                // Extract email from `sub` field
                const email = decodedToken.sub;

                if (email) {
                    // Check email verification status
                    checkVerificationStatus(email);
                } else {
                    setMessage("Email not found in token.");
                }
            } catch (error) {
                setMessage("Failed to decode token.");
            }
        } else {
            setMessage("Token is missing.");
        }
    }, [token]);

    const checkVerificationStatus = async (email) => {
        try {
            const response = await getAUTH(`/api/auth/check-email?token=${encodeURIComponent(email)}`);
            const { isVerified } = response.data;  // Assuming the response has `isVerified` field
            if (isVerified) {
                setMessage("Email verified successfully. Your account is now activated.\n Redirecting to login page...");
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } else {
                setMessage("Email is not verified or token is invalid.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    const handleSubmit = async () => {
        if (token) {
            try {
                // Decode the token and extract email
                const decodedToken = jwtDecode(token);
                const email = decodedToken.sub;
                if (email) {
                    await checkVerificationStatus(email);
                } else {
                    setMessage("Email not found in token.");
                }
            } catch (error) {
                setMessage("Failed to decode token.");
            }
        } else {
            setMessage("Token is missing.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">
                    {message ? message : "Check your email address"}
                </h1>
                {!message && (
                    <>
                        <h2 className="text-center text-gray-600 mb-4">
                            We've sent you an email with a link to verify your account.
                        </h2>
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full"
                        >
                            I got my link
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
