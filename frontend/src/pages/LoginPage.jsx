import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        login(formData);
    };

    return (
        <div className="h-screen flex">
            <img
                className="hidden lg:block lg:w-1/2"
                src="./green2.png"
                alt="Login"
            />

            <div className="flex flex-col justify-center items-center w-full lg:w-1/2  sm:px-12 py-8 bg-yellow-50">
                <div className="w-full max-w-md space-y-8">

                    {/* Welcome Text */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Welcome Back!</h1>
                        <p className="text-gray-600 mt-2">
                            Create a free account or log in to get started
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="form-control">
                            <label htmlFor="email" className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    className="h-10 rounded-3xl border w-full pl-10"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                    aria-label="Email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label htmlFor="password" className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className=" w-full pl-10 border h-10 rounded-3xl"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    required
                                    aria-label="Password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={
                                        showPassword ? "Hide password" : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full rounded-full bg-black h-10 text-white"
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? (
                                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                            ) : (
                                "Log in"
                            )}
                        </button>
                    </form>

                    {/* Other Options */}
                    <div className="text-center">

                        <p className="text-gray-600 mt-2">
                            Don&apos;t have an account? <Link to="/signup" className="link link-primary">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
