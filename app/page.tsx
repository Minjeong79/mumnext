import Link from "next/link";
import LoginPageImg from "./components/loginpage/loginImg";
import LoginPage from "./components/loginpage/login";

export default async function Index() {
  return (
    <div>
      <div>
        <LoginPageImg />
      </div>
      <LoginPage />
    </div>
  );
}
