import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const allocations = [
  { category: 'Reserve / Listings', pct: 25, color: '#fcd34d', desc: 'CEX listings y market making' },
  { category: 'DAO Treasury', pct: 20, color: '#93c5fd', desc: 'Fondos de la comunidad' },
  { category: 'Liquidity', pct: 20, color: '#fdba74', desc: 'PancakeSwap pool' },
  { category: 'Community', pct: 15, color: '#a5b4fc', desc: 'Vesting lineal 6 meses' },
  { category: 'Equipo', pct: 9, color: '#fca5a5', desc: 'Bloqueado 3-5 años' },
  { category: 'Ecosystem', pct: 6, color: '#99f6e4', desc: 'Partnerships y growth' },
  { category: 'Staking Airdrop', pct: 5, color: '#c4b5fd', desc: '90 días de rewards' },
]

export default function TokenDistribution() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -30])
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -110])

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Parallax decorative orb */}
      <motion.div
        style={{ y: decorY }}
        className="absolute -left-20 bottom-1/4 w-80 h-80 rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, oklch(0.68 0.12 265 / 0.03), transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ y: headerY }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center text-xs font-semibold text-primary bg-primary/5 border border-primary/15 rounded-full px-3 py-1 uppercase tracking-[0.15em] mb-4">Capítulo 8</span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Distribución</span> completa
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            1,000,000,000,000 tokens NX036 distribuidos estratégicamente.
            Sin mint adicional — nunca se crearán más tokens.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {allocations.map((a, i) => (
            <motion.div
              key={a.category}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-4 mb-4 group"
            >
              <span className="w-32 text-sm text-base-content/70 shrink-0 group-hover:text-base-content transition-colors">
                {a.category}
              </span>
              <div className="flex-1 h-9 bg-base-200 rounded-lg overflow-hidden relative border border-base-300">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${a.pct}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-lg"
                  style={{ background: a.color }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-3">
                  <span className="text-[0.65rem] text-base-content font-medium">
                    {a.desc}
                  </span>
                  <span className="text-xs font-bold font-mono text-base-content">{a.pct}%</span>
                </div>
              </div>
              <span className="w-20 text-xs font-mono text-base-content/70 text-right shrink-0">
                {((a.pct / 100) * 1_000_000_000_000).toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Summary cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            {
              title: 'Inmediatos',
              value: '71%',
              desc: 'Reserve, DAO, Liquidity, Ecosystem — disponibles desde el día 1',
              icon: '⚡',
            },
            {
              title: 'Con Vesting',
              value: '24%',
              desc: 'Community (6m), Equipo (3-5 años) — liberación gradual',
              icon: '🔒',
            },
            {
              title: 'Staking Pool',
              value: '5%',
              desc: '50B tokens distribuidos diariamente durante 90 días entre stakers',
              icon: '⭐',
            },
          ].map(({ title, value, desc, icon }) => (
            <div key={title} className="bg-base-100 border border-base-300 rounded-xl p-5 text-center shadow-sm">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="text-2xl font-bold font-mono gradient-text mb-1">{value}</div>
              <div className="text-sm font-bold mb-1">{title}</div>
              <p className="text-xs text-base-content/70">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
