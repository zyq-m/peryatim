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
import { Button } from "@/components/ui/button"
import { useStore } from "@/store/useStore"
import { toast } from "sonner"

export function AdmissionsPage() {
  const applications = useStore((s) => s.applications)
  const guardians = useStore((s) => s.guardians)

  const getGuardianName = (id: number) =>
    guardians.find((g) => g.id === id)?.name ?? "N/A"

  const handleApprove = (id: number) => {
    toast.success(`Application #${id} approved`)
  }

  const handleReject = (id: number) => {
    toast.error(`Application #${id} rejected`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Admissions</h1>
        <p className="text-sm text-muted-foreground">
          Review and manage admission applications
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Orphan Name</TableHead>
                <TableHead>Guardian</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>APP-{String(a.id).padStart(3, "0")}</TableCell>
                  <TableCell className="font-medium">{a.orphan_name}</TableCell>
                  <TableCell>{getGuardianName(a.guardian_id)}</TableCell>
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
                  <TableCell className="flex gap-1">
                    <Button
                      size="xs"
                      variant="default"
                      onClick={() => handleApprove(a.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="xs"
                      variant="destructive"
                      onClick={() => handleReject(a.id)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
