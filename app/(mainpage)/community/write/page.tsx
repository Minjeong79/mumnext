import Cwrite from "@/components/community/Cwrite";
import { dateFunc } from "@/lib/db";
export default function Page(){
  const date = dateFunc();
    return (
      <section className="flex flex-col gap-y-20 w-3/4 mx-auto">
         <h3 className="text-xl text-center p-9">{date}</h3>
          <Cwrite />
        </section>
      );
}