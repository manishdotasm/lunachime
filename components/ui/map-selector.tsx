import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngExpression } from "leaflet";

interface EventMapProps {
  markerPosition: [number, number];
  setMarkerPosition: (position: [number, number]) => void;
  allowPointerMove: boolean;
}

// Custom marker icon
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png", // Replace with your custom icon URL
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [20, 40], // Anchor point of the icon
  popupAnchor: [0, -40], // Popup's offset from the icon
});

const EventMap: React.FC<EventMapProps> = ({ markerPosition, setMarkerPosition, allowPointerMove }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Default to Kathmandu's coordinates until location is fetched
  const defaultLocation: [number, number] = [27.7172, 85.324];

  useEffect(() => {
    // Get the user's current location using geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setUserLocation(defaultLocation); // Default to Kathmandu if location is not available
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUserLocation(defaultLocation); // Default to Kathmandu if geolocation is not supported
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (allowPointerMove) {
          setMarkerPosition([e.latlng.lat, e.latlng.lng]);
        }
        e.originalEvent?.stopPropagation();
        e.originalEvent?.preventDefault();
      },
    });
    return null;
  };

  // Use Kathmandu as the center until user location is fetched
  const mapCenter = userLocation || defaultLocation;

  return (
    <MapContainer center={mapCenter as LatLngExpression} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler />
      <Marker position={markerPosition as LatLngExpression} icon={customIcon}>
        <Popup>
          Latitude: {markerPosition[0]} <br />
          Longitude: {markerPosition[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default EventMap;
