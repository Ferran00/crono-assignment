import { useState } from "react";

export function Replies() {
  const [replyNum] = useState<number>(24);

  return (
    <section className="dashboard-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-[#010E27]">Replies</h2>
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-medium text-[#0A9B94]"
        >
          Open inbox
          <span aria-hidden="true" className="text-sm leading-none">{'>'}</span>
        </button>

      </div>
      <div className="flex items-center gap-5 rounded-2xl bg-[#E9F8F8] px-6 py-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D3F2F1]">
          <img src={`${import.meta.env.BASE_URL}icons/inbox.svg`} alt="" className="h-7 w-7" />
        </div>
        <span className="text-5xl font-medium leading-none text-[#010E27]">{replyNum}</span>
      </div>
    </section>
  );
}
