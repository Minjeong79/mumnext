import Link from "next/link";

export default function ThemaSelectPage(){
    return <>
     <h1>테마 선택 화면</h1>
        <div>
            <Link href="/components/dogSelect/main">테마1 </Link>
            <Link href="/main">테마2 </Link>
            <Link href="/main">테마3</Link>
        </div>
        </>
}