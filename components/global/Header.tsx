'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu } from 'lucide-react'
import { SideBarSheet } from '../others/SidebarSheet'
import ProfileDropdown from './ProfileDropdown'
import { auth } from '@/db/firebaseConfig'

const NAV_LINKS = [
  { href: '/', label: 'HOME' },
  { href: '/main/about-us', label: 'ABOUT' },
  { href: '/main/affiliates', label: 'AFFILIATE' },
  { href: '/main/plan', label: 'PLAN' },
  { href: '/main/faq', label: 'FAQ' },
  { href: '/main/contact', label: 'CONTACT' },
]

function Header() {
  const pathName = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  const user = auth.currentUser
  const bg = pathName === "/" ? scrolled ? "bg-primary-green shadow-sm" : "bg-gradient-to-t from-[#1a472a]  to-[#1a472a]" : "bg-primary-green shadow-sm"


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <header className={`${bg} w-full sticky top-0 transition-all ease-linear duration-300  z-50 `}>
      <nav className="container-size mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2 -ml-6">
          <Image
            src="/images/logo.png"
            alt="Asset-api Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className=" font-bold uppercase text-primary-light">Asset-Api</h1>
        </div>

        {/* Navigation and Actions */}
        <div className="flex items-center gap-8">
          {/* Dynamic Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm text-primary-light *:transition-colors *:ease-linear *:duration-300">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-primary ${pathName === href ? 'text-primary font-semibold' : ''
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {/* <Button className="bg-primary hover:bg-primary/80 text-white">
              {pathName === "/"? "CREATE WALLET" : "REGISTER"}
              </Button> */}
            {user ? <ProfileDropdown /> :
              <Button onClick={() => router.push("/auth/login")} variant="outline" className="border-primary hidden lg:block text-[#1a472a] hover:scale-105 transition-all ease-linear duration-300">
                LOGIN
              </Button>}
            <SideBarSheet items={NAV_LINKS}>
              <Menu size={30} className={`${scrolled ? "text-primary" : pathName !== "/" ? "text-primary" : "text-primary-light"} cursor-pointer block lg:hidden`} />
            </SideBarSheet>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
