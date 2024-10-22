import React, { useState, useEffect } from 'react';
import './cs/style.css';

const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;

  const lat1 = coords1[0];
  const lon1 = coords1[1];
  const lat2 = coords2[0];
  const lon2 = coords2[1];

  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2);
};

const TopSpot = ({ name, description, location }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userCoords = [position.coords.latitude, position.coords.longitude];
        const distanceToTopSpot = haversineDistance(userCoords, location);
        setDistance(distanceToTopSpot);
      });
    }
  }, [location]);

  return (
    <div
      className="card mb-3 h-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-body text-center d-flex flex-column justify-content-center">
        <h5 className="card-title">{name}</h5>

        {distance && <p className="distance">Distance: {distance} miles</p>}

        <a
          href={`https://www.google.com/maps?q=${location[0]},${location[1]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-auto"
        >
          View on Google Maps
        </a>

        {isHovered && (
          <p className="card-text mt-3">{description}</p>
        )}
      </div>
    </div>
  );
};

export default TopSpot;
