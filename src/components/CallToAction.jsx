import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function CallToAction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const glowY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9])

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Parallax background glow */}
      <motion.div
        style={{ y: glowY, scale: glowScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(0.68 0.12 265 / 0.05) 0%, oklch(0.72 0.10 290 / 0.025) 50%, transparent 70%)' }} />
      </motion.div>

      <div className="max-w-3xl mx-auto px-8 text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold tracking-tight mb-6 leading-tight">
            Listo para unirte al
            <br />
            <span className="gradient-text">ecosistema NX036</span>?
          </h2>
          <p className="text-base-content/70 text-lg mb-10 max-w-xl mx-auto">
            Un token deflacionario con e-commerce integrado, staking de 90 días,
            equipo bloqueado 3-5 años y buyback transparente.
            Verifica todo on-chain.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary btn-lg"
            >
              Comprar NX036
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline btn-lg"
            >
              Leer Whitepaper
            </motion.a>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-14 flex justify-center gap-8 flex-wrap"
          >
            {[
              { icon: '🔐', label: 'Contratos auditados' },
              { icon: '⛓️', label: 'BNB Chain' },
              { icon: '🔒', label: 'Equipo bloqueado' },
              { icon: '🔥', label: '50% max burn' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-base-content/70">
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
