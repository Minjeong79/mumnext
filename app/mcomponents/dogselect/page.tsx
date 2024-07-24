import DogSelectImg from "@/app/ccomponents/DogselectImg";
import ThemaSelectImg from "@/app/ccomponents/ThemaSelect";
import Link from "next/link";
import NameForm from "../themaselect/name";

export default function DogSelectPage() {
  return (
    <>
      <DogSelectImg />
      <ThemaSelectImg />
      <NameForm />
    </>
  );
}
