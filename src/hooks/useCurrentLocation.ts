import { useState, useEffect } from "react";
import axios from "axios";

const useCurrentLocation = () => {
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async (latitude: number, longitude: number) => {
      try {
        const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // 여기에 API 키를 넣으세요
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
        );

        if (response.data.status === "OK") {
          const addressComponents = response.data.results[0].address_components;
          let city = "";
          let district = "";

          for (const component of addressComponents) {
            if (component.types.includes("administrative_area_level_1")) {
              city = component.long_name;
            }
            if (
              component.types.includes("sublocality_level_1") ||
              component.types.includes("locality")
            ) {
              district = component.long_name;
            }
          }

          setLocation(`${city} ${district}`);
        } else {
          setLocation("주소를 가져올 수 없습니다.");
        }
      } catch (error) {
        console.error("Geocoding API 호출 중 오류 발생:", error);
        setLocation("주소를 가져올 수 없습니다.");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchLocation(latitude, longitude);
      });
    } else {
      setLocation("위치를 사용할 수 없습니다.");
    }
  }, []);

  return location;
};

export default useCurrentLocation;
