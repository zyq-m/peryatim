import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/store/useStore"

export function DonationsPage() {
  const donations = useStore((s) => s.donations)
  const users = useStore((s) => s.users)

  const getDonorName = (id: number) =>
    users.find((u) => u.id === id)?.name ?? "N/A"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Donations</h1>
        <p className="text-sm text-muted-foreground">
          Track all incoming donations
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Donation Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>DON-{String(d.id).padStart(3, "0")}</TableCell>
                  <TableCell className="font-medium">
                    {getDonorName(d.donor_id)}
                  </TableCell>
                  <TableCell>RM{d.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(d.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
