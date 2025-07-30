import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Store {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  coordinates: { lat: number; lng: number };
}

interface MapProps {
  stores: Store[];
}

// Fix for default markers in react-leaflet
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icons for different store types
const storeIcons = {
  seijo: new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  maruetsu: new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  ff: new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

const Map: React.FC<MapProps> = ({ stores }) => {
  // Center the map on Tokyo Dome area (average of all store locations)
  const centerLat = stores.reduce((sum, store) => sum + store.coordinates.lat, 0) / stores.length;
  const centerLng = stores.reduce((sum, store) => sum + store.coordinates.lng, 0) / stores.length;

  return (
    <div className="h-96 w-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.coordinates.lat, store.coordinates.lng]}
            icon={storeIcons[store.id as keyof typeof storeIcons] || defaultIcon}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[250px]">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {store.name}
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Address:</span>
                    <p className="text-gray-600 mt-1">{store.address}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Hours:</span>
                    <p className="text-gray-600">{store.hours}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Phone:</span>
                    <p className="text-emerald-600">{store.phone}</p>
                  </div>
                </div>
                <button className="w-full mt-3 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-sm">
                  Get Directions
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;