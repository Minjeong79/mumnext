import BottomMenu from "@/components/main/BottomMenu";
import MainImg from "@/components/main/MainImg";

export default function MainPage() {
  return (
    <div className="bg-[#FFEAD9] min-h-screen w-screen flex justify-center items-center">
      <div className=" flex flex-col justify-between position relative">
        <MainImg />
        <BottomMenu />
      </div>
    </div>
  );
}
