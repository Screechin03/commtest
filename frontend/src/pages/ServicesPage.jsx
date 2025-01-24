import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useServiceStore } from '../store/useServiceStore';

const ServicesPage = () => {
    const { services, loading, error, getServices, deleteService, isAdmin } = useServiceStore();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getServices();
    }, []);

    // Filtered services based on the search query
    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openModal = (service) => {
        setSelectedService(service);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedService(null);
    };

    const openAdminLoginModal = () => {
        setShowAdminLoginModal(true);
    };

    const closeAdminLoginModal = () => {
        setShowAdminLoginModal(false);
        setAdminPassword('');
    };

    const handleAdminLogin = () => {
        const correctPassword = 'admin123'; // Replace this with secure authentication logic
        if (adminPassword === correctPassword) {
            setIsAdminLoggedIn(true);
            toast.success('Logged in as Admin!');
            closeAdminLoginModal();
        } else {
            toast.error('Incorrect password. Please try again.');
        }
    };

    const handleDeleteService = (serviceId) => {
        deleteService(serviceId)
            .then(() => {
                toast.success('Service deleted successfully!');
                closeModal(); // Close the modal immediately after deletion
                getServices(); // Refresh the services list
            })
            .catch((err) => {
                toast.error('Failed to delete service. Please try again.');
            });
    };

    if (loading) return <p className="text-center mt-10">Loading services...</p>;
    if (error) {
        toast.error(`Error: ${error}`);
        return <p className="text-center mt-10">Failed to load services. Please try again later.</p>;
    }

    return (
        <div className="bg-yellow-50">
            <div className="p-6 max-w-7xl mx-auto bg-yellow-50">
                <h1 className="text-3xl font-bold mb-6 text-center">All Services</h1>

                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search services by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-green-200 p-2 rounded-lg"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.length > 0 ? (
                        filteredServices.map((service) => (
                            <div
                                key={service._id}
                                className="bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 relative"
                            >
                                {/* Service Image */}
                                <div
                                    className="h-32 bg-cover bg-center rounded-t-lg"
                                    style={{
                                        backgroundImage: `url(${service.imageUrl || './green.png'})`,
                                    }}
                                ></div>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {new Date(service.date).toLocaleDateString()}
                                    </p>
                                    <button
                                        onClick={() => openModal(service)}
                                        className=" w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center mt-6">No services found.</p>
                    )}
                </div>

                {!isAdminLoggedIn && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={openAdminLoginModal}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            Login as Admin
                        </button>
                    </div>
                )}

                {isAdminLoggedIn && (
                    <div className="mt-8 text-center">
                        <Link
                            to="/services/create"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Create New Service
                        </Link>
                    </div>
                )}

                {/* Modal */}
                {modalOpen && selectedService && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                            <h2 className="text-2xl font-bold mb-4">{selectedService.title}</h2>
                            {selectedService.image && (
                                <img
                                    src={selectedService.image}
                                    alt={selectedService.title}
                                    className="mb-4 rounded w-full"
                                />
                            )}
                            <p className="mb-2">
                                <strong>Date:</strong> {new Date(selectedService.date).toLocaleDateString()}
                            </p>
                            <p className="mb-2">
                                <strong>Description:</strong> {selectedService.description || 'No description provided.'}
                            </p>
                            <p className="mb-2">
                                <strong>Location:</strong> {selectedService.location.type}:{' '}
                                {selectedService.location.coordinates.join(', ')}
                            </p>
                            <p className="mb-2">
                                <strong>Volunteers Needed:</strong> {selectedService.volunteersNeeded}
                            </p>
                            <button
                                onClick={() => navigate(`/services/${selectedService._id}`)}
                                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Go to Details
                            </button>

                            {/* Delete Button (Only visible for admins) */}
                            {isAdminLoggedIn && (
                                <button
                                    onClick={() => handleDeleteService(selectedService._id)}
                                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                                >
                                    Delete Service
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Admin Login Modal */}
                {showAdminLoginModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
                            <button
                                onClick={closeAdminLoginModal}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                            <input
                                type="password"
                                placeholder="Enter admin password"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded mb-4"
                            />
                            <button
                                onClick={handleAdminLogin}
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                )}

            </div>
            <footer className="bg-gray-800 text-white text-center py-4 mt-12">
                <p>&copy; 2025 Vanyana. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ServicesPage;
