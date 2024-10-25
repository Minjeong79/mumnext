"use client";
import { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface Position {
  lat: number;
  lng: number;
}

interface Marker {
  position: Position;
  content: string;
  address: string;
}

interface Info extends Marker {}

declare global {
  interface Window {
    kakao: any;
  }
}

const MapPage = () => {
  const [info, setInfo] = useState<Info | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [keywordTxt, setKeyWordTxt] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.kakao) {
      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=843e559943bc29af86f736a7f1d33577&libraries=services&autoload=false";
      script.onload = () => {
        window.kakao.maps.load(() => {
          console.log(window.kakao); // Just to confirm the kakao object is loaded
        });
      };
      document.head.appendChild(script);

      const { kakao } = window;
      console.log(kakao);
    }
  }, []);

  useEffect(() => {
    if (!map) return;

    map.setLevel(3);
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keywordTxt, (data, status, _pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();
        const newMarkers = data.map((place: any) => {
          const lat = parseFloat(place.y);
          const lng = parseFloat(place.x);
          bounds.extend(new window.kakao.maps.LatLng(lat, lng));
          return {
            position: { lat, lng },
            content: place.place_name,
            address: place.address_name,
          };
        });

        setMarkers(newMarkers);
        map.setBounds(bounds);
      }
    });
  }, [map, keywordTxt]);

  const handleKeywordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!map) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keywordTxt, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();
        const newMarkers = data.map((place: any) => {
          const lat = parseFloat(place.y);
          const lng = parseFloat(place.x);
          bounds.extend(new window.kakao.maps.LatLng(lat, lng));
          return {
            position: { lat, lng },
            content: place.place_name,
            address: place.address_name,
          };
        });

        setMarkers(newMarkers);
        map.setBounds(bounds);
      }
    });
  };

  return (
    <div className="">
      <Map
        center={{ lat: 37.566826, lng: 126.9786567 }}
        style={{ width: "100%", height: "350px" }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>
                {marker.content}
                <br />
                {marker.address}
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
      <div className="flex flex-col justify-center items-center mt-6 gap-y-12">
        <h3>검색어를 자세 하게 입력 해주세요</h3>
        <form onSubmit={handleKeywordSubmit} className="flex gap-3">
          <input
            type="text"
            value={keywordTxt}
            onChange={(e) => setKeyWordTxt(e.target.value)}
            placeholder="장소를 검색하세요"
            className="p-2 rounded-lg invalid:border-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
          <button
            type="submit"
            className="bg-[#FD943F] text-white rounded-lg px-4 py-2"
          >
            검색
          </button>
        </form>
      </div>
    </div>
  );
};

export default MapPage;
