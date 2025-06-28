'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft, MessageCircle, Calculator } from 'lucide-react'
import Button from '@/app/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-success-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold text-primary-600 mb-4">
            404
          </h1>
          <div className="w-32 h-1 bg-gradient-ai mx-auto rounded-full"></div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            ¡Página en Construcción!
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            Esta funcionalidad está siendo desarrollada por nuestro equipo de IA. 
            Pronto estará disponible con todas las características que necesitas.
          </p>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200 mb-8">
            <div className="flex items-center justify-center space-x-2 text-primary-600 mb-3">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">¡Mientras tanto!</span>
            </div>
            <p className="text-neutral-700">
              Prueba nuestra calculadora fiscal o contáctanos para más información
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <Button 
              variant="primary" 
              size="lg"
              className="w-full sm:w-auto"
            >
              <Home className="w-5 h-5 mr-2" />
              Volver al Inicio
            </Button>
          </Link>

          <Link href="/calculadora">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Ir a Calculadora
            </Button>
          </Link>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-neutral-200"
        >
          <p className="text-neutral-600 mb-2">
            ¿Necesitas ayuda inmediata?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
            <a 
              href="tel:+528116801924" 
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              📞 (81) 1680-1924
            </a>
            <span className="hidden sm:inline text-neutral-400">|</span>
            <a 
              href="mailto:info@gevesalec.com" 
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              ✉️ info@gevesalec.com
            </a>
            <span className="hidden sm:inline text-neutral-400">|</span>
            <a 
              href="https://wa.me/528116801924" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-success-600 hover:text-success-700 font-medium transition-colors"
            >
              💬 WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}