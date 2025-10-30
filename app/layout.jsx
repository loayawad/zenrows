import './globals.css'

export const metadata = {
  title: 'Interview Next App',
  description: 'Minimal Next.js + Tailwind setup',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  )
}


