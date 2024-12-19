<h2>반려견 일기 커뮤니티(Nextjs 구현) </h2>

<img src="https://fpjdvuxtsnhwwltmlwcx.supabase.co/storage/v1/object/public/img/git/main.png" alt="반려견 일기 커뮤니티(Nextjs 구현)"/>
<ul>
        <li>배포 url : https://mumnext.vercel.app/</li>
        <li>Test ID : minj92@kakao.com</li>
        <li>Test PW : fkdnxj0906!!</li>
</ul>

<h3>프로젝트 소개</h3>
<ul>
        <li>나만의 반려견을 위한 일기를 작성 할 수 있습니다.</li>
        <li>다양한 사용자들과의 소통 할 수 있으며 좋아요 와 댓글을 작성 할 수 있습니다.</li>
</ul>


<h3>개발 환경</h3>
<ul>
      <li>Front : Nextjs, Ts, Recoil, Tailwind</li>
      <li>Back : supabase, 공공데이터포털(https://www.data.go.kr/)</li>
      <li>버전 및 이슈 관리 : Github</li>
      <li>디자인 : Figma</li>
      <li>서비스 배포 환경 : vercel</li>
</ul>


<h3>채택한 개발 기술</h3>
<ul>
         <li>
           Nextjs App Router 사용<br>
           React에서는 React Router를 사용해 라우팅을 구성했지만, Next.js는 파일 기반의 라우팅 시스템을 제공해 추가적인 설정 없이도 직관적으로 페이지를 구성할 수 있었습니다. 이로 인해 개발 속도가 빨라지고 유지보수도 쉬워 선택 하였습니다.
         </li>
         <li>상태 관리에는 Recoil을 사용<br>
         기존에 사용했던 Redux와 비교했을 때 Redux는 설정과 관리 과정이 복잡한 반면, Recoil은 이러한 과정을 크게 단축시켜 개발 시간을 절약할 수 있었습니다. 또한, Recoil의 상태 관리는 더 직관적으로 구성되어 있어 코드를 읽고 이해하기가 훨씬 쉬웠습니다.
         </li>
</ul>
<ul>
         <li>카카오 로그인, Supabase를 사용, 공공 api 활용, 카카오 지도 api 활용</li>
         <li>React로 만든 기존 프로젝트에서 UI정리와 커뮤니티와 프로필이 추가</li>
         <li>커뮤니티에선 검색, 이미지 등록, 댓글 기능이 추가</li>
</ul>


<h3>프로젝트 구조</h3>

```/ (루트 디렉터리)
│
├── app/                            # 페이지 및 경로 관리 폴더
│   ├── (mainpage)/
│   │   ├── community/  
│   │   │   ├── [pageid]/  
│   │   │   │   └── page.tsx  
│   │   │   ├── write/  
│   │   │       ├── [cid]/
│   │   │       │   ├── page.tsx
│   │   │       │   └── page.tsx  
│   │   │       └── page.tsx
│   │   │
│   │   ├── diary/  
│   │   │   ├── [id]/  
│   │   │   │   └── page.tsx  
│   │   │   ├── write/
│   │   │       ├── [id]/
│   │   │           ├── page.tsx  
│   │   │           ├── page.tsx  
│   │   │           └── page.tsx  
│   │   │
│   │   ├── main/  
│   │   │   └── page.tsx  
│   │   ├── map/
│   │   ├── setting/  
│   │   │   ├── profile/  
│   │   │       └── page.tsx
│   │   ├── error.tsx  
│   │   └── layout.tsx  
│   │
│   ├── api/                        # API 관련 폴더(수파베이스와 연동 된 routes.ts파일 모음 CRUD)
│   │
│   ├── clayout/                    # 클라이언트 레이아웃 관련
│   │   ├── ClientLayout.tsx  
│   │   └── UidPage.tsx  
│   │
│   ├── dogselect/                 
│   │   └── page.tsx  
│   │
│   ├── recoil/                     # 상태관리 (Recoil)
│   │   ├── atom.ts  
│   │   ├── selectors.ts  
│   │   └── actions.ts  
│   │
│   ├── favicon.ico                 
│   ├── globals.css                 
│   ├── layout.tsx  
│   ├── manifest.ts  
│   ├── page.tsx  
│   └── style.css  
│               
│
├── components/                  
│   │
│   ├── comment/  
│   │   ├── Ccomment.tsx  
│   │   └── CcommentEdit.tsx  
│   │
│   ├── community/  
│   │   ├── Cedit.tsx  
│   │   ├── Clike.tsx  
│   │   ├── Cpage.tsx  
│   │   ├── Csearch.tsx  
│   │   └── Cwrite.tsx  
│   │
│   ├── diary/  
│   │   ├── Ddelete.tsx  
│   │   ├── Dedit.tsx  
│   │   ├── Dediticon.tsx  
│   │   ├── DiaryDataList.tsx  
│   │   ├── DiaryDetailPage.tsx  
│   │   ├── DwriteDiary.tsx  
│   │   └── Dwriteicon.tsx  
│   │
│   ├── main/  
│   │   ├── BottomMenu.tsx  
│   │   ├── MainImg.tsx  
│   │   └── TopMenu.tsx  
│   │
│   ├── setting/  
│   │   ├── commentList.tsx  
│   │   ├── MainImgEdit.tsx  
│   │   ├── UserDelete.tsx  
│   │   └── UserMaiming.tsx  
│   │
│   ├── skeleton/                   # 로딩 스켈레톤 UI
│   │   ├── community-skeleton-list.tsx  
│   │   ├── community-skeleton-page.tsx  
│   │   ├── diary-skeleton-list.tsx  
│   │   ├── diary-skeleton-page.tsx  
│   │   ├── main-skeleton.tsx  
│   │   ├── thema-skeleton.tsx  
│   │   └── DogselectImg.tsx  
│   │
│   ├── Header.tsx  
│   ├── login.tsx  
│   ├── loginImg.tsx  
│   └── NameForm.tsx  
└── lig/
    ├── db.ts
    └── type.ts
```


<h3>페이지 별 주요 기능</h3>
<h4>[첫 페이지] </h4>
<img src="https://github.com/user-attachments/assets/04a4a711-272b-46f3-8391-5f9345736143" alt="첫페이지"/>
<ul>
      <li>로그인이 되어 있지 않은 경우 : SNS 로그인 페이지</li>
      <li>로그인 후 강아지 선택 페이지</li>
</ul>

<h4>[강아지, 테마 , 이름 작성 페이지] </h4>
<img src="https://github.com/user-attachments/assets/7321db39-b0ed-4b15-b9ac-03a35d6114c7" alt="강아지, 테마 , 이름 작성 페이지"/>
<ul>
      <li>원하는 강아지, 테마 , 이름 작성 후 메인 페이지로 이동 됩니다.</li>
      <li>한번 선택 한 정보는 변경 불가합니다.</li>
</ul>

<h4>[ 메인 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/34530b1b-455d-4d3b-a05c-b4bf8e59c238" alt="메인 페이지"/>
<ul>
      <li>사용자가 선택 한 정보 출력(강아지, 테마, 이름)됩니다.</li>
      <li>사용자가 위치한 곳에 따른 미세먼지 농도가 표시 됩니다.</li>
      <li>하단에는 사용자가 선택 할 수 있는 서비스 메뉴가 출력 됩니다.</li>
</ul>


<h4>[ 반려견 일기 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/ffec9136-3059-452a-8144-8f9286c088c5" alt="반려견 일기 페이지"/>
<ul>
      <li>반려견의 하루 일기를 작성, 수정, 삭제 할 수 있습니다.</li>
</ul>


<h4>[ 지도 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/43c45e61-a6f5-4e34-afea-52982b3d150d" alt="지도 페이지"/>
<ul>
      <li>카카오 지도 Api활용 한 검색 페이지 입니다.</li>
</ul>


<h4>[ 커뮤니티 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/9ad41f45-73aa-41d1-ac53-e85f4164f12d" alt="커뮤니티 페이지"/>
<ul>
      <li>사용자들 간의 의사소통을 할 수 있는 공간 이며 좋아요, 댓글을 작성 할 수 있습니다.</li>
      <li>사용자가 원하는 검색어를 통해 검색 목록이 출력 됩니다.</li>
      <li>커뮤니티는 게시판의 형태가 아닌 사용자가 작성한 내용과 등록한 이미지가 같이 출력 되도록 했습니다.</li>
</ul>
<h4>[ 커뮤니티 작성 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/e7a85a30-b6ed-4a39-9399-401a90870d81" alt="커뮤니티 작성 페이지"/>
<ul>
      <li>글을 입력 할 수 있으며 이미지를 등록 할 수 있으며 미리보기가 가능합니다.</li>
      <li>사진+아이콘을 클릭시 이미지를 첨부 할 수 있으며 -클릭시 이미지를 제외 할 수 있습니다.</li>
      <li>게시글 상단에 날짜가 표시 됩니다.</li>
</ul>
<h4>[ 커뮤니티 상세 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/727dccb6-52cb-4094-9243-3ee84fe971ef" alt="커뮤니티 상세 페이지"/>
<ul>
      <li>좋아요와 댓글 수는 실시간으로 상세 페이지에 반영됩니다.</li>
      <li>자신의 댓글일 경우 하단의 연필 아이콘을 클릭시 입력 폼이 변경 되어 수정 가능 하며 휴지통 아이콘 클릭시 삭제 가능 합니다.</li>
      <li>게시글 상단에 날짜가 표시 됩니다.</li>
</ul>


<h4>[ 프로필 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/8b13811d-6127-4819-b009-2458e1b2e774" alt="프로필 페이지"/>
<ul>
      <li>사용자의 반려견 프로필을 수정 할 수 있습니다.</li>
      <li>커뮤니티에서 작성한 글과 댓글 수를 표시 해줍니다.</li>
      <li>사용자가 서비스를 더이상 원하지 않을때 탈퇴 할 수 있습니다.</li>
</ul>



<h3>프로젝트 후기</h3>
반려동물을 키우는 사람들이 쉽게 강아지 일기를 작성하고, 커뮤니티에서 소통할 수 있도록 돕는 것이 목표였습니다.<br> 
또한 실시간 미세먼지 정보를 제공하여 강아지 산책에 도움을 주고자 했습니다.
<br><br>
미세먼지 데이터를 외부 API에서 실시간으로 받아와 렌더링하는 과정에서 <br>
속도 최적화 문제가 있었습니다. 이를 개선하기 위해 Next.js의 서버 측 렌더링(SSR)을 <br>
활용해 데이터를 미리 가져와 사용자에게 빠르게 제공하도록 구현했습니다.<br>
SSR과 CSR의 차이를 학습하며 상태관리를 사용 하면서<br>
어디 부분에서 어떤것을 사용 해야할지 고민 하면서 구현 했습니다.<br>
상태 관리를 구현하면서 몇 가지 문제에 직면했습니다. 특히, 상태는 CSR(Client-Side Rendering)에서 활용할 수 있다는 점을 파악하게 되었고, 이를 효율적으로 관리하기 위해 프로젝트의 구조를 고민해야 했습니다.
상태 관리를 효과적으로 사용하기 위해, 먼저 프로젝트의 레이아웃 구조를 설계했습니다. 이 과정에서 어떤 상태가 전역적으로 관리되어야 하는지, 그리고 어떤 상태가 개별 컴포넌트에 한정되는지를 명확히 정의했습니다.
최종적으로는 효율적인 상태 관리와 레이아웃 구조를 통해, 컴포넌트 간의 의존성을 최소화하면서도 필요한 데이터가 적시에 전달될 수 있도록 시스템을 구축할 수 있었습니다.
<br><br>
프로젝트를 진행하며 사용자 중심 사고가 중요하다는 점을 배웠습니다. <br>
기술적으로 완벽한 기능을 구현하기보다, 사용자가 쉽게 이해하고 사용할 수 있도록 만드는 것이 더 큰 도전이라는 점을 깨달았습니다.
