"use client";

import { useRouter } from 'next/navigation';

export default function DeleteDiaryButton({ pathId }: { pathId: number }) {
  const router = useRouter();

  const handleDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      fetch('/api/delete-diary', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: pathId }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete record');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message); // 서버에서 보낸 메시지
        router.push('/main/diary');
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };

  return (
   <div>
     <button type="button" onClick={handleDelete}>
      삭제
    </button>
    <button>
        목록
    </button>
   </div>
  );
}
