'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Button from '@/app/components/ui/Button'
import { COMPANY_INFO, NAVIGATION } from '@/app/lib/constants'
import { useAnalytics } from '@/app/lib/analytics'
import { cn } from '@/app/lib/utils'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { trackCTAClick } = useAnalytics()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close mobile menu when clicking on link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Handle WhatsApp contact
  const handleWhatsAppClick = () => {
    trackCTAClick('WhatsApp Header', 'header')
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola, me interesa conocer más sobre los servicios de GEVESALEC`, '_blank')
  }

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Image
                src="/logo-typo-5.svg"
                alt="GEVESALECCO Logo"
                width={200}
                height={40}
                className="h-10 lg:h-12 w-auto"
                priority
              />
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {NAVIGATION.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                icon={<Phone size={16} />}
                onClick={() => trackCTAClick('Llamar Header', 'header')}
                trackingLabel="Llamar Header"
              >
                <a href={`tel:${COMPANY_INFO.phone}`}>
                  Llamar
                </a>
              </Button>
              
              <Button
                variant="ai"
                size="sm"
                icon={<MessageCircle size={16} />}
                onClick={handleWhatsAppClick}
                trackingLabel="WhatsApp Header"
              >
                WhatsApp
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors duration-200"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* Menu Content */}
            <motion.div
              className="fixed top-16 left-0 right-0 z-30 bg-white border-b border-neutral-200 shadow-xl lg:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container-padding py-6">
                <nav className="space-y-4">
                  {NAVIGATION.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block text-lg font-medium text-neutral-700 hover:text-primary-600 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>

                {/* Mobile CTA Buttons */}
                <div className="flex flex-col space-y-3 mt-6 pt-6 border-t border-neutral-200">
                  <Button
                    variant="outline"
                    size="md"
                    icon={<Phone size={18} />}
                    fullWidth
                    onClick={() => {
                      trackCTAClick('Llamar Mobile', 'mobile-menu')
                      closeMobileMenu()
                    }}
                  >
                    <a href={`tel:${COMPANY_INFO.phone}`} className="w-full">
                      Llamar ahora
                    </a>
                  </Button>
                  
                  <Button
                    variant="ai"
                    size="md"
                    icon={<MessageCircle size={18} />}
                    fullWidth
                    onClick={() => {
                      handleWhatsAppClick()
                      closeMobileMenu()
                    }}
                  >
                    Contactar por WhatsApp
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
                  <p className="text-sm text-neutral-600">
                    {COMPANY_INFO.businessHours.weekdays}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {COMPANY_INFO.businessHours.saturday}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content overlap */}
      <div className="h-16 lg:h-20" />
    </>
  )
}