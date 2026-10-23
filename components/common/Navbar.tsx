import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, easeInOut, easeOut } from 'motion/react'

interface NavbarProps {
  useScrollBehavior?: boolean
  homepageName?: string
}

export function Navbar({ useScrollBehavior = true, homepageName }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!useScrollBehavior) {
      setIsScrolled(true)
      return
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [useScrollBehavior])

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: easeInOut,
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: easeOut,
      },
    },
  }

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.1,
        duration: 0.3,
        ease: easeOut,
      },
    }),
  }

  const line1Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 },
  }

  const line2Variants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  }

  const line3Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -10 },
  }

  const menuItems = [
    { href: '/', label: 'Index' },
    { href: '/about', label: 'About' },
    { href: '/works', label: 'Works' },
    { href: '/contact', label: 'Contact', isSpecial: true },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white w-full mx-auto flex items-center justify-between px-6 py-7 md:px-12 lg:px-56">
      <a href="#home" className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-black drop-shadow-gray-700 drop-shadow-md" />

        <span className="hidden md:block font-medium">{homepageName || 'Meisha Putradewan'}</span>
      </a>

      <nav className="flex gap-2 text-sm">
        <Link
          href="/"
          className="transition-colors duration-300 ease-in-out hover:bg-gray-200 py-2 px-4 rounded-2xl"
        >
          Index
        </Link>
        <Link
          href="/about"
          className="transition-colors duration-300 ease-in-out hover:bg-gray-200 py-2 px-4 rounded-2xl"
        >
          About
        </Link>
        <Link
          href="/works"
          className="transition-colors duration-300 ease-in-out hover:bg-gray-200 py-2 px-4 rounded-2xl"
        >
          Works
        </Link>
        <Link
          href="/contact"
          className="transition-colors duration-300 ease-in-out hover:bg-gray-200 py-2 px-4 rounded-2xl"
        >
          Contact
        </Link>

        <div className="lg:hidden flex items-center justify-between py-3 px-4 sm:px-6">
          {/* <Link href="/" className="shrink-0 hidden lg:block">
            <div className="relative w-30 h-9.25">
              <Image
                src={isScrolled ? '/logo.png' : '/logo-white.png'}
                alt="X-CAMP Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link> */}

          {/* <Link href="/" className="shrink-0 lg:hidden">
            <Image src="/logo.png" alt="X-CAMP Logo" width={100} height={31} priority />
          </Link> */}

          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 transition-all hover:text-[#E5005A] ${isScrolled ? '' : 'lg:text-white'} relative`}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              <motion.span
                className="w-full h-0.75 bg-current origin-center"
                variants={line1Variants}
                animate={isMenuOpen ? 'open' : 'closed'}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.75 bg-current"
                variants={line2Variants}
                animate={isMenuOpen ? 'open' : 'closed'}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.75 bg-current origin-center"
                variants={line3Variants}
                animate={isMenuOpen ? 'open' : 'closed'}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={`lg:hidden border-t border-gray-200 bg-white ${isScrolled ? '' : 'lg:bg-black'} overflow-hidden`}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-4 py-2 space-y-1">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    custom={index}
                  >
                    <Link
                      href={item.href}
                      className={`block py-3 text-base font-bold transition-all ${
                        item.isSpecial
                          ? 'bg-linear-to-r from-[#1E22AA] to-[#E5005A] bg-clip-text text-transparent hover:opacity-40'
                          : `hover:text-[#E5005A] ${isScrolled ? '' : 'lg:text-white'}`
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
