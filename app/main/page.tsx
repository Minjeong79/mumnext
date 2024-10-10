import BottomMenu from "@/components/main/BottomMenu";
import MainImg from "@/components/main/MainImg";
import TopMenu from "@/components/main/TopMenu";

export default function MainPage() {
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', height: "800px",width:'100%' }}>
      <MainImg/>
      <TopMenu/>
      <BottomMenu />
    </div>
  );
}
