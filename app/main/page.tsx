import BottomMenu from "@/components/main/BottomMenu";
import MainImg from "@/components/main/MainImg";
import TopMenu from "@/components/main/TopMenu";

export default function MainPage() {
  return (
    <div className="bg-[#FFEAD9] min-h-screen w-screen flex justify-center items-center">
      <div className=" flex flex-col min-h-screen justify-between position">
        <MainImg />
        <TopMenu />
        <BottomMenu />
      </div>
    </div>
  );
}
