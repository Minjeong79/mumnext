'use client';
import Dwritebottomicon from "@/app/components/Dwritebottomicon";
import DwriteTopicon from "@/app/components/DwriteTopicon";
import { useFormState } from 'react-dom';

export default function Write(){
    return<>
    <h3>날짜</h3>
        <form>
            <DwriteTopicon/>
            <Dwritebottomicon/>
            <textarea
                className="resize-none border border-[#F5BB8C] w-full h-40 p-2.5 bg-transparent outline-none rounded-md"
                // value={txtValue}
                // onChange={(e) => setTextValue(e.target.value)}
              ></textarea>
              <button>등록</button>
              <button>취소</button>
        </form>
    </>
   
}