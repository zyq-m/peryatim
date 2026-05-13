import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/store/useStore"

export function GuardianTrackPage() {
  const user = useStore((s) => s.user)
  const applications = useStore((s) => s.applications)

  const myApps = applications.filter((a) => a.guardian_id === user?.id)

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My Applications</h1>
        <p className="text-sm text-muted-foreground">
          Track the status of your admission applications
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {myApps.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No applications found.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Orphan Name</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Step</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myApps.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>
                      APP-{String(a.id).padStart(3, "0")}
                    </TableCell>
                    <TableCell className="font-medium">
                      {a.orphan_name}
                    </TableCell>
                    <TableCell>
                      {new Date(a.submitted_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          a.status === "approved"
                            ? "default"
                            : a.status === "rejected"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {a.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {a.status === "pending"
                        ? "Staff Review"
                        : a.status === "approved"
                          ? "Download Offer Letter"
                          : "Contact Support"}
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
