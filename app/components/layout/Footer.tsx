'use client'

import { motion } from 'framer-motion'
import { 
  Brain, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight
} from 'lucide-react'
import Button from '@/app/components/ui/Button'
import { COMPANY_INFO, FOOTER_LINKS } from '@/app/lib/constants'
import { useAnalytics } from '@/app/lib/analytics'

export default function Footer() {
  const { trackCTAClick } = useAnalytics()
  const currentYear = new Date().getFullYear()

  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    youtube: Youtube,
  }

  const handleSocialClick = (platform: string) => {
    trackCTAClick(`Social ${platform}`, 'footer')
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackCTAClick('Newsletter Subscribe', 'footer')
    // TODO: Implement newsletter subscription
  }

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer Content */}
      <div className="container-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              className="flex items-center space-x-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-ai rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gradient">
                  {COMPANY_INFO.name}
                </h3>
                <p className="text-sm text-neutral-400">
                  Contabilidad con IA
                </p>
              </div>
            </motion.div>

            <motion.p
              className="text-neutral-300 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {COMPANY_INFO.description}
            </motion.p>

            {/* Contact Info */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 text-sm text-neutral-300">
                <MapPin size={16} className="text-primary-400 shrink-0" />
                <span>
                  {COMPANY_INFO.address.street}, {COMPANY_INFO.address.city}
                </span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-neutral-300">
                <Phone size={16} className="text-primary-400 shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-neutral-300">
                <Mail size={16} className="text-primary-400 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-neutral-300">
                <Clock size={16} className="text-primary-400 shrink-0" />
                <span>{COMPANY_INFO.businessHours.weekdays}</span>
              </div>
            </motion.div>
          </div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-6">Servicios</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-6">Empresa</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mb-6 mt-8">Recursos</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h4 className="text-lg font-semibold mb-6">
              Mantente Actualizado
            </h4>
            <p className="text-neutral-300 text-sm mb-4">
              Recibe tips fiscales, novedades de IA y noticias importantes directamente en tu email.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Tu email aquí"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                required
              />
              <Button
                type="submit"
                variant="ai"
                size="sm"
                fullWidth
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                trackingLabel="Newsletter Subscribe"
              >
                Suscribirme
              </Button>
            </form>

            {/* Social Media */}
            <div className="mt-8">
              <h5 className="text-sm font-medium mb-4 text-neutral-400">
                Síguenos
              </h5>
              <div className="flex space-x-4">
                {Object.entries(COMPANY_INFO.socialMedia).map(([platform, url]) => {
                  const IconComponent = socialIcons[platform as keyof typeof socialIcons]
                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-primary-600 transition-all duration-200"
                      onClick={() => handleSocialClick(platform)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent size={18} />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.div
              className="text-sm text-neutral-400 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p>
                © {currentYear} {COMPANY_INFO.name}. Todos los derechos reservados.
              </p>
              <p className="mt-1">
                Desarrollado con ❤️ y ⚡ IA en México
              </p>
            </motion.div>

            <motion.div
              className="flex items-center space-x-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {FOOTER_LINKS.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}