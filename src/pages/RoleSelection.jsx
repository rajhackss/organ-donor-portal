import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Heart, User } from 'lucide-react';

export default function RoleSelection() {
    const { updateUserRole } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRoleSelect = async (role) => {
        try {
            setLoading(true);
            setError('');
            await updateUserRole(role);
            navigate(`/${role}`);
        } catch (err) {
            setError('Failed to set role. ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-rose-50/30 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Welcome to Donor Bridge
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Please tell us how you would like to use the platform.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
                <div className="bg-white py-10 px-6 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-6 bg-red-50 p-4 rounded-md">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Donor Option */}
                        <div
                            onClick={() => !loading && handleRoleSelect('donor')}
                            className={`relative rounded-xl border-2 p-6 flex flex-col items-center text-center cursor-pointer transition-all hover:border-rose-500 hover:shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : 'border-gray-200'}`}
                        >
                            <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                                <Heart className="h-8 w-8 text-rose-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Become a Donor</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Register to donate organs and help save lives in your community.
                            </p>
                            <button
                                disabled={loading}
                                className="mt-6 w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                            >
                                Select Donor
                            </button>
                        </div>

                        {/* Recipient Option */}
                        <div
                            onClick={() => !loading && handleRoleSelect('recipient')}
                            className={`relative rounded-xl border-2 p-6 flex flex-col items-center text-center cursor-pointer transition-all hover:border-teal-500 hover:shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : 'border-gray-200'}`}
                        >
                            <div className="h-16 w-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                                <User className="h-8 w-8 text-teal-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Register as Recipient</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Join the waiting list to find a matching organ donor securely.
                            </p>
                            <button
                                disabled={loading}
                                className="mt-6 w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-teal-600 bg-teal-50 hover:bg-teal-100 transition-colors"
                            >
                                Select Recipient
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        You can update your profile details later in your dashboard.
                    </div>
                </div>
            </div>
        </div>
    );
}
