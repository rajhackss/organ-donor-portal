import { Link } from 'react-router-dom';
import { Heart, ShieldAlert, Activity, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';

export default function Navbar({ customTitle, customIcon }) {
    const { currentUser, userRole, logout } = useAuth();

    const getDashboardLink = () => {
        if (!userRole) return '/role-selection';
        return `/${userRole}`;
    };

    const renderDefaultIcon = () => {
        if (userRole === 'admin') return <ShieldAlert className="h-6 w-6 text-rose-500 mr-2" />;
        if (userRole === 'donor') return <Heart className="h-6 w-6 text-rose-500 mr-2" />;
        if (userRole === 'recipient') return <Activity className="h-6 w-6 text-rose-500 mr-2" />;
        return <Heart className="h-6 w-6 text-rose-600 mr-2" />;
    };

    const renderDefaultTitle = () => {
        if (userRole === 'admin') return 'Admin Portal';
        if (userRole === 'donor') return 'Donor Portal';
        if (userRole === 'recipient') return 'Recipient Portal';
        return 'Donor Bridge';
    };

    return (
        <nav className={`shadow ${userRole === 'admin' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
                            {customIcon || renderDefaultIcon()}
                            <span className={`text-xl font-bold ${userRole === 'admin' ? 'text-white' : 'text-gray-900'}`}>
                                {customTitle || renderDefaultTitle()}
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/education"
                            className={`font-medium hidden sm:block ${userRole === 'admin' ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-rose-600'}`}
                        >
                            Education
                        </Link>

                        {currentUser ? (
                            <>
                                {/* Show Dashboard link if not already on it, and not an admin since admin has a different style */}
                                {userRole && userRole !== 'admin' && window.location.pathname !== `/${userRole}` && (
                                    <Link
                                        to={getDashboardLink()}
                                        className="text-rose-600 hover:text-rose-900 font-medium hidden sm:block"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                {/* For Admin, Home link is styled differently */}
                                {userRole === 'admin' && window.location.pathname !== '/' && (
                                    <Link to="/" className="text-gray-300 hover:text-white font-medium hidden sm:block">Home</Link>
                                )}

                                <NotificationDropdown />
                                <span className={userRole === 'admin' ? 'text-gray-300 hidden md:block' : 'text-gray-700 hidden md:block'}>
                                    {currentUser.displayName || currentUser.email}
                                </span>
                                <button
                                    onClick={logout}
                                    className={`${userRole === 'admin' ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 transition"
                            >
                                Sign in / Register
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
