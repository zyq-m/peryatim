import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/store/useStore"

export function ReportsPage() {
  const orphans = useStore((s) => s.orphans)
  const donations = useStore((s) => s.donations)
  const expenses = useStore((s) => s.expenses)
  const applications = useStore((s) => s.applications)

  const totalDonations = donations.reduce((s, d) => s + d.amount, 0)
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0)
  const pendingApps = applications.filter((a) => a.status === "pending").length
  const approvedApps = applications.filter((a) => a.status === "approved").length
  const rejectedApps = applications.filter((a) => a.status === "rejected").length

  const maleOrphans = orphans.filter((o) => o.gender === "Male").length
  const femaleOrphans = orphans.filter((o) => o.gender === "Female").length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="text-sm text-muted-foreground">
          Generate and view system reports
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Orphan Statistics</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Orphans</span>
              <span className="font-medium">{orphans.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Male</span>
              <span className="font-medium">{maleOrphans}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Female</span>
              <span className="font-medium">{femaleOrphans}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Donations</span>
              <span className="font-medium">
                RM{totalDonations.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Expenses</span>
              <span className="font-medium">
                RM{totalExpenses.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Net Balance</span>
              <span className="font-medium">
                RM{(totalDonations - totalExpenses).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pending</span>
              <span className="font-medium">{pendingApps}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Approved</span>
              <span className="font-medium">{approvedApps}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rejected</span>
              <span className="font-medium">{rejectedApps}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expense by Category</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            {Array.from(new Set(expenses.map((e) => e.category))).map(
              (category) => {
                const total = expenses
                  .filter((e) => e.category === category)
                  .reduce((s, e) => s + e.amount, 0)
                return (
                  <div key={category} className="flex justify-between">
                    <span className="text-muted-foreground">{category}</span>
                    <span className="font-medium">
                      RM{total.toLocaleString()}
                    </span>
                  </div>
                )
              }
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
