import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStore } from "@/store/useStore"
import { HeartHandshake } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const login = useStore((s) => s.login)
  const user = useStore((s) => s.user)
  const navigate = useNavigate()

  if (user) {
    const role = user.role
    if (role === "admin" || role === "staff")
      navigate("/dashboard", { replace: true })
    else if (role === "guardian") navigate("/guardian/apply", { replace: true })
    else if (role === "donor") navigate("/donor/donate", { replace: true })
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const found = login(email, password)
    if (found) {
      toast.success(`Welcome back, ${found.name}!`)
      const role = found.role
      if (role === "admin" || role === "staff") navigate("/dashboard")
      else if (role === "guardian") navigate("/guardian/apply")
      else if (role === "donor") navigate("/donor/donate")
    } else {
      toast.error("Invalid email or password")
    }
  }

  const fillDemo = (role: string) => {
    const creds: Record<string, { email: string; password: string }> = {
      admin: { email: "admin@peryatim.com", password: "admin123" },
      staff: { email: "staff@peryatim.com", password: "staff123" },
      guardian: { email: "guardian@peryatim.com", password: "guard123" },
      donor: { email: "donor@peryatim.com", password: "donor123" },
    }
    const c = creds[role]
    setEmail(c.email)
    setPassword(c.password)
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <HeartHandshake className="mb-2 size-10 text-primary" />
          <CardTitle>Peryatim</CardTitle>
          <CardDescription>Orphanage Management System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-6 border border-dashed bg-muted/50 p-3">
            <p className="mb-2 text-center text-xs font-medium text-muted-foreground">
              ⚡ Quick Demo Login
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { role: "admin", email: "admin@peryatim.com" },
                { role: "staff", email: "staff@peryatim.com" },
                { role: "guardian", email: "guardian@peryatim.com" },
                { role: "donor", email: "donor@peryatim.com" },
              ].map(({ role, email }) => (
                <Button
                  key={role}
                  variant="outline"
                  size="xs"
                  type="button"
                  onClick={() => fillDemo(role)}
                  className="h-auto flex-col gap-0.5 py-1.5 leading-tight"
                >
                  <span className="text-xs font-semibold capitalize">
                    {role}
                  </span>
                  <span className="text-[10px] font-normal text-muted-foreground">
                    {email}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
