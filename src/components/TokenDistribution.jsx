import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const allocationData = [
  { key: 'reserve', category: 'Reserve / Listings', pct: 25, color: '#fcd34d' },
  { key: 'dao', category: 'DAO Treasury', pct: 20, color: '#93c5fd' },
  { key: 'liquidity', category: 'Liquidity', pct: 20, color: '#fdba74' },
  { key: 'community', category: 'Community', pct: 15, color: '#a5b4fc' },
  { key: 'team', category: null, pct: 9, color: '#fca5a5' },
  { key: 'ecosystem', category: 'Ecosystem', pct: 6, color: '#99f6e4' },
  { key: 'staking', category: 'Staking Airdrop', pct: 5, color: '#c4b5fd' },
]

const summaryCardData = [
  { key: 'immediate', value: '71%', icon: '⚡' },
  { key: 'vested', value: '24%', icon: '🔒' },
  { key: 'stakingPool', value: '5%', icon: '⭐' },
]

export default function TokenDistribution() {
  const { t } = useTranslation()
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
          <span className="badge badge-primary badge-outline badge-sm uppercase tracking-[0.15em] mb-4">{t('tokenDistribution.badge')}</span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text">{t('tokenDistribution.title').split('<gradient>')[1]?.split('</gradient>')[0]}</span>{t('tokenDistribution.title').split('</gradient>')[1]}
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            {t('tokenDistribution.description')}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {allocationData.map((a, i) => (
            <motion.div
              key={a.key}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-4 mb-4 group"
            >
              <span className="w-32 text-sm text-base-content/70 shrink-0 group-hover:text-base-content transition-colors">
                {a.category ?? t('tokenomics.allocations.team')}
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
                    {t(`tokenDistribution.allocations.${a.key}`)}
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
          {summaryCardData.map(({ key, value, icon }) => (
            <div key={key} className="bg-base-100 border border-base-300 rounded-xl p-5 text-center shadow-sm">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="text-2xl font-bold font-mono gradient-text mb-1">{value}</div>
              <div className="text-sm font-bold mb-1">{t(`tokenDistribution.summaryCards.${key}.title`)}</div>
              <p className="text-xs text-base-content/70">{t(`tokenDistribution.summaryCards.${key}.desc`)}</p>
            </div>
          ))}        </motion.div>
      </div>
    </section>
  )
}
