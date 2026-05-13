import { Toaster } from "@/components/ui/sonner"
import { router } from "@/routes"
import { RouterProvider } from "react-router-dom"

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App
