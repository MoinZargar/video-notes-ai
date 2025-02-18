"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { headerData } from "@/lib/data"
import { Menu, X } from "lucide-react"
import { getSession, signOut } from "next-auth/react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession()
      if (session?.user) {
        setIsLoggedIn(true)
      }
    }
    fetchSession()
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setIsLoggedIn(false)
  }

  const authButtons = isLoggedIn ? (
    <>
      <Link
        href="/dashboard"
        className="px-6 py-2 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
      >
        Dashboard
      </Link>
      <button
        onClick={handleSignOut}
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Sign out
      </button>
    </>
  ) : (
    <div className="flex items-center space-x-4">
      <Link
        href="/signup"
        className="px-6 py-2 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
      >
        Sign up
      </Link>
      <Link
        href="/signin"
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Sign in
      </Link>
    </div>
  )

  const mobileAuthButtons = isLoggedIn ? (
    <>
      <Link
        href="/dashboard"
        className="block w-full px-6 py-2 text-center text-gray-700 border border-gray-300 rounded-md hover:border-gray-400 hover:text-gray-900 transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        Dashboard
      </Link>
      <button
        onClick={handleSignOut}
        className="block w-full px-6 py-2 text-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Sign out
      </button>
    </>
  ) : (
    <div className="w-full max-w-xs space-y-2 pt-4">
      <Link
        href="/signup"
        className="block w-full px-6 py-2 text-center text-gray-700 border border-gray-300 rounded-md hover:border-gray-400 hover:text-gray-900 transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        Sign up
      </Link>
      <Link
        href="/signin"
        className="block w-full px-6 py-2 text-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        Sign in
      </Link>
    </div>
  )

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            {headerData.logo}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {headerData.menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Desktop Auth Buttons */}
            {authButtons}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col items-center space-y-4">
              {headerData.menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              {mobileAuthButtons}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}