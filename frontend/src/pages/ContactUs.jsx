import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState(null);
    useEffect(() => {
        const mapElement = document.getElementById('map');
        if (mapElement && !mapElement._leaflet_id) {
            const map = L.map('map').setView([37.7749, -122.4194], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/save-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus('success');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: '',
                });
            } else {
                setFormStatus('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setFormStatus('error');
        }
    };

    return (
        <div className="bg-yellow-50 min-h-screen">
            <div className="container mx-auto py-10 px-4">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-gray-800">Contact Us</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Email, call, or complete the form to learn how we can help grow your tree-planting community.
                    </p>
                </div>

                {/* Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div className="bg-yellow-100 shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
                        <p className="text-gray-600">info@treecommunity.org</p>
                        <a href="mailto:info@treecommunity.org" className="text-green-600 hover:underline mt-2 block">
                            Send an Email
                        </a>
                    </div>
                    <div className="bg-yellow-100 shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
                        <p className="text-gray-600">+123 456 7890</p>
                        <a href="tel:+1234567890" className="text-green-600 hover:underline mt-2 block">
                            Call Now
                        </a>
                    </div>
                    <div className="bg-yellow-100 shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Feedback & Suggestions</h3>
                        <p className="text-gray-600">We value your input! Let us know how we can improve.</p>
                        <a href="#feedback" className="text-green-600 hover:underline mt-2 block">
                            Provide Feedback
                        </a>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-yellow-100 shadow-md rounded-lg p-8 mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="first-name" className="block font-medium text-gray-700">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="first-name"
                                    name="firstName"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block font-medium text-gray-700">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="last-name"
                                    name="lastName"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block font-medium text-gray-700">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block font-medium text-gray-700">
                                How can we help?
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="4"
                                required
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                            Submit
                        </button>
                        {formStatus === 'success' && <p className="text-green-600 mt-4">Form submitted successfully!</p>}
                        {formStatus === 'error' && <p className="text-red-600 mt-4">An error occurred. Please try again.</p>}
                    </form>
                </div>

                {/* Location Section */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Location</h2>
                    <p className="text-gray-600 mb-6">Visit us at our headquarters or check out events near you.</p>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <div id="map" style={{ height: '400px', marginTop: '20px' }}></div>
                    </div>
                </div>



            </div>
            <div className=" flex justify-center items-center mt-10 pt-3 text-center text-white bg-gray-900 pb-4">
                <p>&copy; 2025 Vanayana. All rights reserved.</p>
            </div>
        </div>
    );
};

export default ContactUs;
