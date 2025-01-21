import { Inter } from "next/font/google"
import { getServerSession } from "next-auth"
import SessionProvider from "./SessionProvider"
import { authOptions } from "./api/auth/[...nextauth]/auth"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}