// Map.js
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const position = [44.816001, 20.46085]; // Adjust these coordinates to your store location

  const defaultIcon = L.icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  // Set the default icon for the marker
  L.Marker.prototype.options.icon = defaultIcon;

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
      className="rounded-lg overflow-hidden shadow-lg"
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={defaultIcon}>
        <Popup>New Store Opening here!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
