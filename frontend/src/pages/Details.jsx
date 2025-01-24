import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { axiosInstance } from '../lib/axios';

const Details = () => {
    const { id } = useParams(); // Extract the ID from the route
    const [service, setService] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axiosInstance.get(`/services/${id}`);
                setService(response.data);
            } catch (err) {
                console.error('Error fetching service details:', err);
                setError('Failed to fetch service details.');
            }
        };

        fetchService();
    }, [id]);

    useEffect(() => {
        if (service && service.location) {
            const mapContainer = document.getElementById('map');

            // Check if the map container already has a Leaflet map instance
            if (mapContainer._leaflet_id) {
                return; // Skip initialization if map is already initialized
            }

            const map = L.map('map').setView(service.location.coordinates, 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            const marker = L.marker(service.location.coordinates).addTo(map);

            // Add click functionality to the marker
            marker.on('click', () => {
                // Redirect to Google Maps for the given coordinates
                const [lat, lng] = service.location.coordinates;
                const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
                window.open(googleMapsUrl, '_blank'); // Open in a new tab
            });
        }
    }, [service]);

    if (error) {
        return <p className="text-red-500 text-center mt-10">{error}</p>;
    }

    if (!service) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="p-6 max-w mx-auto h-screen bg-yellow-200">
            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
            <p><strong>Description:</strong> {service.description}</p>
            <p><strong>Date:</strong> {new Date(service.date).toLocaleDateString()}</p>
            <p><strong>Volunteers Needed:</strong> {service.volunteersNeeded}</p>
            <div id="map" style={{ height: '400px', marginTop: '20px' }}></div>
        </div>
    );
};

export default Details;
