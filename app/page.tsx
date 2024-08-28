import HeaderPage from "@/components/Header";
import LoginPage from "@/components/login";
import LoginPageImg from "@/components/loginImg";
import Link from "next/link";

export default async function Index() {
  return (
    <div>
      <HeaderPage />
      <LoginPageImg />
      <LoginPage />
    </div>
  );
}
