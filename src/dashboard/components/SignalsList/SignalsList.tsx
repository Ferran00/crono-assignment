import React, { useEffect, useState } from 'react';
import signalsDummy from '../../../../public/signals_dummy.json';
import companyAvatar from '../../../../public/icons/companyAvatar.svg';
import { getSignalTitle, formatSignalDate, getTagStyle } from './signalsUtils';
import { SIGNAL_TYPE_LABELS } from './signalsConstants';

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
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  /**
   * Fetches dummy data from /signals_dummy.json asynchronously.
   * if it finds the signals, it sets them to the signals state variable.
   * if there's an error fetching the signals, it sets the state variable to an empty array.
   * sets loading to false when done.
   */
  useEffect(() => {
    fetch('/signals_dummy.json').then((response) => {
      if (!response.ok)
        throw new Error('Unable to load signals');
      return response.json() as Promise<Signal[]>;
    })
    .then(setSignals)
    .catch(() => setSignals([]))
    .finally(() => setLoading(false));
  }, []);

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
            {/* left side: qvatar, title and tags */}
            <div className="flex items-center gap-3.5 min-w-0">
              
              {/* Avatar */}
              <img
                src={companyAvatar}
                alt="Company Avatar"
              />
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
              <button
                type="button"
                className="bg-[#00bba7] hover:bg-[#00a392] text-white font-medium text-sm px-5 py-1.5 rounded-full transition-colors"
              >
                Action
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
