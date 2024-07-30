import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAxios } from '@/context/AxiosContext';
import LoadingInfinity from "@/components/LoadingInfinity";

const withAuth = (WrappedComponent) => {
    const Wrapper = (props) => {
        const { token } = useAxios(); // or however you get the token
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const checkAuth = async () => {
                if (!token) {
                    router.push('/login'); // Redirect to login if not authenticated
                } else {
                    setLoading(false); // Proceed to render if authenticated
                }
            };

            checkAuth();
        }, [token, router]);

        if (loading) {
            return <LoadingInfinity/>;
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
