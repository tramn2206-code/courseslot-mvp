import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CourseSlot | Smart Registration Assistant',
  description: 'Never miss an open course slot again.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}