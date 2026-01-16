"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Calendar, Wallet } from "lucide-react"

interface StatsOverviewProps {
  totalExpenses: number
  monthlyAverage: number
  categoryCount: number
}

export function StatsOverview({ totalExpenses, monthlyAverage, categoryCount }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-card border-border hover:border-primary/50 transition-colors">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-2">Total Spent</p>
              <h3 className="text-3xl font-bold text-foreground">${totalExpenses.toFixed(2)}</h3>
              <p className="text-green-400 text-xs mt-2">This month</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Wallet size={24} className="text-primary" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-card border-border hover:border-primary/50 transition-colors">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-2">Daily Average</p>
              <h3 className="text-3xl font-bold text-foreground">${monthlyAverage.toFixed(2)}</h3>
              <p className="text-blue-400 text-xs mt-2">Per day</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <Calendar size={24} className="text-accent" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-card border-border hover:border-primary/50 transition-colors">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-2">Categories</p>
              <h3 className="text-3xl font-bold text-foreground">{categoryCount}</h3>
              <p className="text-purple-400 text-xs mt-2">Active categories</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <TrendingUp size={24} className="text-purple-400" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
