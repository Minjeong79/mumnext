import HeaderPage from "@/components/Header";
import LoginPage from "@/components/login";
import LoginPageImg from "@/components/loginImg";

export default async function Index() {
  return (
    <div className="bg-[#FFEAD9] min-h-screen w-screen flex justify-center items-center">
    <div className="w-7/12 flex flex-col justify-center">
      <HeaderPage />
      <LoginPageImg />
      <LoginPage />
    </div>
  </div>
  
  );
}
