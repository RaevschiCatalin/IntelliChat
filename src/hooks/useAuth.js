import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAxios } from '@/context/AxiosContext';

const useAuth = () => {
    const { token } = useAxios(); // Access token from context or any other method
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [attempts, setAttempts] = useState(0);
    const maxAttempts = 3;
    const delay = 1000; // Delay in ms between checks

    useEffect(() => {
        const checkAuth = async () => {
            if (attempts < maxAttempts) {
                // Wait for a delay before checking
                setTimeout(() => {
                    if (!token) {
                        setAttempts(prev => prev + 1);
                        checkAuth(); // Retry check
                    } else {
                        setLoading(false); // Proceed if authenticated
                    }
                }, delay);
            } else {
                // Redirect to login after maximum attempts
                setLoading(true);
                setTimeout(() => {
                    router.push('/login'); // Redirect to login after delay
                }, 2000); // 2-second delay
            }
        };

        checkAuth();
    }, [token, router, attempts]);

    return { loading, isAuthenticated: !!token };
};

export default useAuth;
