import { Sidebar } from './components/Sidebar/Sidebar';
import { Replies } from './components/Replies/Replies';
import { SignalsList } from './components/SignalsList/SignalsList';
import { TodaysTasks } from './components/TodaysTasks/TodaysTasks';
import { Welcome } from './components/Welcome/Welcome';

function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
        <main className="min-w-0 flex-1 p-5 sm:p-4">
          <div className="grid grid-cols-12 gap-6"> {/* TODO: precise gap */}
            <div className="col-span-12 grid gap-6 lg:col-span-8 lg:grid-cols-2">
              <Welcome />
              <Replies />
            </div>
            <div className="col-span-12 lg:col-span-4" />
            <div className="col-span-12 lg:col-span-8">
              <TodaysTasks />
            </div>
            <div className="col-span-12 lg:col-span-4" />
            <div className="col-span-12 lg:col-span-8">
              <SignalsList />
            </div>
            <div className="col-span-12 lg:col-span-4" />
          </div>
        </main>
    </div>
  );
}

export default Dashboard;
