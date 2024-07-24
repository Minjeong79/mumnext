import Link from "next/link";
import LoginPageImg from "./mcomponents/loginpage/login"; 


export default async function Index() {
  
  return (
    <div>
      <div>
        <LoginPageImg/>
      </div>
      <p>
        <Link href="/mcomponents/dogselect">카카오 로그인</Link>
      </p>
    </div>
  );
}
