import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix missing default icon in Leaflet when using React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  children?: React.ReactNode;
}

const MapConfig = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export default function Map({ center = [0.3901, 9.4544], zoom = 13, className = "w-full h-full", children }: MapProps) {
  // 0.3901, 9.4544 is Libreville, Gabon
  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      className={className}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapConfig center={center} zoom={zoom} />
      {children}
    </MapContainer>
  );
}
