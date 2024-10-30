export default function ThemasSkeleton(){
    return(
        <div className="w-full flex flex-col gap-2">
            <div className="bg-slate-300 h-11 w-36 mx-auto rounded-lg"></div>
            <ul className="flex justify-evenly gap-2">
                <li className="w-40 h-40 bg-slate-300 rounded-lg"></li>
                <li className="w-40 h-40 bg-slate-300 rounded-lg"></li>
                <li className="w-40 h-40 bg-slate-300 rounded-lg"></li>
            </ul>
            <div className="bg-slate-300 h-11 w-36 mx-auto mt-6 rounded-lg"></div>
            <ul className="flex justify-evenly gap-2">
                <li className="w-40 h-40 bg-slate-300 rounded-lg"></li>
                <li className="w-40 h-40 bg-slate-300 rounded-lg"></li>
                <li className="w-40 h-40 bg-slate-300 rounded-lg"></li>
            </ul>
        </div>
    );
}