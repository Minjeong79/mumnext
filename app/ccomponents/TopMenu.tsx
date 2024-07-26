"use client";
import useGeolocation from "react-hook-geolocation";
import axios from "axios";
import { WeatherURL, WeatherSERVICEKEY } from "@/lib/db";
import useSWR from "swr";
import { useEffect, useState } from "react";

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
  
  const [kakaoLoaded, setKakaoLoaded] = useState(false);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
     
//         if (window.kakao) {
//           console.log("Kakao Maps API loaded:", window.kakao);
//           console.log("kakao.maps:", window.kakao.maps);
//           console.log("kakao.maps.services:", window.kakao.maps.services);
//           const { kakao } = window;
//           const geocoder = new kakao.maps.services.Geocoder();
//           const coord = new kakao.maps.LatLng(latitude, longitude);
//           const handleGeocoder = async () => {
//             const callback = async function (result: ResultItem[], status: string) {
//               if (status === kakao.maps.services.Status.OK) {
//                 const adr = result[0].address.region_2depth_name;
//                 console.log("Address:", adr);
//               } else {
//                 console.log("Geocoding failed:", status);
//               }
//             };
    
//             geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
//           };
    
//           handleGeocoder();
//         }
//       }
//     }, [ latitude, longitude]);
// console.log(kakaoLoaded);





//   const { data, error } = useSWR("addressData", handleGeocoder);
  
  return (
    <>
      <div>
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
