import DogSelectImg from "@/app/components/DogselectImg";
import ThemaSelectImg from "@/app/components/ThemaSelect";
import Link from "next/link";
import NameForm from "@/app/components/name";

export default function DogSelectPage() {
  return (
    <>
      <DogSelectImg />
      <ThemaSelectImg />
      <NameForm />
    </>
  );
}
