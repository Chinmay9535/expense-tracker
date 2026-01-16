"use client"

import { Button } from "@/components/ui/button"
import { Plus, Settings, Bell } from "lucide-react"

interface DashboardHeaderProps {
  onAddClick: () => void
}

export function DashboardHeader({ onAddClick }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">$</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">ExpenseTracker</h1>
              <p className="text-sm text-muted-foreground">Smart Financial Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell size={20} className="text-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Settings size={20} className="text-foreground" />
            </button>
            <Button onClick={onAddClick} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus size={18} />
              <span className="hidden sm:inline">Add Expense</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
