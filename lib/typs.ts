export interface BottomMenuType {
  id: number;
  backurl: string;
  menutext: string;
}

export interface CityDataList {
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

export interface Address {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  zip_code: string;
}

export interface ImgType {
  id: number;
  name: string;
  imgurl: string;
  imgurlO: string;
}

export interface DataType {
  id: number;
  uuid: string;
  eat: string;
  pill: string;
  hospital: string;
  beauty: string;
  walkimg: string;
  eatimg: string;
  pillimg: string;
  hospitalimg: string;
  beautyimg: string;
  content: string;
  date: Date;
  walk: string;
  walkicon: string;
  eaticon: string;
  pillicon: string;
  hospitalicon: string;
  beautyicon: string;
}

export interface IconsType {
  id: number;
  walk: string;
  eat: string;
  pill: string;
  hospital: string;
  beauty: string;
}

export interface IconType {
  id: number;
  name: string;
  imgurl: string;
}

export interface CommunityType {
  id: number;
  uuid: string;
  title: string;
  content: string;
  imgurl: string;
  date: Date;
}

export interface CommentType {
  mainid:number;
  id: number;
  uuid: string;
  content: string;
  date: Date;
}
