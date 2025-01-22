import { Inter } from "next/font/google"
import { getServerSession } from "next-auth"
import SessionProvider from "./SessionProvider"
import { authOptions } from "./api/auth/[...nextauth]/auth"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange 
        
        >
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}