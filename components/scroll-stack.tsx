"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollStackItemProps {
  children: ReactNode
}

export function ScrollStackItem({ children }: ScrollStackItemProps) {
  return <>{children}</>
}

interface ScrollStackProps {
  children: ReactNode
}

export function ScrollStack({ children }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default

        const lenis = new Lenis({
          target: containerRef.current,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
        })

        function raf(time: number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
          lenis.destroy()
        }
      } catch (error) {
        console.log("[v0] Lenis loading:", error)
      }
    }

    loadLenis()
  }, [])

  return (
    <div ref={containerRef} style={{ height: "600px", overflowY: "scroll", scrollSnapType: "y mandatory" }}>
      {children}
    </div>
  )
}
