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

export function OrphansPage() {
  const orphans = useStore((s) => s.orphans)
  const guardians = useStore((s) => s.guardians)

  const getGuardianName = (id: number) =>
    guardians.find((g) => g.id === id)?.name ?? "N/A"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Orphans</h1>
        <p className="text-sm text-muted-foreground">
          Manage orphan profiles and records
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Orphans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>DOB</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Guardian</TableHead>
                <TableHead>Background</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orphans.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.name}</TableCell>
                  <TableCell>{new Date(o.dob).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{o.gender}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(o.admission_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{getGuardianName(o.guardian_id)}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {o.background}
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
