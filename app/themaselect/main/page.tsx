import BottomMenu from "@/app/components/BottomMenu";
import TopMenu from "@/app/components/TopMenu";

export default function MainPage() {
  return (
    <div style={{display:'flex', justifyContent:'center', height: "800px",width:'100%' }}>
      <TopMenu/>
      <BottomMenu />
    </div>
  );
}
