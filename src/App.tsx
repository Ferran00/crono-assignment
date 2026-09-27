import { Toaster } from "sonner";
import Dashboard from "./dashboard/Dashboard";

function App() {

  return (
    <>
      <Dashboard/>
      
      {/* Global Toast Container */}
      <Toaster position="bottom-center" richColors />
    </>
  )
}

export default App
