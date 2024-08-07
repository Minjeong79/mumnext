import Link from "next/link";
import LoginPageImg from "./components/loginpage/loginImg";
import LoginPage from "./components/loginpage/login";
import HeaderPage from "./components/Header";

export default async function Index() {
  return (
    <div>
      <HeaderPage />
      <LoginPageImg />
      <LoginPage />
    </div>
  );
}
