'use client'

import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'

// Clientes reales que puedes reemplazar con logos
const clients = [
  { name: 'TechStartup MX', industry: 'SaaS' },
  { name: 'Autotransportes Maldonado', industry: 'Logística' },
  { name: 'Refacciones y Accesorios', industry: 'Comercio' },
  { name: 'Consultores Estratégicos', industry: 'Consultoría' },
  { name: 'Distribuidora Nacional', industry: 'Distribución' },
  { name: 'Grupo Constructor MTY', industry: 'Construcción' },
  { name: 'Servicios Médicos SA', industry: 'Salud' },
  { name: 'Tecnología Educativa', industry: 'EdTech' },
]

export default function ClientLogos() {
  return (
    <section className="py-12 bg-white border-y border-neutral-200">
      <div className="container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
            Confían en nosotros
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900">
            200+ PYMEs Mexicanas nos eligen
          </h3>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Placeholder Logo - Replace with actual logos */}
              <div className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 border-2 border-neutral-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center gap-2">
                  <Building2 className="w-8 h-8 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                  <div className="text-center">
                    <p className="text-xs font-bold text-neutral-700 group-hover:text-primary-600 transition-colors">
                      {client.name}
                    </p>
                    <p className="text-xs text-neutral-500">{client.industry}</p>
                  </div>
                </div>

                {/* Tooltip on hover */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Cliente desde 2022
                </div>
              </div>

              {/*
                TO REPLACE WITH ACTUAL LOGOS:
                Replace the content above with:
                <img
                  src={`/logos/${client.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                  alt={client.name}
                  className="w-full h-16 object-contain grayscale hover:grayscale-0 transition-all"
                />
              */}
            </motion.div>
          ))}
        </div>

        {/* CTA below logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-neutral-600">
            ¿Quieres ser el próximo?{' '}
            <a
              href="#contacto"
              className="text-primary-600 font-semibold hover:text-primary-700 underline"
            >
              Agenda tu diagnóstico gratis
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
