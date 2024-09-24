import { CommunityType } from "@/lib/typs";
import CommunityList from "./Clist";

export default function SearchCommunity({
  search,
}: {
  search?: string | undefined;
}) {
  const handleSerch = () => {
    try {
      const response = fetch("/api/community-seaarch-api", {
        method: "GET",
      });
    } catch (error) {}
  };
  return (
    <div>
      <input type="text" onClick={handleSerch} required />
    </div>
  );
}
