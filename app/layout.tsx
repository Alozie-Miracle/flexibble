import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import  AuthProviders from '@/components/AuthProviders'

export const metadata = {
  title: 'Flexibble',
  description: 'Showcase and discover remarkable developer projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProviders>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </AuthProviders>
        </body>
    </html>
  )
}
