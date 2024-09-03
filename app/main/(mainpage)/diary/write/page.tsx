import WriteDiary from "@/components/diary/DwriteDiary";
import { dateFunc } from "@/lib/db";

export default function Page(){
  const date = dateFunc();
  return <section>
    <h3>{date}</h3>
    <WriteDiary/> </section>
}