import { Link } from 'react-router-dom';
import { Users, Activity, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

export default function Home() {
    // Current user and role are now handled internally by Navbar for navigation
    // but we still need currentUser to show/hide the "Register Now" hero button.
    // If you need it, import useAuth again, otherwise we can assume the button
    // is just always showing, or we keep useAuth just for currentUser.

    // Actually, looking at the code, we need currentUser for line 61
    // let's re-add useAuth
    const { currentUser } = useAuth();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <div className="flex-grow bg-rose-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">Give the gift of life.</span>
                        <span className="block text-rose-600">Become an organ donor.</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Donor Bridge is a centralized platform connecting organ donors with recipients in need. Join us to streamline the transplantation process, ensure transparency, and save lives.
                    </p>
                    {!currentUser && (
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <div className="rounded-md shadow">
                                <Link
                                    to="/login"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 md:py-4 md:text-lg"
                                >
                                    Register Now
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Features / Awareness */}
                <div className="bg-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
                                <Users className="h-12 w-12 text-rose-500 mx-auto" />
                                <h3 className="mt-4 text-xl font-medium text-gray-900">Centralized Database</h3>
                                <p className="mt-2 text-gray-500">Securely matching verified donors and recipients instantly.</p>
                            </div>

                            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
                                <Activity className="h-12 w-12 text-rose-500 mx-auto" />
                                <h3 className="mt-4 text-xl font-medium text-gray-900">Real-Time Updates</h3>
                                <p className="mt-2 text-gray-500">Receive alerts on medical status and compatibility matches immediately.</p>
                            </div>

                            <Link to="/education" className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition block group">
                                <BookOpen className="h-12 w-12 text-teal-500 mx-auto group-hover:text-teal-600" />
                                <h3 className="mt-4 text-xl font-medium text-gray-900 group-hover:text-teal-600">Awareness & Education</h3>
                                <p className="mt-2 text-gray-500">Read our articles and infographics to understand the impact of organ donation.</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-300">
                    <p>© {new Date().getFullYear()} Donor Bridge. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
