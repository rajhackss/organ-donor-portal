import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Activity, ArrowLeft } from 'lucide-react';

export default function EducationalContent() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="text-gray-500 hover:text-gray-700 mr-4">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <span className="text-xl font-bold text-rose-600 flex items-center">
                                <BookOpen className="h-6 w-6 mr-2" />
                                Educational Resources
                            </span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Learn About Organ Donation
                    </h1>
                    <p className="max-w-xl mx-auto mt-5 text-xl text-gray-500">
                        Understanding the process, facts, and impact of organ donation can help you make an informed decision and save lives.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Article 1 */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="p-6">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-rose-500 text-white mb-4">
                                <Heart className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">The Impact of One Donor</h3>
                            <p className="text-gray-600 mb-4">
                                A single organ donor can save up to 8 lives and enhance the lives of over 75 people through tissue donation.
                                Discover how your selfless act can create a ripple effect of hope and healing for families in need.
                            </p>
                            <div className="bg-rose-50 p-4 rounded-md border border-rose-100">
                                <h4 className="text-rose-800 font-semibold mb-2">Key Facts:</h4>
                                <ul className="list-disc pl-5 text-sm text-rose-700 space-y-1">
                                    <li>Every 10 minutes, another person is added to the waiting list.</li>
                                    <li>Organs that can be donated include the heart, kidneys, liver, lungs, pancreas, and intestines.</li>
                                    <li>Age and medical history do not automatically rule you out from being a donor.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Article 2 */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="p-6">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                                <Activity className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">The Donation Process Explained</h3>
                            <p className="text-gray-600 mb-4">
                                Choosing to become an organ donor is the first step. Understanding what happens next can bring peace of mind to you and your loved ones.
                            </p>
                            <div className="space-y-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-bold">1</div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-md font-semibold text-gray-900">Registration</h4>
                                        <p className="text-sm text-gray-500">Sign up securely on platforms like Donor Bridge to make your intentions known.</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-bold">2</div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-md font-semibold text-gray-900">Medical Evaluation</h4>
                                        <p className="text-sm text-gray-500">Medical professionals evaluate potential donors to ensure organs are safe for transplantation.</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-bold">3</div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-md font-semibold text-gray-900">Matching & Surgery</h4>
                                        <p className="text-sm text-gray-500">Organs are matched with recipients based on blood type, size, and urgency, followed by the transplant surgery.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Article 3 */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 md:col-span-2">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Common Myths vs. Facts</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h4 className="font-semibold text-rose-600 mb-1">Myth: If I'm registered as a donor, doctors won't try as hard to save my life.</h4>
                                    <p className="text-sm text-gray-700"><strong>Fact:</strong> Your life always comes first. The doctors trying to save your life are completely separate from the transplant team. Donation is only considered after all life-saving efforts have failed.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h4 className="font-semibold text-rose-600 mb-1">Myth: I'm too old or sick to donate.</h4>
                                    <p className="text-sm text-gray-700"><strong>Fact:</strong> There is no strict age limit for donation. Medical professionals determine the suitability of organs at the time of death based on medical criteria, not age.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h4 className="font-semibold text-rose-600 mb-1">Myth: My family will be charged for the donation process.</h4>
                                    <p className="text-sm text-gray-700"><strong>Fact:</strong> There is absolutely no cost to the donor's family or estate for organ or tissue donation.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h4 className="font-semibold text-rose-600 mb-1">Myth: My religion forbids organ donation.</h4>
                                    <p className="text-sm text-gray-700"><strong>Fact:</strong> All major organized religions support organ donation and view it as a final act of love and generosity.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">Ready to make a difference?</p>
                    <Link to="/login" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                        Join Donor Bridge Today
                    </Link>
                </div>
            </main>
        </div>
    );
}
