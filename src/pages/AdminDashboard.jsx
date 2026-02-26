import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

export default function AdminDashboard() {
    const { currentUser, logout } = useAuth();

    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({
        pending: 0,
        donors: 0,
        recipients: 0
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'verified'

    useEffect(() => {
        const usersRef = collection(db, 'users');
        const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
            const fetchedUsers = [];
            let p = 0, d = 0, r = 0;

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                fetchedUsers.push(data);

                if (data.status === 'Pending') p++;
                if (data.role === 'donor') d++;
                if (data.role === 'recipient') r++;
            });

            setUsers(fetchedUsers);
            setStats({ pending: p, donors: d, recipients: r });
            setLoading(false);
        }, (error) => {
            console.error("Error fetching users:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleVerify = async (uid, status) => {
        try {
            const userRef = doc(db, 'users', uid);
            await updateDoc(userRef, { status });

            alert(`User marked as ${status}`);
        } catch (error) {
            console.error("Error updating verification status:", error);
            alert("Failed to update status.");
        }
    };

    const pendingUsers = users.filter(u => u.status === 'Pending' && u.role !== 'admin');
    const verifiedUsers = users.filter(u => u.status === 'Verified' && u.role !== 'admin');

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <nav className="bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <ShieldAlert className="text-rose-500 w-6 h-6 mr-2" />
                            <span className="text-xl font-bold text-white">Admin Portal</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-300">{currentUser?.email}</span>
                            <button onClick={logout} className="text-gray-300 hover:text-white">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex-grow max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 w-full">
                <h1 className="text-3xl font-bold text-gray-900">System Dashboard</h1>
                <p className="mt-2 text-gray-600">Manage user verifications and platform settings.</p>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-yellow-500">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Pending Verifications</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.pending}</dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-rose-500">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Donors</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.donors}</dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-rose-500">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Recipients</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.recipients}</dd>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-8 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`${activeTab === 'pending'
                                ? 'border-rose-500 text-rose-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Pending Review ({pendingUsers.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('verified')}
                            className={`${activeTab === 'verified'
                                ? 'border-rose-500 text-rose-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Verified Directory ({verifiedUsers.length})
                        </button>
                    </nav>
                </div>

                <div className="mt-6">
                    {activeTab === 'pending' ? (
                        <>
                            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Pending Review Queue</h2>
                            {pendingUsers.length === 0 ? (
                                <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center text-gray-500">
                                    No pending verifications at this time.
                                </div>
                            ) : (
                                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                    <ul className="divide-y divide-gray-200">
                                        {pendingUsers.map((user) => (
                                            <li key={user.uid} className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <p className="text-sm font-medium text-rose-600 truncate">
                                                            {user.fullName || user.displayName} ({user.email})
                                                        </p>
                                                        <p className="flex items-center text-sm text-gray-500 mt-1 uppercase font-semibold">
                                                            Role: {user.role} | Age: {user.age || 'N/A'} | Phone: {user.contactPhone || 'N/A'}
                                                        </p>
                                                    </div>
                                                    <div className="ml-2 flex-shrink-0 flex space-x-2">
                                                        <button
                                                            onClick={() => handleVerify(user.uid, 'Verified')}
                                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                                                        >
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleVerify(user.uid, 'Rejected')}
                                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-rose-700 bg-rose-100 hover:bg-rose-200 focus:outline-none"
                                                        >
                                                            <XCircle className="w-4 h-4 mr-1" /> Reject
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-4 sm:flex sm:justify-between text-sm text-gray-500 bg-gray-50 p-4 rounded-md border border-gray-100">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                                        <div>
                                                            <span className="font-semibold text-gray-700">Blood Group: </span> {user.bloodGroup || 'Not Provided'}
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold text-gray-700">
                                                                {user.role === 'donor' ? 'Available Organ:' : 'Required Organ:'}
                                                            </span>
                                                            {' '} <span className="text-rose-600 font-medium">{user.organAvailable || user.organRequired || 'Not Provided'}</span>
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <span className="font-semibold text-gray-700">Health Condition / History: </span>
                                                            <p className="mt-1 text-gray-600 bg-white p-2 rounded border border-gray-200">{user.healthCondition || 'Not Provided'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Verified Users Directory</h2>
                            {verifiedUsers.length === 0 ? (
                                <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center text-gray-500">
                                    No verified users found.
                                </div>
                            ) : (
                                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                    <ul className="divide-y divide-gray-200">
                                        {verifiedUsers.map((user) => (
                                            <li key={user.uid} className="px-4 py-6 sm:px-6 hover:bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <p className="text-lg font-bold text-gray-900 flex items-center">
                                                            {user.fullName || user.displayName}
                                                            {user.availabilityStatus && user.role === 'donor' && (
                                                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    Active Donor
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            <span className="uppercase font-semibold text-rose-600">{user.role}</span> | {user.email} | Phone: {user.contactPhone || 'N/A'} | Age: {user.age || 'N/A'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <a href={`mailto:${user.email}`} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                                                            Contact User
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    <div className="bg-rose-50 rounded-md p-3">
                                                        <span className="block text-xs text-rose-500 uppercase font-semibold">Blood Group</span>
                                                        <span className="block mt-1 text-sm font-medium text-gray-900">{user.bloodGroup || 'Unknown'}</span>
                                                    </div>
                                                    <div className="bg-rose-50 rounded-md p-3">
                                                        <span className="block text-xs text-rose-500 uppercase font-semibold">
                                                            {user.role === 'donor' ? 'Organ Offered' : 'Organ Needed'}
                                                        </span>
                                                        <span className="block mt-1 text-sm font-medium text-gray-900">{user.organAvailable || user.organRequired || 'Unknown'}</span>
                                                    </div>
                                                    <div className="bg-rose-50 rounded-md p-3 lg:col-span-3">
                                                        <span className="block text-xs text-rose-500 uppercase font-semibold">Health Condition</span>
                                                        <span className="block mt-1 text-sm text-gray-800">{user.healthCondition || 'No details provided'}</span>
                                                    </div>
                                                </div>
                                                {user.status === 'Verified' && (
                                                    <div className="mt-4 flex justify-end">
                                                        <button
                                                            onClick={() => handleVerify(user.uid, 'Pending')}
                                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-rose-700 bg-rose-100 hover:bg-rose-200 focus:outline-none"
                                                        >
                                                            <XCircle className="w-4 h-4 mr-1" /> Revoke Verification
                                                        </button>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
