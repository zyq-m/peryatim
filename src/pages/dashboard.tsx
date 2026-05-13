import { Users, HeartHandshake, Wallet, UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/store/useStore"

export function DashboardPage() {
  const orphans = useStore((s) => s.orphans)
  const donations = useStore((s) => s.donations)
  const expenses = useStore((s) => s.expenses)
  const applications = useStore((s) => s.applications)

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0)
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const balance = totalDonations - totalExpenses
  const pendingApps = applications.filter((a) => a.status === "pending").length

  const stats = [
    { title: "Total Orphans", value: orphans.length, icon: Users, color: "text-blue-600" },
    { title: "Total Donations", value: `RM${totalDonations.toLocaleString()}`, icon: HeartHandshake, color: "text-green-600" },
    { title: "Balance", value: `RM${balance.toLocaleString()}`, icon: Wallet, color: balance >= 0 ? "text-emerald-600" : "text-red-600" },
    { title: "Pending Apps", value: pendingApps, icon: UserPlus, color: "text-orange-600" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of the orphanage management system
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`size-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Recent Donations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {donations.slice(-3).reverse().map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {new Date(d.date).toLocaleDateString()}
                  </span>
                  <span className="font-medium">RM{d.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Recent Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expenses.slice(-3).reverse().map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span>
                    <span className="text-muted-foreground">
                      {e.category} &middot;{" "}
                    </span>
                    {new Date(e.date).toLocaleDateString()}
                  </span>
                  <span className="font-medium">RM{e.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
