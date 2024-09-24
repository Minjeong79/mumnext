import { CommunityType } from "@/lib/typs";
import CommunityList from "./Clist";

export default function SearchCommunity({
  fetchDatas,
}: {
  fetchDatas: CommunityType[];
}) {
  return <div style={{border:'1px solid #999'}}>
    <input type="text"/>
    <CommunityList fetchDatas={fetchDatas} />
  </div>;
}
