export default function DiaryPageSkeeleton() {
    return (
      <div className="w-3/4 mx-auto">
        <ul className="flex w-full justify-evenly">
          <li className="h-28 w-16 bg-slate-300 rounded-lg"></li>
          <li className="h-28 w-16 bg-slate-300 rounded-lg"></li>
          <li className="h-28 w-16 bg-slate-300 rounded-lg"></li>
          <li className="h-28 w-16 bg-slate-300 rounded-lg"></li>
          <li className="h-28 w-16 bg-slate-300 rounded-lg"></li>
          <li className="h-28 w-16 bg-slate-300 rounded-lg"></li>
        </ul>
        <div className="w-full bg-slate-300 rounded-lg h-9 mt-9"></div>
        <div className="w-full bg-slate-300 rounded-lg h-9 mt-1"></div>
      </div>
    );
  }
  