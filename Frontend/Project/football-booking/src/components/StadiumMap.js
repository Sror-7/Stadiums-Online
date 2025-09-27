import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const StadiumMap = ({ onSelectLocation }) => {
  const defaultPosition = [33.5138, 36.2765];
  const [marker, setMarker] = useState(defaultPosition);
  const mapRef = useRef(null);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarker([lat, lng]);
        onSelectLocation({ lat, lng });
      },
    });
    return null;
  };

  // زر الموقع الحالي
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("المتصفح لا يدعم الموقع الجغرافي.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const newPos = [lat, lng];

        setMarker(newPos);
        onSelectLocation({ lat, lng });

        const map = mapRef.current;
        if (map) {
          map.setView(newPos, 15);
        }
      },
      (err) => {
        alert("فشل تحديد الموقع.");
        console.error(err);
      }
    );
  };

  // إضافة مربع البحث
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      showMarker: false,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: "ابحث عن مدينة أو عنوان...",
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      const { x: lng, y: lat } = result.location;
      setMarker([lat, lng]);
      onSelectLocation({ lat, lng });
    });

    return () => map.removeControl(searchControl);
  }, []);

  return (
    <div>
      <button
        onClick={handleUseMyLocation}
        type="button"
        style={{
          marginBottom: "10px",
          padding: "8px 12px",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        📍 استخدام موقعي الحالي
      </button>

      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: "200px", width: "100%" }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={marker} />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default StadiumMap;
