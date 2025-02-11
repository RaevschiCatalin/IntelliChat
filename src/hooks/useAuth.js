import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAxios } from '../context/AxiosContext';

const useAuth = () => {
    const { token } = useAxios();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [attempts, setAttempts] = useState(0);
    const maxAttempts = 3;
    const delay = 1000;

    useEffect(() => {
        if (token) {
            setLoading(false);
        } else {
            const timeout = setTimeout(() => {
                router.push('/login');
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [token, router]);

    return { loading, isAuthenticated: !!token };
};

export default useAuth;
