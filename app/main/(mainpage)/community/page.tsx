
import Link from "next/link";

export default function CommunityListPage() {
  return (
    <>
       <h3>커뮤니티</h3><br/>
       <Link href="/main/community/write">작성</Link>
       <br/>커뮤니티 데이터 조회
    </>
  );
}
