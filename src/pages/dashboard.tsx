import { Users, HeartHandshake, Wallet, UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
    { title: "Total Orphans", value: orphans.length, icon: Users },
    { title: "Total Donations", value: `RM${totalDonations.toLocaleString()}`, icon: HeartHandshake },
    { title: "Balance", value: `RM${balance.toLocaleString()}`, icon: Wallet },
    { title: "Pending Apps", value: pendingApps, icon: UserPlus },
  ]

  return (
    <div className="flex flex-col gap-6">
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
              <stat.icon className="size-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">{stat.value}</span>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.slice(-3).reverse().map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="text-muted-foreground">
                      {new Date(d.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      RM{d.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Recent Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.slice(-3).reverse().map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{e.category}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(e.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      RM{e.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
