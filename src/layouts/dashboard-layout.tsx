import { Outlet, useNavigate, useLocation } from "react-router-dom"
import {
  Users,
  UserPlus,
  HeartHandshake,
  Wallet,
  BarChart3,
  LogOut,
  Home,
  HandCoins,
  ClipboardList,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { useStore } from "@/store/useStore"
import { toast } from "sonner"

const navItems = [
  { to: "/dashboard", icon: Home, label: "Dashboard", roles: ["admin", "staff"] },
  { to: "/orphans", icon: Users, label: "Orphans", roles: ["admin", "staff"] },
  { to: "/admissions", icon: UserPlus, label: "Admissions", roles: ["admin", "staff"] },
  { to: "/donations", icon: HeartHandshake, label: "Donations", roles: ["admin", "staff"] },
  { to: "/finances", icon: Wallet, label: "Finances", roles: ["admin", "staff"] },
  { to: "/reports", icon: BarChart3, label: "Reports", roles: ["admin"] },
  { to: "/guardian/apply", icon: ClipboardList, label: "New Application", roles: ["guardian"] },
  { to: "/guardian/track", icon: ClipboardList, label: "Track Status", roles: ["guardian"] },
  { to: "/donor/donate", icon: HandCoins, label: "Donate Now", roles: ["donor"] },
  { to: "/donor/history", icon: HeartHandshake, label: "My Donations", roles: ["donor"] },
]

export function DashboardLayout() {
  const user = useStore((s) => s.user)
  const logout = useStore((s) => s.logout)
  const navigate = useNavigate()
  const location = useLocation()

  const filteredNav = navItems.filter((item) =>
    user ? item.roles.includes(user.role) : false
  )

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    navigate("/login")
  }

  return (
    <TooltipProvider>
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenuButton size="lg" className="gap-2">
            <HeartHandshake className="size-6 text-primary" />
            <span className="text-lg font-semibold">Peryatim</span>
          </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredNav.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      isActive={location.pathname === item.to}
                      tooltip={item.label}
                      onClick={() => navigate(item.to)}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Logout"
                onClick={handleLogout}
                className="text-destructive"
              >
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Avatar className="size-8">
              <AvatarFallback>
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
    </TooltipProvider>
  )
}
