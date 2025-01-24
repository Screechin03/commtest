import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import "leaflet/dist/leaflet.css"
const MapComponent = () => {
    const position = [51.505, -0.09]; // Default position (latitude, longitude)
    const markers = [
        { id: 1, position: [51.505, -0.09], description: "Marker 1" },
        { id: 2, position: [51.515, -0.1], description: "Marker 2" },
        { id: 3, position: [51.525, -0.11], description: "Marker 3" },
    ];

    return (
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Explore Our Locations
            </h2>
            <div className="container mx-auto">
                <MapContainer
                    center={position}
                    zoom={13}
                    style={{ height: "500px", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {markers.map(marker => (
                        <Marker key={marker.id} position={marker.position}>
                            <Popup>{marker.description}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapComponent;
