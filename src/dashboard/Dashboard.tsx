import DashboardCard from "../components/DashboardCard"

function Dashboard() {

  return (
    <>
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              {/* <DashboardCard>
                <h2 className="font-semibold text-slate-900">Card Content</h2>
              </DashboardCard> */}
              <section className="dashboard-card">
                <h2 className="font-semibold text-slate-900">Signals</h2>
                <p>Never miss a single oportunity: check out your top signals from your 1st-degree LinkedIn connections. </p> {/* TO DO: i18n */}
                <>List</>
              </section>
            </div>
            <div className="col-span-4">Sidebar</div>
        </div>
    </>
  )
}

export default Dashboard
