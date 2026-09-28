import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
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
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // Ref assigned to the Action button clicked, if any
  const actionBtnAreaRef = useRef<HTMLDivElement>(null);
  // Ref assigned to the open dropdown menu, if there is one
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

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
      const target = event.target as Node;
      const clickedAction = actionBtnAreaRef.current?.contains(target);
      const clickedMenu = dropdownRef.current?.contains(target);

      if (!clickedAction && !clickedMenu) setDropdownOpen(null);
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
    setDropdownOpen(null);

    // show success toast
    toast.success(action == "complete" ? "Signal Completed" : "Signal Deleted")
  };

  /**
   * Handles the clicking on the Action button. Opens and closes the dropdown menu.
   * Draws the dropdown menu relative to the Action button's position
   * @param signalId id of the signal in question
   * @param button Action button clicked
   */
  const handleActionClicked = (signalId: string, button: HTMLButtonElement) => {
    if (dropdownOpen === signalId) {
      setDropdownOpen(null);
      return;
    }

    const buttonRect = button.getBoundingClientRect();
    const menuWidth = 220;
    const left = Math.max(
      8,
      Math.min(buttonRect.right - menuWidth, window.innerWidth - menuWidth - 8),
    );

    setMenuPosition({
      top: buttonRect.bottom + 8,
      left,
    });
    setDropdownOpen(signalId);
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
      <div className={`max-h-[360px] ${dropdownOpen ? 'overflow-y-hidden' : 'overflow-y-auto'} [scrollbar-gutter:stable] divide-y divide-slate-100 pr-2 scrollbar-thin scrollbar-thumb-slate-200`}>
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
                  src={`${import.meta.env.BASE_URL}icons/company-avatars/amazon-avatar.svg`}
                  alt="Company Avatar"
                  className='rounded-full ring-2 ring-white h-8 w-8 min-h-8 min-w-8'
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
              <div className="relative" ref={dropdownOpen === signal.id ? actionBtnAreaRef : undefined}>
                {/* Action button */}
                <button type="button" aria-expanded={dropdownOpen === signal.id}
                  onClick={(event) => handleActionClicked(signal.id, event.currentTarget)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#00bba7] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#00a392]"
                >
                  Action
                </button>

                {/* Dropdown menu. Rendered through a portal */}
                {dropdownOpen === signal.id && createPortal(
                  <div
                    ref={dropdownRef}
                    style={{ top: menuPosition.top, left: menuPosition.left }}
                    className="fixed z-[100] w-[220px] overflow-hidden rounded-2xl border border-slate-100 bg-white p-1 text-left shadow-lg"
                  >
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
                  </div>,
                  document.body,
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
