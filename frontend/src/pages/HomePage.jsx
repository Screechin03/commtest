import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import MapComponent from "../components/MapComponent";
import { FaDiscord, FaSquareInstagram, FaSquareXTwitter, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthStore();

    const handleGetInvolvedClick = () => {
        if (authUser) {
            navigate("/services"); // Redirect to the Services page if logged in
        } else {
            navigate("/login"); // Redirect to the Login page if not logged in
        }
    };

    useEffect(() => {
        const mapElement = document.getElementById("map");
        if (mapElement && !mapElement._leaflet_id) {
            const map = L.map("map").setView([37.7749, -122.4194], 13);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
            }).addTo(map);

            const marker = L.marker([37.7749, -122.4194]).addTo(map);
            marker
                .bindPopup(
                    `<a href="https://www.google.com/maps?q=37.7749,-122.4194" target="_blank" style="color: blue; text-decoration: underline;">
                        Open in Google Maps
                    </a>`
                )
                .openPopup();
        }
    }, []);

    return (
        <div className="bg-yellow-200">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 lg:flex lg:items-center lg:gap-16">
                <div className="text-center lg:text-left lg:w-1/2">
                    <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
                        Join Our Tree Planting Community
                    </h1>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        Together, we can make a difference by planting trees to restore
                        our planet's health, combat climate change, and create greener spaces for future generations.
                    </p>
                    <div className="mt-8 flex justify-center lg:justify-start gap-4">
                        <button
                            onClick={handleGetInvolvedClick}
                            className="bg-green-500 text-white py-3 px-6 rounded-lg font-medium shadow hover:bg-green-600"
                        >
                            Get Involved
                        </button>
                        <button className="border border-green-500 text-green-500 py-3 px-6 rounded-lg font-medium hover:bg-gray-200">
                            <Link to="/contact">Contact Us</Link>
                        </button>
                    </div>
                </div>
                <div className="mt-10 lg:mt-0 lg:w-1/2">
                    <img
                        src="./home.png"
                        alt="Tree Planting"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </section>
             <section className="bg-yellow-50 py-12">
                <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    <div>
                        <h3 className="text-3xl font-bold text-gray-800">10,000+</h3>
                        <p className="text-gray-600 mt-2">Trees Planted</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-gray-800">500+</h3>
                        <p className="text-gray-600 mt-2">Volunteers</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-gray-800">300+</h3>
                        <p className="text-gray-600 mt-2">Community Events</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-gray-800">50</h3>
                        <p className="text-gray-600 mt-2">Green Zones Created</p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        How We Serve
                    </h2>
                    <p className="mt-4 text-gray-600 text-center">
                        From tree planting to environmental education, we offer services
                        that inspire action and nurture our environment.
                    </p>
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Service Card */}
                        <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition">
                            <h3 className="text-lg font-bold text-gray-800">
                                Tree Planting Campaigns
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Organizing large-scale tree planting events in urban and rural areas.
                            </p>
                            <button className="mt-4 text-green-500 font-medium hover:text-green-600">
                                Learn More
                            </button>
                        </div>

                        {/* Other service cards (similar structure) */}
                        <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition">
                            <h3 className="text-lg font-bold text-gray-800">
                                Environmental Workshops
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Educating communities on sustainable practices and environmental care.
                            </p>
                            <img
                                src="./home3.png"
                                className="rounded-lg mt-2 h-100" />
                            <button className="mt-4 text-green-500 font-medium hover:text-green-600">
                                Learn More
                            </button>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition">
                            <h3 className="text-lg font-bold text-gray-800">
                                Green Space Development
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Transforming vacant lands into vibrant green zones for everyone to enjoy.
                            </p>

                            <img
                                src="./home2.png"
                                className="rounded-lg mt-2 mb-2" />
                            <button className="mt-4 text-green-500 font-medium hover:text-green-600">
                                Learn More
                            </button>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition">
                            <h3 className="text-lg font-bold text-gray-800">
                                Volunteer Programs
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Engaging individuals and groups to contribute to environmental restoration.
                            </p>
                            <img
                                src="./home1.png"
                                className="rounded-lg mt-2" />
                            <button className="mt-4 text-green-500 font-medium hover:text-green-600">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-800 text-white py-10">
                <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold">Our Mission</h3>
                        <p className="mt-2 text-gray-400">
                            To plant trees and foster environmental stewardship through community action.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Our Vision</h3>
                        <p className="mt-2 text-gray-400">
                            To create a world where nature thrives, and every individual is connected to the environment.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Contact Us</h3>
                        <p className="mt-2 text-gray-400">Email: info@treecommunity.org</p>
                        <p className="mt-2 text-gray-400">Phone: +123 456 7890</p>
                        <div className="flex pt-3 space-x-4 ">
                            <FaSquareXTwitter className="h-8 w-8 hover:text-gray-300" />
                            <FaSquareInstagram className="h-8 w-8 hover:text-gray-300" />
                            <FaDiscord className="h-8 w-8 hover:text-gray-300" />
                            <FaWhatsapp className="h-8 w-8 hover:text-gray-300" />
                            <FaTelegram className="h-8 w-8 hover:text-gray-300" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Our Location</h3>
                        <div className="rounded-lg overflow-hidden shadow-lg mt-4">
                            <div id="map" style={{ height: '200px' }}></div>
                        </div>
                    </div>
                </div>
                <p className="flex mt-6 justify-center">@2025 Vanayana. All rights reserved</p>
            </footer>

            {/* The rest of your code remains unchanged */}
        </div>
    );
};

export default HomePage;
