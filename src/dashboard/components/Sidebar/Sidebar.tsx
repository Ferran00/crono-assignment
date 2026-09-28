import { useState } from 'react';
import { LOGGED_USER } from '../../constants/userConstants';

const items = [
  ['dashboard.svg', 'Dashboard'],
  ['find.svg', 'Find New'],
  ['dashboard.svg', 'Lists'],
  ['add.svg', 'Templates'],
  ['strategy.svg', 'Sequences'],
  ['tasks.svg', 'Tasks'],
  ['inbox.svg', 'Inbox', '24'],
  ['sales.svg', 'Deals'],
  ['analytics.svg', 'Analytics']
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${collapsed ? 'w-25' : 'w-60'} hidden shrink-0 flex-col border-r border-slate-100 bg-white p-5 transition-all md:flex`}
    >
      <div
        className={`flex items-center ${collapsed ? 'justify-center mb-5' : 'justify-between mb-10'}`}
      >

        {/* company logo */}
        <img
          src={collapsed ? `${import.meta.env.BASE_URL}icons/crono-logo-small.svg` : `${import.meta.env.BASE_URL}icons/crono-logo.svg`}
          alt="Crono"
          className={collapsed ? 'h-8 w-8' : 'h-8 w-auto'}
        />
        
        {/* collapse button */}
          {!collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="text-xl text-slate-400"
              aria-label="Collapse sidebar"
            >
              <img src={`${import.meta.env.BASE_URL}icons/${"back-arrow.svg"}`} alt="" className="h-5 w-5" />
            </button>
          )}
      </div>

      {/* expand button */}
      {collapsed && (
        <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="flex w-full items-center justify-center text-xl text-slate-400 mb-3"
            aria-label="Expand sidebar"
          >
            <img src={`${import.meta.env.BASE_URL}icons/${"back-arrow.svg"}`} alt="" className="h-5 w-5"
              style={{ transform: 'scaleX(-1)' }}          /* Flip icon horizontally */
            />
          </button>
      )}

      {/* entries */}
      <nav className="space-y-2">
        {items.map(([icon, label, unreadCount]) => (
          <button
            type="button"
            key={label}
            title={collapsed ? label : undefined}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-500 hover:bg-slate-50 ${collapsed ? 'justify-center' : ''}`}
          >
            <img src={`${import.meta.env.BASE_URL}icons/${icon}`} alt="" className="h-5 w-5" />
            {!collapsed && label}

            {/* Unread bubble */}
            {!collapsed && parseInt(unreadCount) > 0 && (<span className="new-item-count-indicator ml-auto"> {unreadCount} </span>)}
          </button>
        ))}
      </nav>

      {!collapsed && (
        <button
          type="button"
          className={`mt-auto flex items-center gap-3 rounded-xl p-2 text-left hover:bg-slate-50`}
        >
          <img src={`${import.meta.env.BASE_URL}icons/crono-logo-small.svg`} alt="" className="h-10 w-10 shrink-0" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-[#010E27]">
                {LOGGED_USER.NAME} {LOGGED_USER.SURNAME}
              </span>
              <span className="block text-sm text-slate-400">{LOGGED_USER.ROLE}</span>
            </span>
        </button>
      )}
    </aside>
  );
}
