import { supabase } from "@/lib/db";

export default async function CimgPage(){
    const handleimgSubmit = async () => {
        let avatarUrl = '';
        if (selectedFile) {
            const { data, error } = await supabase
              .storage
              .from('community')
              .upload(`write/${selectedFile.name}`, selectedFile, {
                cacheControl: '3600',
                upsert: false
              });
      
            if (error) {
              console.error('Error uploading file:', error.message);
              return;
            }
      
            avatarUrl = data.path; // 파일 업로드 경로를 저장합니다.
          }
      };
}