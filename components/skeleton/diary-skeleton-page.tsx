export default function DiaryPageSkeeleton() {
  return (
    <div className="flex flex-col items-center h-screen w-3/4 mx-auto sm:mt-5">
      <div className="w-28 bg-slate-300 rounded-lg h-9 m-9"></div>
      <ul className="flex w-full justify-evenly mt-16 gap-x-px ">
        <li className="h-28 w-16 bg-slate-300 rounded-lg"></li>
        <li className="h-28 w-16 bg-slate-300 rounded-lg"></li>
        <li className="h-28 w-16 bg-slate-300 rounded-lg"></li>
        <li className="h-28 w-16 bg-slate-300 rounded-lg"></li>
        <li className="h-28 w-16 bg-slate-300 rounded-lg"></li>
        <li className="h-28 w-16 bg-slate-300 rounded-lg"></li>
      </ul>
      <div className="w-full bg-slate-300 rounded-lg h-9 mt-9"></div>
      <div className="w-full bg-slate-300 rounded-lg h-9 mt-1"></div>{" "}
    </div>
  );
}
