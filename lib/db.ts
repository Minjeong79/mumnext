import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function fetchDogImageUrl_2() {
  const { data } = await supabase.storage
    .from("img")
    .getPublicUrl("dogSelect/dog1.png");

    console.log('Fetched public URL:', data.publicUrl);
    return data.publicUrl;
}

