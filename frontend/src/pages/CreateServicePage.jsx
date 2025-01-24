import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useServiceStore } from '../store/useServiceStore';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateServicePage = () => {
    const { createService, isAdmin } = useServiceStore();
    const { authUser } = useAuthStore();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = useState([]);
    const [date, setDate] = useState('');
    const [volunteersNeeded, setVolunteersNeeded] = useState('');
    const [adminCode, setAdminCode] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAdmin) {
            toast.error('Please log in as admin to create a new service.');
            return;
        }

        if (!authUser) {
            toast.error('User not authenticated!');
            return;
        }

        if (!coordinates || coordinates.includes(null)) {
            toast.error('Please provide valid coordinates.');
            return;
        }

        let imageUrl = '';
        if (selectedImage) {
            const formData = new FormData();
            formData.append('file', selectedImage);
            formData.append('upload_preset', 'community'); // Replace with your actual upload preset

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/daloufeum/image/upload`, // Replace with your Cloudinary cloud name
                    formData
                );
                imageUrl = response.data.secure_url;
            } catch (error) {
                console.error('Error uploading image:', error.message);
                toast.error('Image upload failed');
                return;
            }
        }

        const newServiceData = {
            title,
            description,
            location: {
                type: "Point",
                coordinates,
            },
            date,
            volunteersNeeded: parseInt(volunteersNeeded, 10),
            createdBy: authUser._id,
            imageUrl, // Include the uploaded image URL
        };

        try {
            await createService(newServiceData);
            toast.success('Service created successfully!');
            navigate('/services');
        } catch (error) {
            toast.error(`Failed to create service: ${error.message}`);
        }
    };

    const handleAdminLogin = () => {
        if (adminCode === '12345') {
            toast.success('Admin logged in successfully!');
        } else {
            toast.error('Invalid admin code. Please try again.');
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-yellow-50 rounded shadow-md">
            <h1 className="text-2xl font-semibold mb-4 text-center">Create New Service</h1>

            {!isAdmin && (
                <div className="mb-6">
                    <h2 className="text-lg font-medium mb-2">Admin Login</h2>
                    <input
                        type="password"
                        placeholder="Enter admin code"
                        value={adminCode}
                        onChange={(e) => setAdminCode(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAdminLogin}
                        className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Login
                    </button>
                </div>
            )}

            {isAdmin && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Campaign Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Campaign Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700">Coordinates:</label>
                        <input
                            type="text"
                            id="coordinates"
                            placeholder="e.g., 37.7749,-122.4194"
                            value={coordinates.join(',')}
                            onChange={(e) => {
                                const input = e.target.value;
                                const validCoordinates = input.split(',').map(coord => {
                                    const num = parseFloat(coord.trim());
                                    return !isNaN(num) ? num : null;
                                });
                                setCoordinates(validCoordinates);
                            }}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="volunteersNeeded" className="block text-sm font-medium text-gray-700">Volunteers Needed:</label>
                        <input
                            type="number"
                            id="volunteersNeeded"
                            value={volunteersNeeded}
                            onChange={(e) => setVolunteersNeeded(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Service Image:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded-md shadow-md"
                                />
                            </div>
                        )}
                    </div>

                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400">
                        Create Campaign..
                    </button>
                </form>
            )}
        </div>
    );
};

export default CreateServicePage;