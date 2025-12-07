import { useState, useEffect } from "react";
import { Box, Button, Flex, Text, Heading, TextField } from "@radix-ui/themes";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface LocationMapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  onClose: () => void;
}

function MapUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 15);
    }
  }, [lat, lng, map]);

  return null;
}

export function LocationMapPicker({ onLocationSelect, onClose }: LocationMapPickerProps) {
  const [latInput, setLatInput] = useState("");
  const [lngInput, setLngInput] = useState("");
  const [markerLat, setMarkerLat] = useState<number | null>(null);
  const [markerLng, setMarkerLng] = useState<number | null>(null);
  const [center] = useState<[number, number]>([41.0082, 28.9784]); // Istanbul center
  const [error, setError] = useState("");

  const handleLatChange = (value: string) => {
    setLatInput(value);
    setError("");
  };

  const handleLngChange = (value: string) => {
    setLngInput(value);
    setError("");
  };

  const handleUpdateMap = () => {
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);

    if (isNaN(lat) || isNaN(lng)) {
      setError("Lütfen geçerli enlem ve boylam değerleri girin");
      return;
    }

    if (lat < -90 || lat > 90) {
      setError("Enlem -90 ile 90 arasında olmalıdır");
      return;
    }

    if (lng < -180 || lng > 180) {
      setError("Boylam -180 ile 180 arasında olmalıdır");
      return;
    }

    setMarkerLat(lat);
    setMarkerLng(lng);
    setError("");
  };

  const handleConfirm = () => {
    if (markerLat !== null && markerLng !== null) {
      onLocationSelect(markerLat, markerLng);
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdateMap();
    }
  };

  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <Box
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          width: "90%",
          maxWidth: "700px",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Heading size="5">Harita Üzerinden Konum Seçin</Heading>

        {/* Latitude and Longitude Input Section */}
        <Box>
          <Heading size="4" mb="2">
            Koordinatları Girin
          </Heading>
          <Flex gap="2" mb="2">
            <TextField.Root
              placeholder="Enlem (Latitude)"
              value={latInput}
              onChange={(e) => handleLatChange(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{ flex: 1 }}
            />
            <TextField.Root
              placeholder="Boylam (Longitude)"
              value={lngInput}
              onChange={(e) => handleLngChange(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{ flex: 1 }}
            />
            <Button
              onClick={handleUpdateMap}
              style={{
                background: "#0ea5e9",
                color: "white",
                cursor: "pointer",
                border: "none",
                padding: "8px 16px",
              }}
            >
              Haritada Göster
            </Button>
          </Flex>
          {error && (
            <Text size="2" style={{ color: "#ef4444" }}>
              {error}
            </Text>
          )}
        </Box>

        {/* Map Container */}
        <Box style={{ height: "400px", borderRadius: "8px", overflow: "hidden" }}>
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {markerLat !== null && markerLng !== null && (
              <>
                <MapUpdater lat={markerLat} lng={markerLng} />
                <Marker position={[markerLat, markerLng]}>
                  <Popup>
                    <Text>
                      Seçilen Konum: {markerLat.toFixed(6)}, {markerLng.toFixed(6)}
                    </Text>
                  </Popup>
                </Marker>
              </>
            )}
          </MapContainer>
        </Box>

        {/* Selected Location Display */}
        {markerLat !== null && markerLng !== null && (
          <Box
            style={{
              background: "#f0f9ff",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #0ea5e9",
            }}
          >
            <Text size="2">
              <strong>Seçilen Konum:</strong> {markerLat.toFixed(6)}, {markerLng.toFixed(6)}
            </Text>
          </Box>
        )}

        {/* Action Buttons */}
        <Flex gap="2">
          <Button
            size="3"
            variant="soft"
            onClick={onClose}
            style={{ flex: 1 }}
          >
            İptal
          </Button>
          <Button
            size="3"
            onClick={handleConfirm}
            disabled={markerLat === null || markerLng === null}
            style={{
              flex: 1,
              background: "#0ea5e9",
              color: "white",
              cursor: markerLat !== null && markerLng !== null ? "pointer" : "not-allowed",
              opacity: markerLat !== null && markerLng !== null ? 1 : 0.5,
              border: "none",
            }}
          >
            Onayla
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
