import WriteDiary from "@/components/DwriteDiary";
import { dateFunc } from "@/lib/db";

export default function Page(){
  const date = dateFunc();
  return <section>
    <h3>{date}</h3>
    <WriteDiary/> </section>
}