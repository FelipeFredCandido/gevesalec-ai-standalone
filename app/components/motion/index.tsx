'use client'

import dynamic from 'next/dynamic'
import { type HTMLMotionProps, type Variants } from 'framer-motion'
import { forwardRef, type ReactNode } from 'react'

// Lazy load framer-motion components
const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: true }
)

const MotionSection = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.section),
  { ssr: true }
)

const MotionArticle = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.article),
  { ssr: true }
)

const MotionSpan = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.span),
  { ssr: true }
)

const MotionH1 = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.h1),
  { ssr: true }
)

const MotionH2 = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.h2),
  { ssr: true }
)

const MotionP = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.p),
  { ssr: true }
)

const MotionA = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.a),
  { ssr: true }
)

const MotionButton = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.button),
  { ssr: true }
)

// Export AnimatePresence directly - it's needed for conditional rendering
import { AnimatePresence as FramerAnimatePresence } from 'framer-motion'
export const AnimatePresence = FramerAnimatePresence

// Common animation variants
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
}

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

// Re-export motion components with proper typing
export const motion = {
  div: MotionDiv as React.ComponentType<HTMLMotionProps<"div">>,
  section: MotionSection as React.ComponentType<HTMLMotionProps<"section">>,
  article: MotionArticle as React.ComponentType<HTMLMotionProps<"article">>,
  span: MotionSpan as React.ComponentType<HTMLMotionProps<"span">>,
  h1: MotionH1 as React.ComponentType<HTMLMotionProps<"h1">>,
  h2: MotionH2 as React.ComponentType<HTMLMotionProps<"h2">>,
  p: MotionP as React.ComponentType<HTMLMotionProps<"p">>,
  a: MotionA as React.ComponentType<HTMLMotionProps<"a">>,
  button: MotionButton as React.ComponentType<HTMLMotionProps<"button">>,
}

// Helper function for stagger children animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

// Helper function for viewport-based animations
export const inViewProps = {
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
}