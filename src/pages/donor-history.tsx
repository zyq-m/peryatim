import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useStore } from "@/store/useStore"
import { toast } from "sonner"

export function DonorHistoryPage() {
  const user = useStore((s) => s.user)
  const donations = useStore((s) => s.donations)

  const myDonations = donations.filter((d) => d.donor_id === user?.id)

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My Donations</h1>
        <p className="text-sm text-muted-foreground">
          View your donation history and download receipts
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
        </CardHeader>
        <CardContent>
          {myDonations.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No donations yet. Make your first donation today!
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Receipt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myDonations.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">
                      RM{d.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(d.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() =>
                          toast.success(
                            `Receipt for donation #${d.id} downloaded`
                          )
                        }
                      >
                        Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
