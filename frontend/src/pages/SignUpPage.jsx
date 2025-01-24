import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Lock, User } from "lucide-react";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const { signup, isSigningUp } = useAuthStore();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-yellow-50">
            {/* Left Section */}
            <div className="bg-[#98fb98] text-white flex flex-col justify-center items-center w-full md:w-1/2 p-10 hidden lg:block lg:w-1/2">
                <div className="pb-20 p-10"></div>
                <h1 className="text-4xl text-black font-bold mb-4">Join Our Tree Planting Community</h1>
                <p className="text-lg text-neutral-900 mb-6">
                    Make a difference by planting trees and creating a greener future. Be part of our global community dedicated to sustainability and environmental care.
                </p>
                <img src="./green.png" alt="Green" />
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 sm:px-24 bg-yellow-50 py-40">
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <h1 className="text-4xl font-bold mb-6">Let's get started</h1>

                    {/* Full Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="fullName">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute inset-y-0 left-0 pl-3 h-10 w-7 text-gray-400" />
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute inset-y-0 left-0 pl-3 h-10 w-7 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute inset-y-0 left-0 pl-3 h-10 w-7 text-gray-400" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter a strong password"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full bg-black rounded-full text-white py-2 px-4`}
                        disabled={isSigningUp}
                    >
                        {isSigningUp ? "Signing Up..." : "Get Started"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
