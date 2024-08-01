import { fetchWriteiconBottom } from "@/lib/db";

export default async function  Dwritebottomicon() {
    const fetcher= await fetchWriteiconBottom();

    return (
        <ul style={{display:'flex'}}>
      {fetcher.map((item, index) => (
        <li key={index}>
           <img src={item.imgurl} alt="이미지" />
          {item.name}
        </li>
      ))}
    </ul>
    )
}














