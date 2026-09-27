import { useEffect, useState } from 'react';

/**
 * Array of values for the drawing of each metric in the UI
 */
const metrics = [
  {
    key: 'contactsEngaged',
    label: 'Contacts engaged',
    color: 'text-[#4389F7]',
    bar: 'bg-[#4389F7]',
    icon: 'contact.svg',
  },
  {
    key: 'companiesEngaged',
    label: 'Companies engaged',
    color: 'text-[#3B58DB]',
    bar: 'bg-[#3B58DB]',
    icon: 'company.svg',
  },
  {
    key: 'activities',
    label: 'Activities',
    color: 'text-[#9149E8]',
    bar: 'bg-[#9149E8]',
    icon: 'tasks.svg',
  },
  {
    key: 'meetings',
    label: 'Meetings',
    color: 'text-[#E4AA00]',
    bar: 'bg-[#E4AA00]',
    icon: 'video.svg',
  },
  {
    key: 'deals',
    label: 'Deals',
    color: 'text-[#E65FD2]',
    bar: 'bg-[#E65FD2]',
    icon: 'sales.svg',
  },
  {
    key: 'pipeline',
    label: 'Pipeline',
    color: 'text-[#1BAA77]',
    bar: 'bg-[#1BAA77]',
    icon: 'analytics.svg',
    prefix: '€',
  },
];

type PerformanceValues = {
  value: number;
  target: number;
};

/**
 * Truncates values over 1000 by adding a "K" for display purposes.
 * For example, 50000 is truncated to "50K"
 */
function formatMetricValue(value: number): string {
  return value >= 1000 ? `${value / 1000}K` : String(value);
}

export function MonthlyPerformance() {
  const [performanceValues, setPerformanceValues] = useState<Record<string, PerformanceValues>>({});
  const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());

  /**
   * Fetches dummy data from /monthly_performance_values_dummy.json asynchronously.
   * if it finds the values, it sets them to the performanceValues state variable.
   * if there's an error fetching, it sets the state variable to an empty object.
   */
  useEffect(() => {
    fetch('/dummy_data/monthly_performance_values_dummy.json')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load performance metrics');
        return response.json() as Promise<Record<string, PerformanceValues>>;
      })
      .then(setPerformanceValues)
      .catch(() => setPerformanceValues({}));
  }, []);

  return (
    <section className="dashboard-card h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-[#010E27]">{currentMonth}'s performance</h2>
        <button type="button" className="flex items-center gap-2 text-sm font-medium text-[#0A9B94]">
          Edit KPIs
          <img src={`${import.meta.env.BASE_URL}icons/edit.svg`} alt="" className="h-3 w-3" />
        </button>
      </div>
      
      {/* Draw, in a grid, each of the metrics, with its values */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {metrics.map((metric) => {

          const metricPerformanceValues = performanceValues[metric.key] ?? { value: 0, target: 0 };
          const percentage:number = (metricPerformanceValues.value/metricPerformanceValues.target)*100;

          return (
            <div key={metric.label} className="rounded-xl border border-[#E6E9F2] px-3 py-2.5">
              <p className="truncate text-sm font-medium text-[#43506A]">{metric.label}</p>
              <div className="mt-3 flex items-center gap-2">

                {/* Icon */}
                <img src={`${import.meta.env.BASE_URL}icons/${metric.icon}`} alt="" className="h-5 w-5" />

                {/* value */}
                <span className={`text-xl font-medium ${metric.color}`}>
                  {metric.prefix}{formatMetricValue(metricPerformanceValues.value)}
                </span>

                {/* value target */}
                <span className="text-xl text-slate-300">/{formatMetricValue(metricPerformanceValues.target)}</span>
              </div>
              
              {/* Progress bar */}
              <div className="mt-2 h-1 rounded-full bg-slate-100">
                <div
                  className={`h-1 rounded-full ${metric.bar}`}
                  style={{ width: `${percentage}%` }}/>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
