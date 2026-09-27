import { useState } from 'react';

const items = [
  ['dashboard.svg', 'Dashboard'],
  ['find.svg', 'Find New'],
  ['dashboard.svg', 'Lists'],
  ['add.svg', 'Templates'],
  ['strategy.svg', 'Sequences'],
  ['tasks.svg', 'Tasks'],
  ['inbox.svg', 'Inbox'],
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
        className={`mb-10 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}
      >

        {/* company logo */}
        <img
          src={collapsed ? '/icons/crono-logo-small.svg' : '/icons/crono-logo.svg'}
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
              <img src={`/icons/${"back-arrow.svg"}`} alt="" className="h-5 w-5" />
            </button>
          )}
      </div>

      {/* expand button */}
      {collapsed && (
        <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="text-xl text-slate-400"
            aria-label="Expand sidebar"
          >
            <img src={`/icons/${"back-arrow.svg"}`} alt="" className="h-5 w-5"
              style={{ transform: 'scaleX(-1)' }}          /* Flip icon horizontally */
            />
          </button>
      )}

      {/* entries */}
      <nav className="space-y-2">
        {items.map(([icon, label]) => (
          <button
            type="button"
            key={label}
            title={collapsed ? label : undefined}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-500 hover:bg-slate-50 ${collapsed ? 'justify-center' : ''}`}
          >
            <img src={`/icons/${icon}`} alt="" className="h-5 w-5" />
            {!collapsed && label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
