import Link from "next/link";

export default function DogSelectPage(){
    return <>
        <h1>강아지 선택 화면</h1>
        <div>
            <Link href="/components/dogSelect/thema1">강아지1 </Link>
            <Link href="/components/dogSelect/thema2">강아지2 </Link>
            <Link href="/components/dogSelect/thema3">강아지3</Link>
        </div>
    </>
}