import Link from "next/link";

export default function CommunityListPage(){
    return<>
    <ul>
           <li>
              <Link href="/mcomponents/community/01">
              이미지<br/>
                타이틀<br/>
                좋아요
              </Link>
            </li> 
            <li>
              <Link href="">
              이미지<br/>
                타이틀<br/>
                좋아요
              </Link>
            </li> 
            <li>
              <Link href="">
              이미지<br/>
                타이틀<br/>
                좋아요
              </Link>
            </li> 
        </ul></>
}