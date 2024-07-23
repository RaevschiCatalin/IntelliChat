// ./src/components/ResetPasswordForm.jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAxios } from '@/context/AxiosContext';

const ResetPasswordForm = ({ token }) => {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { postAUTH } = useAxios();
    const router = useRouter();

    const handleResetPassword = async () => {
        try {
            await postAUTH('/auth/reset-password', { token, new_password: newPassword });
            setSuccess(true);
        } catch (err) {
            setError('Failed to reset password. Please try again.');
        }
    };

    return (
        <div>
            {success ? (
                <p className="text-green-500">Password reset successful. You can now log in.</p>
            ) : (
                <div>
                    <Input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mb-4"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <Button onClick={handleResetPassword} className="w-full">Reset Password</Button>
                </div>
            )}
        </div>
    );
};

export default ResetPasswordForm;
