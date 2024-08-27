"use client";
import useGeolocation from "react-hook-geolocation";
import axios from "axios";
import { WeatherURL, WeatherSERVICEKEY } from "@/lib/db";
import useSWR from "swr";
import { useEffect, useState, useRef } from "react";

interface CityDataList {
  cityName: string;
  cityNameEng: string;
  coValue: string;
  dataGubun: string;
  dataTime: string;
  districtCode: string;
  districtNumSeq: string;
  itemCode: string;
  khaiValue: string;
  no2Value: string;
  numOfRows: string;
  o3Value: string;
  pageNo: string;
  pm10Value: string;
  pm25Value: string;
  resultCode: string;
  resultMsg: string;
  returnType: string;
  searchCondition: string;
  serviceKey: string;
  sidoName: string;
  so2Value: string;
  totalCount: string;
}

interface Address {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  zip_code: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}
interface ResultItem {
    address: Address;
  }
export default function TopMenu() {
const [addr, setAddr] = useState("");

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
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?appkey=843e559943bc29af86f736a7f1d33577&libraries=services&autoload=false';
      const { kakao } = window;
      console.log(kakao)
      
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(function() {
            const geocoder = new window.kakao.maps.services.Geocoder();
            const coord = new window.kakao.maps.LatLng(latitude, longitude);
            geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: ResultItem[], status: string) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const adr = result[0].address.region_2depth_name;
                setAddr(adr);
                console.log("Address:", adr);
              } else {
                console.log("Geocoding failed:", status);
              }
            });
          });
        } else {
          console.error("Kakao Maps API failed to load.");
        }
      };
      document.head.appendChild(script);
    }
  }, [latitude, longitude]);
  
 
  
  
  
  return (
    <>
      <div>
        현재 위치 : {addr}
        <ul>
          {data?.map((item: CityDataList, index: number) => (
            <li key={index}>
              {item.cityName} - {item.pm10Value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}