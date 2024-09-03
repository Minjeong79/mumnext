"use client";
export default function Cwrite() {
  return (
    <div>
      <form>
        <h3>날짜</h3>
        <div>
        <input type="text" name="title" placeholder="제목을 입력해주세요" required/>
        </div>
        <textarea name="content" placeholder="내용을 입력해주세요" required/>
        <input type="file"/>
      </form>
    </div>
  );
}
