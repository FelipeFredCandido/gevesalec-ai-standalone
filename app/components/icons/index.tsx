'use client'

import dynamic from 'next/dynamic'
import { type LucideProps } from 'lucide-react'
import { type FC } from 'react'

// Optimized icon loading - only load what we use
// This reduces bundle size significantly vs importing all icons

// Navigation & UI Icons
export const Menu = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Menu), 
  { ssr: true }
) as FC<LucideProps>

export const X = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.X), 
  { ssr: true }
) as FC<LucideProps>

export const ChevronDown = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.ChevronDown), 
  { ssr: true }
) as FC<LucideProps>

export const ChevronUp = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.ChevronUp), 
  { ssr: true }
) as FC<LucideProps>

export const ArrowRight = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.ArrowRight), 
  { ssr: true }
) as FC<LucideProps>

export const ArrowLeft = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.ArrowLeft), 
  { ssr: true }
) as FC<LucideProps>

// Business Icons
export const Brain = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Brain), 
  { ssr: true }
) as FC<LucideProps>

export const Calculator = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Calculator), 
  { ssr: true }
) as FC<LucideProps>

export const TrendingUp = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.TrendingUp), 
  { ssr: true }
) as FC<LucideProps>

export const BarChart3 = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.BarChart3), 
  { ssr: true }
) as FC<LucideProps>

export const FileText = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.FileText), 
  { ssr: true }
) as FC<LucideProps>

export const DollarSign = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.DollarSign), 
  { ssr: true }
) as FC<LucideProps>

// Communication Icons
export const MessageCircle = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.MessageCircle), 
  { ssr: true }
) as FC<LucideProps>

export const Phone = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Phone), 
  { ssr: true }
) as FC<LucideProps>

export const Mail = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Mail), 
  { ssr: true }
) as FC<LucideProps>

export const Send = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Send), 
  { ssr: true }
) as FC<LucideProps>

// Status Icons
export const CheckCircle = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.CheckCircle), 
  { ssr: true }
) as FC<LucideProps>

export const XCircle = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.XCircle), 
  { ssr: true }
) as FC<LucideProps>

export const AlertCircle = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.AlertCircle), 
  { ssr: true }
) as FC<LucideProps>

export const Info = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Info), 
  { ssr: true }
) as FC<LucideProps>

// Feature Icons
export const Zap = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Zap), 
  { ssr: true }
) as FC<LucideProps>

export const Shield = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Shield), 
  { ssr: true }
) as FC<LucideProps>

export const Clock = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Clock), 
  { ssr: true }
) as FC<LucideProps>

export const Users = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Users), 
  { ssr: true }
) as FC<LucideProps>

export const Target = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Target), 
  { ssr: true }
) as FC<LucideProps>

export const Award = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Award), 
  { ssr: true }
) as FC<LucideProps>

export const Star = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Star), 
  { ssr: true }
) as FC<LucideProps>

export const Play = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Play), 
  { ssr: true }
) as FC<LucideProps>

// Additional commonly used icons
export const Download = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Download), 
  { ssr: true }
) as FC<LucideProps>

export const Scale = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Scale), 
  { ssr: true }
) as FC<LucideProps>

export const Lock = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Lock), 
  { ssr: true }
) as FC<LucideProps>

export const Calendar = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Calendar), 
  { ssr: true }
) as FC<LucideProps>

export const Building2 = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Building2), 
  { ssr: true }
) as FC<LucideProps>

export const MapPin = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.MapPin), 
  { ssr: true }
) as FC<LucideProps>

export const HelpCircle = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.HelpCircle), 
  { ssr: true }
) as FC<LucideProps>

export const Search = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Search), 
  { ssr: true }
) as FC<LucideProps>

export const UserCheck = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.UserCheck), 
  { ssr: true }
) as FC<LucideProps>

export const UserX = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.UserX), 
  { ssr: true }
) as FC<LucideProps>

// Social Media Icons (if needed)
export const Facebook = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Facebook), 
  { ssr: true }
) as FC<LucideProps>

export const Twitter = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Twitter), 
  { ssr: true }
) as FC<LucideProps>

export const Linkedin = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Linkedin), 
  { ssr: true }
) as FC<LucideProps>

export const Instagram = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Instagram), 
  { ssr: true }
) as FC<LucideProps>

export const Youtube = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Youtube), 
  { ssr: true }
) as FC<LucideProps>

// Quote icon for testimonials
export const Quote = dynamic<LucideProps>(() => 
  import('lucide-react').then(mod => mod.Quote), 
  { ssr: true }
) as FC<LucideProps>