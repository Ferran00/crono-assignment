import { useEffect, useState } from 'react';

/**
 * Style array. contains the labels and colors to use to display each category of tasks.
 */
const taskCategories = [
  {
    countKey: 'overdue',
    label: 'Overdue',
    color: 'bg-[#FFE6E6]',
    countColor: 'text-[#ED4C5E]',
  },
  {
    countKey: 'pendingManual',
    label: 'Pending Manual',
    color: 'bg-[#FFF2CC]',
    countColor: 'text-[#C99600]',
  },
  {
    countKey: 'pendingAuto',
    label: 'Pending Auto',
    color: 'bg-[#E7F0FF]',
    countColor: 'text-[#3B82E8]',
    error: true,
  },
  {
    countKey: 'completed',
    label: 'Completed',
    color: 'bg-[#E7F5D8]',
    countColor: 'text-[#159B67]',
  },
];

export function TodaysTasks() {
  // map containing the count of tasks for each category. the values will be read from a json (simulating a backend).
  // in a real case scenario, the json data would contain a lot more details.
  const [counts, setCounts] = useState<Record<string, number>>({});

  /**
   * Fetches dummy data from /tasks_dummy.json asynchronously.
   * if it finds the task counts, it sets them to the counts state variable.
   * if there's an error fetching, it sets the state variable to an empty object.
   */
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}dummy_data/tasks_dummy.json`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load tasks');
        return response.json() as Promise<Record<string, number>>;
      })
      .then(setCounts)
      .catch(() => setCounts({}));
  }, []);

  /**
   * Adds the task counts (received thru json) to each task category
   */
  const tasks = taskCategories.map((task) => ({
    ...task,
    count: counts[task.countKey] ?? 0,
  }));

  return (
    <section className="dashboard-card">
      <h2 className="font-semibold text-slate-900">Today's tasks</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tasks.map((task) => (
          <button
            type="button"
            key={task.label}
            className={`relative flex min-h-[122px] flex-col items-start justify-between rounded-2xl p-5 text-left transition-opacity hover:opacity-80 ${task.color}`}
          >
            <div className="flex w-full items-start justify-between">
              <span className={`text-4xl font-medium leading-none ${task.countColor}`}>
                {task.count}
              </span>

              {/* If the task category contains an error flag, display an error alert */}
              {task.error && (
                <span className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-medium text-[#ED4C5E]">
                  1 error
                  <img src={`${import.meta.env.BASE_URL}icons/warning.svg`} alt="" className="h-4 w-4" />
                </span>
              )}

            </div>
            <span className="text-base font-medium text-[#43506A]">{task.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
