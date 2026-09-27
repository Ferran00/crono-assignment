import { Sidebar } from './components/Sidebar/Sidebar';
import { SignalsList } from './components/SignalsList/SignalsList';
import { Welcome } from './components/Welcome/Welcome';

function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
        <main className="min-w-0 flex-1 p-5 sm:p-4">
          <div className="grid grid-cols-12 gap-6"> {/* TODO: precise gap */}
            <div className="col-span-12 lg:col-span-4">
              <Welcome />
            </div>
            <div className="col-span-12 lg:col-span-8" />
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
