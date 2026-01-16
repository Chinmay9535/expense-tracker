"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsOverview } from "@/components/stats-overview"
import { ExpenseChart } from "@/components/expense-chart"
import { CategoryBreakdown } from "@/components/category-breakdown"
import { RecentExpenses } from "@/components/recent-expenses"
import { AddExpenseModal } from "@/components/add-expense-modal"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [expenses, setExpenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false })

      if (error) {
        console.error('Error fetching expenses:', error)
      } else {
        setExpenses(data || [])
      }
    } catch (error) {
      console.error('Unexpected error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async (expense: any) => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert([{
          category: expense.category,
          amount: expense.amount,
          date: expense.date,
          description: expense.description
        }])
        .select()

      if (error) {
        console.error('Error adding expense:', error)
      } else if (data) {
        setExpenses([data[0], ...expenses])
        setShowAddExpense(false)
      }
    } catch (error) {
      console.error('Unexpected error adding expense:', error)
    }
  }

  const handleDeleteExpense = async (id: number) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting expense:', error)
      } else {
        setExpenses(expenses.filter(exp => exp.id !== id))
      }
    } catch (error) {
      console.error('Unexpected error deleting expense:', error)
    }
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const categorized = expenses.reduce((acc: any, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount
    return acc
  }, {})

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onAddClick={() => setShowAddExpense(true)} />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <StatsOverview
          totalExpenses={totalExpenses}
          monthlyAverage={totalExpenses / 1} // Simplified for now, or calculate based on date range
          categoryCount={Object.keys(categorized).length}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <ExpenseChart expenses={expenses} />
          </div>
          <div>
            <CategoryBreakdown categories={categorized} />
          </div>
        </div>

        <div className="mt-8">
          <RecentExpenses expenses={expenses} onDelete={handleDeleteExpense} />
        </div>
      </main>

      <AddExpenseModal isOpen={showAddExpense} onClose={() => setShowAddExpense(false)} onAdd={handleAddExpense} />
    </div>
  )
}
