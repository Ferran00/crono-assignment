import { useEffect, useState } from 'react';

/**
 * Data type for the onboarding processes obtained from the backend. the mockup contains 5.
 */
type OnboardingItem = {
  title: string;
  duration: string;
  iconUrl: string;
};

export function Onboarding() {
  const [onboardingItems, setOnboardingItems] = useState<OnboardingItem[]>([]);

  /**
   * Fetches dummy data from /onboarding_items_dummy.json asynchronously.
   * if it finds the onboarding items, it sets them to the counts state variable.
   * if there's an error fetching, it sets the state variable to an empty object.
   */
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}dummy_data/onboarding_items_dummy.json`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load onboarding items');
        return response.json() as Promise<OnboardingItem[]>;
      })
      .then(setOnboardingItems)
      .catch(() => setOnboardingItems([]));
  }, []);

  return (
    <section className="dashboard-card h-full">
      <h2 className="mb-3 font-semibold text-[#010E27]">Onboarding</h2>
      <div className="divide-y divide-[#E6E9F2]">
        {onboardingItems.map((item) => (
          <button
            type="button"
            key={item.title}
            className="flex w-full items-center gap-4 py-5 text-left hover:bg-slate-50"
          >
            <img
              src={`${import.meta.env.BASE_URL}icons/onboarding/${item.iconUrl}`}
              alt=""
              className="h-12 w-12 shrink-0"
            />
            <h2 className="min-w-0 flex-1 truncate text-base font-semibold text-[#010E27]">
              {item.title}
            </h2>
            <span className="shrink-0 text-sm text-slate-400">{item.duration}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
