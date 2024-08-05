'use client'
import { useFormState } from "react-dom";
import { dogSelectState, themaSelectState } from "@/app/recoil/selectors";
import { useRecoilValue } from "recoil";
import { supabase } from "@/lib/db";
import { PostgrestError } from '@supabase/supabase-js';
import { useState } from "react";

export default function NameForm() {
  const [name, setName] = useState('');
  const dogPick = useRecoilValue(dogSelectState);
  const themaPick = useRecoilValue(themaSelectState);
  
console.log(dogPick);
console.log(themaPick);

async function createData() {
  const { data, error } = await supabase
  .from('dogthemaname')
  .insert([
    { uuid: 'someValue', dog: dogPick, thema : themaPick, name:name},
  ])

  if(error){
    return error
  }
 console.log(data);
  return data;
}

const initialErrorState: PostgrestError | null = null;
const [state, formAction] = useFormState(createData,  null );  

  return (
    <div>
      <form action={formAction}>
        <input type="text" name="textname" id="name" value = {name} onChange={(e) => setName(e.target.value)} required/>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
