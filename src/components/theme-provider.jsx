import React from 'react'

export function ThemeProvider({ children, ...props }) {
  // In a real Vite setup, you might use react-use-theme or similar
  // For now, this just passes through the children
  return <div {...props}>{children}</div>
}
