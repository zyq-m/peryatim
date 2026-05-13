/* eslint-disable react-refresh/only-export-components */
import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom"
import { useStore } from "@/store/useStore"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { LoginPage } from "@/pages/login"
import { DashboardPage } from "@/pages/dashboard"
import { OrphansPage } from "@/pages/orphans"
import { AdmissionsPage } from "@/pages/admissions"
import { DonationsPage } from "@/pages/donations"
import { FinancesPage } from "@/pages/finances"
import { ReportsPage } from "@/pages/reports"
import { GuardianApplicationPage } from "@/pages/guardian-application"
import { GuardianTrackPage } from "@/pages/guardian-track"
import { DonorDonatePage } from "@/pages/donor-donate"
import { DonorHistoryPage } from "@/pages/donor-history"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useStore.getState().user
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function RoleRoute({
  children,
  roles,
}: {
  children: React.ReactNode
  roles: string[]
}) {
  const user = useStore.getState().user
  if (!user) return <Navigate to="/login" replace />
  if (!roles.includes(user.role)) return <Navigate to="/login" replace />
  return <>{children}</>
}

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: (
          <RoleRoute roles={["admin", "staff"]}>
            <DashboardPage />
          </RoleRoute>
        ),
      },
      {
        path: "orphans",
        element: (
          <RoleRoute roles={["admin", "staff"]}>
            <OrphansPage />
          </RoleRoute>
        ),
      },
      {
        path: "admissions",
        element: (
          <RoleRoute roles={["admin", "staff"]}>
            <AdmissionsPage />
          </RoleRoute>
        ),
      },
      {
        path: "donations",
        element: (
          <RoleRoute roles={["admin", "staff"]}>
            <DonationsPage />
          </RoleRoute>
        ),
      },
      {
        path: "finances",
        element: (
          <RoleRoute roles={["admin", "staff"]}>
            <FinancesPage />
          </RoleRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <RoleRoute roles={["admin"]}>
            <ReportsPage />
          </RoleRoute>
        ),
      },
      {
        path: "guardian/apply",
        element: (
          <RoleRoute roles={["guardian"]}>
            <GuardianApplicationPage />
          </RoleRoute>
        ),
      },
      {
        path: "guardian/track",
        element: (
          <RoleRoute roles={["guardian"]}>
            <GuardianTrackPage />
          </RoleRoute>
        ),
      },
      {
        path: "donor/donate",
        element: (
          <RoleRoute roles={["donor"]}>
            <DonorDonatePage />
          </RoleRoute>
        ),
      },
      {
        path: "donor/history",
        element: (
          <RoleRoute roles={["donor"]}>
            <DonorHistoryPage />
          </RoleRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]

export const router = createBrowserRouter(routes)
