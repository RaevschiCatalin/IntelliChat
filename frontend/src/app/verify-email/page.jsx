
import { Button } from "@/components/ui/button";
import Link from "next/link";


const VerifyEmail = () => {


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg text-center ">
                <h1 className="text-3xl mb-6 font-bold">We have sent you an email verification</h1>
                <h2 className="text-xl mb-6">If you confirmed it, click the button below and log into your account</h2>
                <Button>
                    <Link href="/login">
                        Login
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default VerifyEmail;
