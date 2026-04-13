import { motion, useScroll, useTransform } from 'framer-motion'

const orbs = [
  { top: '3%', left: '8%', size: 380, color: 'oklch(0.68 0.12 265 / 0.035)', rate: -200 },
  { top: '12%', left: '75%', size: 280, color: 'oklch(0.72 0.10 290 / 0.03)', rate: -350 },
  { top: '30%', left: '85%', size: 320, color: 'oklch(0.76 0.10 170 / 0.025)', rate: -150 },
  { top: '45%', left: '3%', size: 240, color: 'oklch(0.68 0.12 265 / 0.03)', rate: -400 },
  { top: '60%', left: '70%', size: 300, color: 'oklch(0.72 0.10 290 / 0.035)', rate: -250 },
  { top: '75%', left: '12%', size: 350, color: 'oklch(0.76 0.10 170 / 0.02)', rate: -180 },
  { top: '88%', left: '60%', size: 260, color: 'oklch(0.68 0.12 265 / 0.025)', rate: -320 },
]

function ParallaxOrb({ orb }) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, orb.rate])

  return (
    <motion.div
      style={{
        y,
        position: 'absolute',
        top: orb.top,
        left: orb.left,
        width: orb.size,
        height: orb.size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
        filter: 'blur(60px)',
      }}
    />
  )
}

export default function ParallaxBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {orbs.map((orb, i) => (
        <ParallaxOrb key={i} orb={orb} />
      ))}
    </div>
  )
}
