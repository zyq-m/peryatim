import { create } from "zustand"
import dummy from "@/data/dummy.json"

export type UserRole = "admin" | "staff" | "guardian" | "donor"

type User = {
  id: number
  name: string
  email: string
  role: UserRole
  password: string
}

type Orphan = {
  id: number
  name: string
  dob: string
  gender: string
  background: string
  admission_date: string
  guardian_id: number
}

type Guardian = {
  id: number
  name: string
  contact: string
}

type Donation = {
  id: number
  donor_id: number
  amount: number
  date: string
}

type Expense = {
  id: number
  category: string
  amount: number
  date: string
}

type Application = {
  id: number
  guardian_id: number
  orphan_name: string
  status: string
  submitted_at: string
}

type Adoption = {
  id: number
  orphan_id: number
  user_id: number
  status: string
}

type AppState = {
  user: User | null
  users: User[]
  orphans: Orphan[]
  guardians: Guardian[]
  donations: Donation[]
  expenses: Expense[]
  applications: Application[]
  adoptions: Adoption[]
  setUser: (user: User | null) => void
  login: (email: string, password: string) => User | null
  logout: () => void
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  users: dummy.users as User[],
  orphans: dummy.orphans as Orphan[],
  guardians: dummy.guardians as Guardian[],
  donations: dummy.donations as Donation[],
  expenses: dummy.expenses as Expense[],
  applications: dummy.applications as Application[],
  adoptions: dummy.adoptions as Adoption[],

  setUser: (user) => set({ user }),

  login: (email, password) => {
    const user = get().users.find(
      (u) => u.email === email && u.password === password
    )
    if (user) {
      set({ user })
    }
    return user ?? null
  },

  logout: () => set({ user: null }),
}))
