import { useEffect, useState } from "react";

export interface Reply {
  id: string;
  avatarUrl: string;
}

export function Replies() {
  // Array of received replies
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches dummy data from /replies_dummy.json asynchronously.
   * if it finds the replies, it sets them to the replies state variable.
   * if there's an error fetching, it sets the state variable to an empty array.
   * sets loading to false when done.
   */
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}dummy_data/replies_dummy.json`).then((response) => {
      if (!response.ok)
        throw new Error('Unable to load replies');
      return response.json() as Promise<Reply[]>;
    })
    .then(setReplies)
    .catch(() => setReplies([]))
    .finally(() => setLoading(false));
  }, []);

  return (
    <section className="dashboard-card">

      {/* top bar */}
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

      {/* body */}
      {loading && <p className="px-2 py-8 text-center text-sm text-slate-400">Loading replies...</p>}
      {!loading && (
        <div className="flex items-center justify-between gap-5 rounded-2xl bg-[#E9F8F8] px-6 py-4">

          {/* inbox icon and number */}
          <span className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D3F2F1]">
              <img src={`${import.meta.env.BASE_URL}icons/inbox.svg`} alt="" className="h-7 w-7" />
            </div>
            <span className="text-5xl font-medium leading-none text-[#3E485B]">{replies.length}</span>
          </span>

          {/* Company avatars */}
          <div className="inline-flex items-center max-w-full overflow-hidden">
            {replies.slice(0, 4).map((reply)=>
              <img key={reply.id} src={`${import.meta.env.BASE_URL}icons/${reply.avatarUrl}` }
                className='rounded-full border-2 border-white first:ml-0 -ml-2 h-10 w-10 shrink-0 min-h-10 min-w-10 object-cover'></img>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
