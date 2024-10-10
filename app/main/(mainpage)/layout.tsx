import BottomMenu from "@/components/main/BottomMenu";
import { ReactNode, Suspense } from "react";

export default function Layout({children}: {children:ReactNode}){
    return (<div>
        {children}
        <Suspense fallback={<div>Loading..</div>}>
            <BottomMenu/>
        </Suspense>
    </div>)
}