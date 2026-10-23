'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'

export function NavbarWrapper() {
  const pathname = usePathname()

  const pagesWithScrollBehavior = ['/']

  const shouldUseScrollBehavior = pagesWithScrollBehavior.includes(pathname)

  return <Navbar useScrollBehavior={shouldUseScrollBehavior} />
}
