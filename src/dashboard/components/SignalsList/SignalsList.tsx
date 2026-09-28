import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { getSignalTitle, formatSignalDate, getTagStyle } from './signalsUtils';
import { SIGNAL_TYPE_LABELS } from './signalsConstants';
import { toast } from 'sonner';

/**
 * Data interface to manipulate Dashboard Signals
 */
export interface Signal {  
  id: string;
  timestampMs: number;
  username: string;
  signalType: string;
  inSequence?: boolean;
  previousRole?: string;
  newRole?: string;
  company?: string;
  nPages_Viewed?: number;
  timePagesViewedS?: number;
}

export const SignalsList: React.FC = () => {
  // Array of Signals to display
  const [signals, setSignals] = useState<Signal[]>([]);
  // Indicates which Signal, if any, has the dropdown menu open
  const [openAction, setOpenAction] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // Ref assigned to the open dropdown menu, if there is one
  const actionRef = useRef<HTMLDivElement>(null);

  /**
   * Fetches dummy data from /signals_dummy.json asynchronously.
   * if it finds the signals, it sets them to the signals state variable.
   * if there's an error fetching the signals, it sets the state variable to an empty array.
   * sets loading to false when done.
   */
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}dummy_data/signals_dummy.json`).then((response) => {
      if (!response.ok)
        throw new Error('Unable to load signals');
      return response.json() as Promise<Signal[]>;
    })
    .then(setSignals)
    .catch(() => setSignals([]))
    .finally(() => setLoading(false));
  }, []);

  /**
   * Handles closing the Action dropdown when the user clicks outside of it.
   */
  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (actionRef.current && !actionRef.current.contains(event.target as Node)) setOpenAction(null);
    };
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  /**
   * Removes the indicated signal from the signals array
   * @param id the signal's id
   */
  const removeSignal = (id: string, action:string) => {
    setSignals((current) => current.filter((signal) => signal.id !== id));
    setOpenAction(null);

    // show success toast
    toast.success(action == "complete" ? "Signal Completed" : "Signal Deleted")
  };

  return (
    <section className="dashboard-card">
        
      {/* header */}
      <div className="flex items-center gap-2 mb-1">
        <h2 className="font-semibold text-slate-900">Signals</h2>
        <span className="new-item-count-indicator">
          {signals.length}
        </span>
      </div>
      
      {/* subtitle */}
      <p className="text-slate-500 text-sm mb-6">
        Never miss a single opportunity: check out your top signals from your 1st-degree LinkedIn connections.
      </p>

      {/* scrollable signals list */}
      <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100 pr-2 scrollbar-thin scrollbar-thumb-slate-200">
        {loading && <p className="px-2 py-8 text-center text-sm text-slate-400">Loading signals...</p>}
        {!loading && signals.length === 0 && <p className="px-2 py-8 text-center text-sm text-slate-400">You’re all caught up.</p>}
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/50 px-2 rounded-xl transition-colors"
          >
            {/* left side: avatar, title and tags */}
            <div className="flex items-center gap-3.5 min-w-0">
              
              {/* Avatar and notification bubble */}
              <div className="relative inline-block">
                {/* Avatar */}
                <img
                  src={`${import.meta.env.BASE_URL}icons/amazon-avatar.svg`}
                  alt="Company Avatar"
                  className='rounded-full border-2 border-white'
                />
                {/* notification bubble */}
                <span className="absolute top-0 left-0 h-2 w-2 rounded-full bg-yellow-400 ring-2 ring-white" />
              </div>

              <div className="min-w-0">

                {/* Title */}
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {getSignalTitle(signal)}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {/* signal type tag */}
                  <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${getTagStyle(SIGNAL_TYPE_LABELS[signal.signalType])}`}>
                    {SIGNAL_TYPE_LABELS[signal.signalType]}
                  </span>
                  {/* "In sequence" tag */}
                  {
                    signal.inSequence &&
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${getTagStyle("In sequence")}`}>
                      In sequence
                    </span>
                  }
                </div>

              </div>
            </div>

            {/* right side: date and action button */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="text-xs text-slate-400 font-medium">
                {formatSignalDate(signal.timestampMs)}
              </span>

              {/* Div inside which the dropdown will be placed when opened */}
              <div className="relative" ref={openAction === signal.id ? actionRef : undefined}>
                {/* Action button */}
                <button type="button" aria-expanded={openAction === signal.id}
                  onClick={() => setOpenAction(openAction === signal.id ? null : signal.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#00bba7] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#00a392]"
                >
                  Action
                </button>

                {/* Dropdown menu */}
                {openAction === signal.id &&
                  <div className="absolute right-0 top-10 z-20 w-55 overflow-hidden rounded-2xl border border-slate-100 bg-white p-1 text-left shadow-lg">
                    <button type="button" onClick={() => removeSignal(signal.id, "complete")}
                      className="w-full group flex mb-0.5 items-center justify-between rounded-xl px-4 py-2 text-sm text-slate-700 hover:bg-[#E9F8F8] hover:text-[#0A9B94]" >
                      Complete
                      <img src={`${import.meta.env.BASE_URL}icons/checkmark.svg`} className="" />
                    </button>
                    <button type="button" onClick={() => removeSignal(signal.id, "delete")}
                      className="w-full group flex mt-0.5 items-center justify-between rounded-xl px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                      Delete
                      <img src={`${import.meta.env.BASE_URL}icons/remove.svg`} className="" />
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
