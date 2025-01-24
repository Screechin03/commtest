import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Info, Briefcase, Phone } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import MapComponent from "./MapComponent";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const { authUser, logout } = useAuthStore();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-yellow-300 bg-opacity-30 backdrop-blur-md shadow-lg sticky top-0 z-50">
            <div className="max-w-screen-xl mx-auto p-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">

                    <Link to="/" className="text-2xl font-semibold text-green-800 flex items-center">
                        <span>VANA</span><span><img
                            src="./green.png"
                            alt="Construction"
                            className="rounded-lg shadow-lg h-7 w-7"
                        /></span><span>YANA</span>
                    </Link>
                </div>


                {authUser ? (
                    <>
                        <div className="md:hidden" onClick={handleMenuToggle}>
                            <span className="text-white text-3xl">&#9776;</span>
                        </div>
                        <ul
                            className={`md:flex md:space-x-6 space-y-4 md:space-y-0 mt-4 md:mt-0 ${isMenuOpen ? "block" : "hidden"
                                } md:block`}
                        >
                            <li className="flex items-center space-x-2">
                                <Link
                                    to="/"
                                    className="text-white hover:text-yellow-400 flex items-center"
                                >
                                    <Home className="w-5 h-5 text-green-800 hover:text-white" />
                                </Link>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Link
                                    to="/about"
                                    className="text-white hover:text-yellow-400 flex items-center"
                                >
                                    <Info className="w-5 h-5  text-green-800 hover:text-white" />
                                </Link>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Link
                                    to="/services"
                                    className="text-white hover:text-yellow-400 flex items-center"
                                >
                                    <Briefcase className="w-5 h-5  text-green-800 hover:text-white" />
                                </Link>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Link
                                    to="/contact"
                                    className="text-white hover:text-yellow-400 flex items-center"
                                >
                                    <Phone className="w-5 h-5  text-green-800 hover:text-white" />
                                </Link>
                            </li>
                        </ul>


                        <div className="hidden md:flex space-x-4">
                            <button
                                onClick={logout}
                                className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
                            >
                                Logout
                            </button>
                        </div>
                    </>
                ) : (

                    <div className="flex space-x-4">
                        <button className="text-green-800 px-6 py-2 border-2 border-green-400 rounded-md hover:bg-green-800 hover:text-white">
                            <Link to="/signup">Sign Up</Link>
                        </button>
                        <button className="bg-transparent border-2 border-green-400 text-green-800 px-6 py-2 rounded-md hover:bg-green-800 hover:text-white">
                            <Link to="/login">Login</Link>
                        </button>
                    </div>
                )}

            </div>


        </nav>
    );
};

export default Navbar;
