import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Link } from 'react-router-dom';
import { Heart, Activity, User } from 'lucide-react';

export default function DonorDashboard() {
    const { currentUser, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form State
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [healthCondition, setHealthCondition] = useState('');

    const [bloodGroup, setBloodGroup] = useState('');
    const [organAvailable, setOrganAvailable] = useState('');
    const [availabilityStatus, setAvailabilityStatus] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            if (currentUser) {
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProfile(data);

                    setFullName(data.fullName || '');
                    setAge(data.age || '');
                    setContactPhone(data.contactPhone || '');
                    setHealthCondition(data.healthCondition || '');

                    setBloodGroup(data.bloodGroup || '');
                    setOrganAvailable(data.organAvailable || '');
                    setAvailabilityStatus(data.availabilityStatus || false);
                }
                setLoading(false);
            }
        }
        fetchProfile();
    }, [currentUser]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const docRef = doc(db, 'users', currentUser.uid);
            await setDoc(docRef, {
                fullName,
                age,
                contactPhone,
                healthCondition,
                bloodGroup,
                organAvailable,
                availabilityStatus
            }, { merge: true });
            // Update local state
            setProfile(prev => ({
                ...prev,
                fullName,
                age,
                contactPhone,
                healthCondition,
                bloodGroup,
                organAvailable,
                availabilityStatus
            }));
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Failed to update profile: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-rose-600">Donor Portal</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">{currentUser?.email}</span>
                            <button onClick={logout} className="text-gray-500 hover:text-gray-700">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex-grow max-w-7xl w-full mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {currentUser?.displayName}</h1>
                <p className="mt-2 text-gray-600">Manage your organ donation profile and status below.</p>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Form Area */}
                    <div className="lg:col-span-2">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                                    <Heart className="mr-2 h-5 w-5 text-rose-500" />
                                    Medical Profile
                                </h3>

                                <form onSubmit={handleUpdateProfile} className="mt-6 space-y-6">
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 mb-6">
                                        <div className="sm:col-span-6">
                                            <h4 className="text-md font-medium text-gray-900 border-b pb-2">Personal Details</h4>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                                            <input
                                                type="number"
                                                id="age"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">Contact Phone</label>
                                            <input
                                                type="tel"
                                                id="contactPhone"
                                                value={contactPhone}
                                                onChange={(e) => setContactPhone(e.target.value)}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6 mt-2">
                                            <h4 className="text-md font-medium text-gray-900 border-b pb-2">Medical Details</h4>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
                                                Blood Group
                                            </label>
                                            <select
                                                id="bloodGroup"
                                                value={bloodGroup}
                                                onChange={(e) => setBloodGroup(e.target.value)}
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm rounded-md"
                                            >
                                                <option value="">Select...</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="organAvailable" className="block text-sm font-medium text-gray-700">
                                                Organ for Donation
                                            </label>
                                            <select
                                                id="organAvailable"
                                                value={organAvailable}
                                                onChange={(e) => setOrganAvailable(e.target.value)}
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm rounded-md"
                                            >
                                                <option value="">Select...</option>
                                                <option value="Kidney">Kidney</option>
                                                <option value="Liver">Liver</option>
                                                <option value="Heart">Heart</option>
                                                <option value="Lungs">Lungs</option>
                                                <option value="Pancreas">Pancreas</option>
                                                <option value="Corneas">Corneas</option>
                                                <option value="Bone Marrow">Bone Marrow</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="healthCondition" className="block text-sm font-medium text-gray-700">Health Condition / Medical History</label>
                                            <textarea
                                                id="healthCondition"
                                                rows={3}
                                                value={healthCondition}
                                                onChange={(e) => setHealthCondition(e.target.value)}
                                                placeholder="Please describe any pre-existing medical conditions..."
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm flex-1 py-2 px-3 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="sm:col-span-6 flex items-start mt-2">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    id="availabilityStatus"
                                                    type="checkbox"
                                                    checked={availabilityStatus}
                                                    onChange={(e) => setAvailabilityStatus(e.target.checked)}
                                                    className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="availabilityStatus" className="font-medium text-gray-700">Active Donor Status</label>
                                                <p className="text-gray-500">I am currently available and actively willing to be contacted for organ donation requests.</p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:bg-rose-400"
                                        >
                                            {saving ? 'Saving...' : 'Save Profile'}
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                    {/* Side Panel */}
                    <div className="space-y-8">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                                    <Activity className="mr-2 h-5 w-5 text-green-500" />
                                    Account Status
                                </h3>
                                <div className="mt-4">
                                    <dl className="space-y-4 text-sm">
                                        <div className="flex justify-between">
                                            <dt className="text-gray-500">Verification Status</dt>
                                            <dd className="font-medium text-yellow-600">{profile?.status || "Pending"}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-500">Member Since</dt>
                                            <dd className="font-medium text-gray-900">
                                                {profile?.createdAt ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}
