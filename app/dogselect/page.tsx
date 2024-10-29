import DogSelectImg from "@/components/DogselectImg";
import NameForm from "@/components/NameForm";
import ThemaSelectImg from "@/components/ThemaSelect";

export default function DogSelectPage() {
  return (
    <div className="bg-[#FFEAD9] min-h-screen w-screen flex justify-center items-center">
     <div className="w-7/12 flex flex-col justify-center gap-y-8">
      <DogSelectImg />
      <ThemaSelectImg />
      <NameForm/>
      </div>
    </div>
  );
}
