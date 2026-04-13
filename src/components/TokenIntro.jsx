import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import CountUp from 'react-countup'

const stats = [
  { value: 1, suffix: ' Trillón', label: 'Supply Total' },
  { value: 50, suffix: '%', label: 'Quema Máxima' },
  { value: 5, suffix: ' niveles', label: 'E-Commerce' },
  { value: 90, suffix: ' días', label: 'Staking Airdrop' },
]

export default function TokenIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -40])
  const cardsY = useTransform(scrollYProgress, [0, 1], [40, -20])

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ y: headerY }}
          className="text-center mb-16"
        >
          <span className="badge badge-primary badge-outline badge-sm uppercase tracking-[0.15em] mb-4">Capítulo 1</span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            ¿Qué es <span className="gradient-text">NX036</span>?
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Un token con <strong className="text-base-content">supply fijo</strong> que no permite generar más.
            Cada vez que alguien transfiere, compra o usa el e-commerce,
            <strong className="text-primary"> una parte desaparece para siempre</strong>,
            reduciendo los tokens en circulación.
          </p>
        </motion.div>

        {/* Animated stats */}
        <motion.div style={{ y: cardsY }} className="stats stats-vertical md:stats-horizontal shadow-sm border border-base-300 w-full">
          {stats.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="stat place-items-center"
            >
              <div className="stat-value text-2xl font-extrabold font-mono gradient-text">
                {isInView && (
                  <CountUp
                    end={value}
                    duration={2.5}
                    separator=""
                    suffix={suffix}
                  />
                )}
              </div>
              <div className="stat-desc text-xs">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Visual explanation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 card bg-base-100 shadow-sm border border-base-300 p-8"
        >
          <h3 className="text-lg font-bold mb-6 text-center">Así funciona el ecosistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: '1',
                icon: '🔥',
                title: 'Quema automática',
                desc: 'Cada transferencia quema un 1% automáticamente. El supply se reduce con cada movimiento.',
              },
              {
                step: '2',
                icon: '🛒',
                title: 'E-Commerce NX036',
                desc: 'Compra productos reales y gana puntos de lealtad. Cada compra quema tokens del pool.',
              },
              {
                step: '3',
                icon: '⚡',
                title: 'Staking Diario',
                desc: 'Stakea tus tokens y recibe recompensas diarias durante 90 días proporcionales a tu stake.',
              },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="relative p-5 rounded-xl bg-base-200 border border-base-300">
                <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[0.65rem] font-bold text-white">
                  {step}
                </div>
                <div className="text-2xl mb-3 mt-1">{icon}</div>
                <h4 className="text-sm font-bold mb-2">{title}</h4>
                <p className="text-xs text-base-content/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
