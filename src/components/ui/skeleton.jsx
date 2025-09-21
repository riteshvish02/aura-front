import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }

// sonner.jsx (Toaster component - note: this requires sonner package and theme setup)
// If you're not using next-themes in Vite, you can simplify this
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  // For Vite, you might want to handle theme differently
  // This is a simplified version without next-themes
  return (
    <Sonner
      theme="system"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        }
      }
      {...props}
    />
  )
}

export { Toaster }