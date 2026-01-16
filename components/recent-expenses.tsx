"use client"

import { Card } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import { ScrollStack, ScrollStackItem } from "./scroll-stack"

interface Expense {
  id: number
  category: string
  amount: number
  date: string
  description: string
}

interface RecentExpensesProps {
  expenses: Expense[]
  onDelete: (id: number) => void
}

export function RecentExpenses({ expenses, onDelete }: RecentExpensesProps) {
  const categoryEmoji: Record<string, string> = {
    Food: "🍔",
    Transport: "🚗",
    Entertainment: "🎬",
    Utilities: "💡",
    Shopping: "🛍️",
    Health: "🏥",
  }

  const categoryColors: Record<string, string> = {
    Food: "bg-amber-500/10 text-amber-300",
    Transport: "bg-blue-500/10 text-blue-300",
    Entertainment: "bg-pink-500/10 text-pink-300",
    Utilities: "bg-yellow-500/10 text-yellow-300",
    Shopping: "bg-emerald-500/10 text-emerald-300",
    Health: "bg-red-500/10 text-red-300",
  }

  return (
    <Card className="bg-card border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Recent Expenses</h2>
        <p className="text-sm text-muted-foreground mt-1">Your latest transactions</p>
      </div>

      <ScrollStack>
        {expenses
          .slice()
          .reverse()
          .map((expense) => (
            <ScrollStackItem key={expense.id}>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group mb-3">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${categoryColors[expense.category] || "bg-purple-500/10 text-purple-300"}`}
                  >
                    {categoryEmoji[expense.category] || "📌"}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{expense.description}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${categoryColors[expense.category] || "bg-purple-500/10 text-purple-300"}`}
                      >
                        {expense.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(expense.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-primary text-lg">${expense.amount.toFixed(2)}</span>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete expense"
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </button>
                </div>
              </div>
            </ScrollStackItem>
          ))}
      </ScrollStack>
    </Card>
  )
}
