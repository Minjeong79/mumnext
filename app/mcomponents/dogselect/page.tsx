import DogSelectImg from "@/app/components/DogselectImg";
import NameForm from "@/app/components/NameForm";
import ThemaSelectImg from "@/app/components/ThemaSelect";
import Link from "next/link";


export default function DogSelectPage() {
  return (
    <>
      <DogSelectImg />
      <ThemaSelectImg />
      <NameForm/>
    </>
  );
}
