'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2 } from 'lucide-react'
import { Card, CardContent } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import { useAnalytics } from '@/app/lib/analytics'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  isTyping?: boolean
}

const predefinedQuestions = [
  '¿Cómo funciona la IA en GEVESALEC?',
  '¿Cuáles son sus precios?',
  '¿Qué documentos necesito?',
  '¿Cómo migrar mi contabilidad?',
  '¿Ofrecen soporte 24/7?',
]

const botResponses: Record<string, string> = {
  'como funciona la ia': 'Nuestra IA está entrenada específicamente para el SAT mexicano. Analiza automáticamente tus documentos fiscales, clasifica gastos, detecta errores y genera reportes. Todo supervisado por contadores certificados para garantizar precisión total.',
  'precios': 'Ofrecemos planes desde $2,500 MXN/mes. Incluye procesamiento IA ilimitado, soporte 24/7 y garantía de cumplimiento fiscal. ¿Te gustaría una cotización personalizada?',
  'documentos': 'Solo necesitas tus CFDIs, estados de cuenta bancarios y comprobantes de gastos. Nuestra IA se encarga de procesar y clasificar todo automáticamente.',
  'migrar': 'La migración es completamente gratuita y toma 24-48 horas. Nuestro equipo se encarga de transferir todos tus datos sin interrumpir tus operaciones.',
  'soporte': 'Sí, ofrecemos soporte 24/7 a través de nuestro asistente IA y contadores humanos en horarios de oficina. Tiempo de respuesta promedio: 5 minutos.',
  default: 'Excelente pregunta. Para brindarte la información más precisa, te recomiendo agendar una consulta gratuita con nuestros expertos. ¿Te gustaría que te conecte con un asesor?'
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! 👋 Soy GEVE, tu asistente de IA contable. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { trackCTAClick } = useAnalytics()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('ia') || message.includes('inteligencia')) {
      return botResponses['como funciona la ia']!
    } else if (message.includes('precio') || message.includes('costo') || message.includes('cuanto')) {
      return botResponses['precios']!
    } else if (message.includes('documento') || message.includes('necesito') || message.includes('requier')) {
      return botResponses['documentos']!
    } else if (message.includes('migrar') || message.includes('cambiar') || message.includes('transferir')) {
      return botResponses['migrar']!
    } else if (message.includes('soporte') || message.includes('ayuda') || message.includes('24')) {
      return botResponses['soporte']!
    } else {
      return botResponses.default
    }
  }

  const sendMessage = async (messageContent?: string) => {
    const content = messageContent || inputMessage.trim()
    if (!content) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)
    
    trackCTAClick(`Chat: ${content.substring(0, 50)}`, 'chatbot')

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(content)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      trackCTAClick('Abrir ChatBot', 'chatbot')
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-ai rounded-full shadow-lg flex items-center justify-center text-white z-50 hover:scale-110 transition-transform duration-200"
          onClick={toggleChat}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={24} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed z-50 ${
              isMinimized 
                ? 'bottom-6 right-6 w-80 h-16' 
                : 'bottom-6 right-6 w-80 h-96 sm:w-96 sm:h-[500px]'
            }`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full flex flex-col shadow-2xl border-primary-200">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-gradient-ai text-white rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold">GEVE Assistant</h3>
                    <p className="text-xs text-white/80">Tu asesor IA contable</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-primary-600 text-white'
                              : 'bg-neutral-100 text-neutral-900'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.type === 'bot' && (
                              <Bot size={16} className="text-primary-600 mt-0.5 shrink-0" />
                            )}
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            {message.type === 'user' && (
                              <User size={16} className="text-white/80 mt-0.5 shrink-0" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-neutral-100 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Bot size={16} className="text-primary-600" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Questions */}
                  {messages.length === 1 && (
                    <div className="p-4 border-t border-neutral-200">
                      <p className="text-xs text-neutral-600 mb-2">Preguntas frecuentes:</p>
                      <div className="space-y-2">
                        {predefinedQuestions.slice(0, 3).map((question, index) => (
                          <motion.button
                            key={index}
                            onClick={() => sendMessage(question)}
                            className="w-full text-left text-xs p-2 bg-neutral-50 hover:bg-neutral-100 rounded transition-colors duration-200"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-neutral-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Escribe tu pregunta..."
                        className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        disabled={isTyping}
                      />
                      <Button
                        variant="ai"
                        size="sm"
                        icon={<Send size={16} />}
                        onClick={() => sendMessage()}
                        disabled={!inputMessage.trim() || isTyping}
                        className="shrink-0"
                      />
                    </div>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}