import React from 'react'
import './globals.css'
import { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { NavbarWrapper } from 'components/common/NavbarWrapper'

const dmSans = DM_Sans({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={dmSans.className}>
        <NavbarWrapper />
        <main className="min-h-screen max-w-screen flex flex-col">{children}</main>
      </body>
    </html>
  )
}
