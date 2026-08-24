import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stratos Fit',
  description: 'Tienda deportiva online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}