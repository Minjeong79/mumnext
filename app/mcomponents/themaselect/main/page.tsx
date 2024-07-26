import BottomMenu from "@/app/ccomponents/BottomMenu";
import TopMenu from "@/app/ccomponents/TopMenu";

export default function MainPage() {
  return (
    <div style={{display:'flex', justifyContent:'center', height: "800px",width:'100%' }}>
      <TopMenu/>
      <BottomMenu />
    </div>
  );
}
