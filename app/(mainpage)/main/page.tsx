import BottomMenu from "@/components/main/BottomMenu";
import MainImg from "@/components/main/MainImg";

export default function MainPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div className="min-w-[800px] min-h-[800px] flex flex-col justify-between relative">
          <MainImg />
        </div>
      </div>
    </div>
  );
}
