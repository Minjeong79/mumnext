import HeaderPage from "@/components/Header";
import LoginPage from "@/components/login";
import LoginPageImg from "@/components/loginImg";

export default async function Index() {
  return (
    // <div className="max-w-[800px] h-[800px] w-full m-auto flex flex-col justify-around">
    <div className="w-full sm:max-w-[800px] sm:h-[800px] m-auto flex flex-col justify-around">
      <HeaderPage />
      <LoginPageImg />
      <LoginPage />
    </div>
  );
}
