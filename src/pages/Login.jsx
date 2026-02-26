import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Heart, User, ShieldAlert } from 'lucide-react';

export default function Login() {
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState('donor');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError('');
            const authResult = await loginWithGoogle(role);
            navigate(`/${authResult.role}`);
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
                    Select your registration type below to continue
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    {error && (
                        <div className="mb-4 bg-red-50 p-4 rounded-md">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                I am a...
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setRole('donor')}
                                    className={`${role === 'donor'
                                        ? 'border-rose-500 ring-2 ring-rose-500 bg-rose-50 text-rose-700'
                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                        } border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium focus:outline-none transition-colors`}
                                >
                                    <Heart className="mr-2 h-5 w-5" /> Donor
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('recipient')}
                                    className={`${role === 'recipient'
                                        ? 'border-rose-500 ring-2 ring-rose-500 bg-rose-50 text-rose-700'
                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                        } border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium focus:outline-none transition-colors`}
                                >
                                    <User className="mr-2 h-5 w-5" /> Recipient
                                </button>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={() => setRole('admin')}
                                    className={`${role === 'admin'
                                        ? 'border-gray-800 ring-2 ring-gray-800 bg-gray-100 text-gray-900'
                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                        } w-full border rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium focus:outline-none transition-colors`}
                                >
                                    <ShieldAlert className="mr-2 h-4 w-4" /> Administrator
                                </button>
                            </div>
                        </div>

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
        </div>
    );
}
