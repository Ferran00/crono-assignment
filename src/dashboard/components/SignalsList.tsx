import React from 'react';
import signalsDummy from '../../../public/signals_dummy.json';
import companyAvatar from '../../../public/companyAvatar.svg';
import { getSignalTitle, formatSignalDate } from '../utils/signalUtils';

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
  const signals: Signal[] = signalsDummy;

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
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/50 px-2 rounded-xl transition-colors"
          >
            {/* left side: qvatar, title and tags */}
            <div className="flex items-center gap-3.5 min-w-0">
              <img
                src={companyAvatar}
                alt="Company Avatar"
              />
              <div className="min-w-0">
                {/* Title */}
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {getSignalTitle(signal)}
                </p>
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