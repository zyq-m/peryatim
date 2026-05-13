import { useState } from "react"
import { HeartHandshake } from "lucide-react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label as RadioLabel } from "@/components/ui/label"
import { toast } from "sonner"

const presets = [10, 50, 100]

export function DonorDonatePage() {
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("card")
  const [recurring, setRecurring] = useState(false)

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }
    toast.success(
      `Thank you! Your donation of RM${amount} has been received.`
    )
    setAmount("")
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Donate Now</h1>
        <p className="text-sm text-muted-foreground">
          Support the orphanage with your generous contribution
        </p>
      </div>
      <Card>
        <CardHeader className="text-center">
          <HeartHandshake className="mx-auto mb-2 size-10 text-primary" />
          <CardTitle>Make a Donation</CardTitle>
          <CardDescription>
            Your donation helps provide care and education for orphans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDonate} className="space-y-6">
            <div className="space-y-3">
              <Label>Amount</Label>
              <div className="flex gap-2">
                {presets.map((p) => (
                  <Button
                    key={p}
                    type="button"
                    variant={Number(amount) === p ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setAmount(String(p))}
                  >
                    RM{p}
                  </Button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  RM
                </span>
                <Input
                  type="number"
                  placeholder="Custom amount"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <RadioGroup
                value={method}
                onValueChange={setMethod}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="card" id="card" />
                  <RadioLabel htmlFor="card">Card</RadioLabel>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <RadioLabel htmlFor="bank">Bank Transfer</RadioLabel>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="recurring"
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
                className="size-4 rounded border-border accent-primary"
              />
              <Label htmlFor="recurring" className="text-sm">
                Make this a monthly recurring donation
              </Label>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Donate Securely
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
