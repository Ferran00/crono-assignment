import { Toaster } from "sonner";
import Dashboard from "./dashboard/Dashboard";

function App() {

  return (
    <>
      <Dashboard/>
      
      {/* Global Toast Container */}
      <Toaster position="bottom-center" richColors
        toastOptions={{
            classNames: {
              title: 'text-sm font-bold text-slate-800',
            },
          }}/>
    </>
  )
}

export default App
