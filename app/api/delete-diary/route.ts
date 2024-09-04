import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function DELETE(request :Request) {
    const {id} = await request.json();
    try {
        const { error } = await supabase.from("zwritedb").delete().eq("id", id);
        if (error) {
          throw error;
        }
        return NextResponse.json({ message: '일기 삭제' });
    } catch (error) {
        return NextResponse.json({ error: '일기 삭제 못함' }, { status: 500 });
    }
   
}
