import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function PUT(request: Request) {
  const { data, error } = await supabase
    .from("community")
    .update({ other_column: "otherValue" })
    .eq("some_column", "someValue")
    .select();
}
