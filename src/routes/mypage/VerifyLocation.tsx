import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/mypage/VerifyLocation.scss";
import arrowLeft from "../../assets/icons/arrowLeft.svg";

const VerifyLocation: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    const API_KEY = import.meta.env.VITE_KAKAO_MAPS_API_KEY;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const kakao = (window as any).kakao;

      if (kakao && kakao.maps) {
        kakao.maps.load(() => {
          const container = document.getElementById("map");
          if (!container) {
            console.error("Map container not found");
            return;
          }

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);

                const options = {
                  center: new kakao.maps.LatLng(latitude, longitude),
                  level: 3,
                };
                const map = new kakao.maps.Map(container, options);

                const mapTypeControl = new kakao.maps.MapTypeControl();
                map.addControl(
                  mapTypeControl,
                  kakao.maps.ControlPosition.TOPRIGHT
                );

                const markerPosition = new kakao.maps.LatLng(
                  latitude,
                  longitude
                );
                const marker = new kakao.maps.Marker({
                  position: markerPosition,
                });
                marker.setMap(map);
              },
              (error) => {
                console.error("Error retrieving location: ", error);
                alert("현재 위치를 가져올 수 없습니다.");
              }
            );
          } else {
            alert("Geolocation을 지원하지 않는 브라우저입니다.");
          }
        });
      }
    };

    axios
      .get("/locations/:{id}")
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleConfirmLocation = async () => {
    if (latitude && longitude && username) {
      try {
        const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
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

          await axios.post("/locations/save", {
            username,
            province,
            city,
          });

          alert("위치가 성공적으로 저장되었습니다!");
        } else {
          console.error("Geocoding API error:", response.data.status);
          alert("위치 정보를 가져오지 못했습니다.");
        }
      } catch (error) {
        console.error("Error confirming location:", error);
        alert("위치 저장 중 오류가 발생했습니다.");
      }
    } else {
      alert("위치 정보 또는 사용자 정보를 가져오지 못했습니다.");
    }
  };

  return (
    <div className="verify-location-container">
      <div className="header">
        <button className="back-button" onClick={() => window.history.back()}>
          <img src={arrowLeft} alt="Back" />
        </button>
        <h2>현재 위치를 확인해주세요.</h2>
      </div>
      <div className="map-container">
        <div id="map" style={{ width: "650px", height: "400px" }}></div>
      </div>
      <button
        className="confirm-button"
        onClick={handleConfirmLocation}
        disabled={!latitude || !longitude || !username}
      >
        확인하기
      </button>
    </div>
  );
};

export default VerifyLocation;

export const Route = createFileRoute("/mypage/VerifyLocation")({
  component: VerifyLocation,
});
