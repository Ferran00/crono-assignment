import { LOGGED_USER } from '../../constants/userConstants';

export function Welcome() {
  return (
    <section className="dashboard-card flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-[#010E27] mb-2">Welcome {LOGGED_USER.NAME},</h1>
      <p className="text-slate-500 text-sm mb-6">
        Here's your performance overview where you can track your daily and monthly KPIs
      </p>
    </section>
  );
}
