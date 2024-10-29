"use client";
import useGeolocation from "react-hook-geolocation";
import axios from "axios";
import { WeatherURL, WeatherSERVICEKEY } from "@/lib/db";
import useSWR from "swr";
import { useEffect, useState, useRef } from "react";
import { Address, CityDataList } from "@/lib/typs";

declare global {
  interface Window {
    kakao: any;
  }
}
interface ResultItem {
  address: Address;
}
export default function TopMenu({ dogName }: { dogName: string }) {
  const [addr, setAddr] = useState("");
  const [addrInfo, setAddrInfo] = useState<CityDataList | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(WeatherURL, {
        params: {
          serviceKey: WeatherSERVICEKEY,
          returnType: "json",
          numOfRows: 25,
          pageNo: 1,
          sidoName: "서울",
          searchCondition: "HOUR",
        },
      });
      return response.data.response.body.items;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error } = useSWR("weatherData", fetchData);

  const geolocation = useGeolocation();
  const latitude = geolocation.latitude;
  const longitude = geolocation.longitude;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=843e559943bc29af86f736a7f1d33577&libraries=services&autoload=false";
      const { kakao } = window;

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(function () {
            const geocoder = new window.kakao.maps.services.Geocoder();
            const coord = new window.kakao.maps.LatLng(latitude, longitude);
            geocoder.coord2Address(
              coord.getLng(),
              coord.getLat(),
              (result: ResultItem[], status: string) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const adr = result[0].address.region_2depth_name;
                  setAddr(adr);
                  console.log("Address:", adr);
                } else {
                  console.log("Geocoding failed:", status);
                }
              }
            );
          });
        } else {
          console.error("Kakao Maps API failed to load.");
        }
      };
      document.head.appendChild(script);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (data && addr) {
      const fetchDataPm = data.find(
        (item: CityDataList) => item.cityName === addr
      );
      setAddrInfo(fetchDataPm || null);
    }
  }, [data, addr]);

  return (
    <div className="absolute w-full top-44 z-10">
      <div className="relative">
        <div className="rounded-lg w-56 min-h-32 opacity-65 bg-black mx-auto"></div>
        <div className="absolute top-0 right-0 left-0 w-56 min-h-32 mx-auto text-white">
          {addrInfo ? (
            <div className="flex flex-col min-h-32 justify-around p-4">
              <h3 className="text-center text-lg">{dogName}</h3>
              <div className="flex justify-between px-6">
                <h4>지역</h4>
                <div>{addrInfo.cityName}</div>
              </div>
              <div className="flex justify-between px-6">
                <h4>미세먼지</h4>
                <div>
                  {Number(addrInfo.pm10Value) <= 30
                    ? "좋음"
                    : 31 <= Number(addrInfo.pm10Value) &&
                      Number(addrInfo.pm10Value) <= 80
                    ? "보통"
                    : 81 <= Number(addrInfo.pm10Value) &&
                      Number(addrInfo.pm10Value) <= 150
                    ? "나쁨"
                    : "매우나쁨"}
                </div>
              </div>
            </div>
          ) : (
            <>안나와요</>
          )}
        </div>
      </div>
    </div>
  );
}
