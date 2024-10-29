'use client'
import { LoginState } from "@/app/recoil/selectors";
import { fetchCommentUserData, fetchCommunityUserData } from "@/lib/db";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function SettingCommentList(){
    const dataUid = useRecoilValue(LoginState);
    const [datas, setDatas] =  useState(0);
    const [dataComments, setDatasComment] =  useState(0);
    
    useEffect(()=>{
        const fetch = async ()=>{
            const data =  await fetchCommunityUserData(dataUid.uid);
            const dataC = await fetchCommentUserData(dataUid.uid);
            if(data && dataC){
                setDatas(data.length);
                setDatasComment(dataC.length)
            }
        }
        fetch();
    },[])
    return(
    <div className="flex flex-col"> 
        <p>내가 작성한 글{datas}</p>
        <p>내가 작성 한 댓글 {dataComments}</p>
    </div>)
}