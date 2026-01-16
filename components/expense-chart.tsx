"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Expense {
  id: number
  category: string
  amount: number
  date: string
  description: string
}

export function ExpenseChart({ expenses }: { expenses: Expense[] }) {
  // Group expenses by date
  const chartData = expenses
    .reduce((acc: any, exp) => {
      const date = new Date(exp.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      const existing = acc.find((item: any) => item.date === date)
      if (existing) {
        existing.amount += exp.amount
      } else {
        acc.push({ date, amount: exp.amount })
      }
      return acc
    }, [])
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <Card className="bg-card border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Spending Trend</h2>
        <p className="text-sm text-muted-foreground mt-1">Daily expense overview</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="date" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
          <YAxis
            stroke="var(--color-muted-foreground)"
            style={{ fontSize: "12px" }}
            formatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
            }}
            formatter={(value: any) => [`$${value.toFixed(2)}`, "Amount"]}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="var(--color-primary)"
            strokeWidth={3}
            dot={{ fill: "var(--color-primary)", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
