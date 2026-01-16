"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface CategoryBreakdownProps {
  categories: Record<string, number>
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  const categoryColors: Record<string, string> = {
    Food: "#A78BFA",
    Transport: "#60A5FA",
    Entertainment: "#F472B6",
    Utilities: "#FCD34D",
    Shopping: "#34D399",
    Health: "#FB7185",
  }

  const data = Object.entries(categories).map(([name, value]) => ({
    name,
    value: Number.parseFloat(value.toFixed(2)),
  }))

  return (
    <Card className="bg-card border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">By Category</h2>
        <p className="text-sm text-muted-foreground mt-1">Budget breakdown</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={categoryColors[entry.name] || "#8B5CF6"} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: any) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-2">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-2 rounded hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: categoryColors[item.name] || "#8B5CF6" }}
              />
              <span className="text-sm text-foreground">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-foreground">${item.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
