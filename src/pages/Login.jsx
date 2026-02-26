import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Heart } from 'lucide-react';

export default function Login() {
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError('');
            const authResult = await loginWithGoogle();

            if (authResult.role) {
                // If the user already has a role, go to their dashboard
                navigate(`/${authResult.role}`);
            } else {
                // If no role set (new user), go to role selection
                navigate('/role-selection');
            }
        } catch (err) {
            setError('Failed to sign in. ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mx-auto flex justify-center items-center h-12 w-12 rounded-full bg-rose-100">
                    <Heart className="h-6 w-6 text-rose-600" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to Donor Bridge
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Continue with your Google account
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    {error && (
                        <div className="mb-4 bg-red-50 p-4 rounded-md">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <div>
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:bg-rose-400"
                        >
                            {loading ? 'Signing in...' : 'Continue with Google'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
