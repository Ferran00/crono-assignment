import { SignalsList } from "./components/SignalsList/SignalsList"

function Dashboard() {

  return (
    <>
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <SignalsList></SignalsList>
            </div>
            <div className="col-span-4">Sidebar</div>
        </div>
    </>
  )
}

export default Dashboard
