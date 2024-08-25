import { useState, useEffect } from "react";
import axios from "axios";

interface Location {
  id: number;
  province: string;
  city: string;
}

const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    const fetchLocation = async (latitude: number, longitude: number) => {
      try {
        const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Google Maps API 키
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
        );

        if (response.data.status === "OK") {
          const addressComponents = response.data.results[0].address_components;
          let province = "";
          let city = "";

          for (const component of addressComponents) {
            if (component.types.includes("administrative_area_level_1")) {
              province = component.long_name;
            }
            if (
              component.types.includes("sublocality_level_1") ||
              component.types.includes("locality")
            ) {
              city = component.long_name;
            }
          }

          // ID는 latitude와 longitude를 조합하여 간단히 생성
          const id = parseInt(
            `${Math.round(latitude * 1000)}${Math.round(longitude * 1000)}`
          );

          setLocation({ id, province, city });
        } else {
          setLocation(null);
        }
      } catch (error) {
        console.error("Geocoding API 호출 중 오류 발생:", error);
        setLocation(null);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchLocation(latitude, longitude);
      });
    } else {
      setLocation(null);
    }
  }, []);

  return location;
};

export default useCurrentLocation;
