'use client'

import { motion, useScroll, useTransform } from 'motion/react'

export function ParallaxLogos() {
  const { scrollYProgress } = useScroll()

  const yPrimary = useTransform(scrollYProgress, [0, 1], [0, 110])
  const rotatePrimary = useTransform(scrollYProgress, [0, 1], [0, 14])
  const scalePrimary = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  const ySecondary = useTransform(scrollYProgress, [0, 1], [0, -80])
  const rotateSecondary = useTransform(scrollYProgress, [0, 1], [0, -10])
  const scaleSecondary = useTransform(scrollYProgress, [0, 1], [1, 1.06])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.img
        src="/media/backgrounds/paralax-logo.png"
        alt=""
        aria-hidden
        className="absolute left-6 top-16 w-40 opacity-[0.26] blur-[0.2px] md:w-52"
        style={{ y: yPrimary, rotate: rotatePrimary, scale: scalePrimary }}
      />
      <motion.img
        src="/media/backgrounds/paralax-logo.png"
        alt=""
        aria-hidden
        className="absolute bottom-14 right-6 w-32 opacity-[0.22] blur-[0.1px] md:w-44"
        style={{ y: ySecondary, rotate: rotateSecondary, scale: scaleSecondary }}
      />
    </div>
  )
}
