import { createClient } from "@/utils/supabase/server";
import Link from "next/link";


export default async function Index() {

  return (
 <div>
  <p><Link href="/components/dogSelect">로그인</Link></p>
 </div>
  );
}
