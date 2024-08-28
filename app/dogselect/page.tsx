import DogSelectImg from "@/components/DogselectImg";
import NameForm from "@/components/NameForm";
import ThemaSelectImg from "@/components/ThemaSelect";
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
