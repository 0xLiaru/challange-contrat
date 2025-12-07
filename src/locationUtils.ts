/**
 * GPS ve Konum Yönetimi Yardımcı Fonksiyonları
 */

export interface LocationCoords {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

/**
 * Kullanıcının mevcut konumunu al (Geolocation API kullanarak)
 */
export async function getCurrentLocation(): Promise<LocationCoords> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Tarayıcı coğrafi konum özelliğini desteklemiyor"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        resolve({
          latitude,
          longitude,
          accuracy,
          timestamp: Date.now(),
        });
      },
      (error) => {
        let errorMessage = "Konum alınamadı";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Konum izni reddedildi. Lütfen tarayıcı ayarlarında izin verin.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Konum verisi şu an kullanılabilir değil";
            break;
          case error.TIMEOUT:
            errorMessage = "Konum isteği zaman aşımına uğradı";
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Kullanıcının konumunu gözlemle (sürekli izleme)
 * İşlem yapmak için callback fonksiyonunu çağırır
 */
export function watchLocation(
  onLocation: (coords: LocationCoords) => void,
  onError: (error: Error) => void,
  options?: PositionOptions
): number {
  if (!navigator.geolocation) {
    onError(new Error("Tarayıcı coğrafi konum özelliğini desteklemiyor"));
    return -1;
  }

  return navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      onLocation({
        latitude,
        longitude,
        accuracy,
        timestamp: Date.now(),
      });
    },
    (error) => {
      let errorMessage = "Konum alınamadı";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Konum izni reddedildi";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Konum verisi şu an kullanılabilir değil";
          break;
        case error.TIMEOUT:
          errorMessage = "Konum isteği zaman aşımına uğradı";
          break;
      }
      onError(new Error(errorMessage));
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
      ...options,
    }
  );
}

/**
 * Konumun izlenmesini durdur
 */
export function clearWatch(watchId: number): void {
  if (watchId > 0) {
    navigator.geolocation.clearWatch(watchId);
  }
}

/**
 * İki konum arasındaki mesafeyi hesapla (Haversine formülü)
 * @returns Mesafe metre cinsinden
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Dünya yarıçapı metre cinsinden
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Metre cinsinden mesafe
}

/**
 * Konumu insan tarafından okunabilir adrese dönüştür (Reverse Geocoding)
 * NOT: Bu gerçek bir Geocoding API'sine ihtiyaç duyar
 */
export async function getAddressFromCoords(
  latitude: number,
  longitude: number
): Promise<string> {
  try {
    // Google Maps API örneği (kendi API key'iniz gerekir)
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    }
    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  } catch (error) {
    console.error("Adres dönüşüm hatası:", error);
    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  }
}

/**
 * Konumun doğruluğu hakkında uyarı ver
 */
export function getAccuracyStatus(accuracy: number): {
  status: "excellent" | "good" | "fair" | "poor";
  message: string;
} {
  if (accuracy < 10) {
    return { status: "excellent", message: "Çok iyi (< 10m)" };
  } else if (accuracy < 25) {
    return { status: "good", message: "İyi (< 25m)" };
  } else if (accuracy < 50) {
    return { status: "fair", message: "Orta (< 50m)" };
  } else {
    return { status: "poor", message: "Zayıf (> 50m)" };
  }
}

export default {
  getCurrentLocation,
  watchLocation,
  clearWatch,
  calculateDistance,
  getAddressFromCoords,
  getAccuracyStatus,
};
