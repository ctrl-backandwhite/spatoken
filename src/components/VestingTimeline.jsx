import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const yearData = [
  { year: 1, released: 0, cumulative: 0 },
  { year: 2, released: 0, cumulative: 0 },
  { year: 3, released: 30000, cumulative: 30000 },
  { year: 4, released: 30000, cumulative: 60000 },
  { year: 5, released: 30000, cumulative: 90000 },
]

export default function VestingTimeline() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -30])
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -140])

  const years = yearData.map((y) => ({
    ...y,
    label: t(`vesting.years.${y.year}.label`),
    desc: t(`vesting.years.${y.year}.desc`),
  }))

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Parallax decorative orb */}
      <motion.div
        style={{ y: decorY }}
        className="absolute -right-16 top-1/2 w-96 h-96 rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, oklch(0.76 0.10 170 / 0.03), transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ y: headerY }}
          className="text-center mb-14"
        >
          <span className="badge badge-primary badge-outline badge-sm uppercase tracking-[0.15em] mb-4">{t('vesting.badge')}</span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            {t('vesting.title').split('<gradient>')[0]}<span className="gradient-text">{t('vesting.title').split('<gradient>')[1]?.split('</gradient>')[0]}</span>{t('vesting.title').split('</gradient>')[1]}
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('vesting.description') }}
          />
        </motion.div>

        {/* Timeline */}
        <ul className="timeline timeline-snap-icon timeline-vertical max-md:timeline-compact max-w-3xl mx-auto">
          {years.map(({ year, released, cumulative, label, desc }, i) => {
            const isLeft = i % 2 === 0
            const isLocked = released === 0

            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <div
                  className={`card border ${isLocked
                      ? 'bg-base-200 border-base-300'
                      : 'bg-base-200 border-primary/40'
                    }`}
                >
                  <div className="card-body p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`badge badge-sm ${isLocked ? 'badge-ghost' : 'badge-primary'}`}>
                        {label}
                      </span>
                      {!isLocked && (
                        <span className="text-xs font-mono text-accent">+{(released / 1000).toFixed(0)}B</span>
                      )}
                    </div>
                    <p className="text-sm text-base-content/70">{desc}</p>
                    {!isLocked && (
                      <div className="mt-3 h-2 bg-base-300 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${(cumulative / 90000) * 100}%` } : {}}
                          transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        />
                      </div>
                    )}
                    {!isLocked && (
                      <div className="text-right text-xs text-base-content/70 mt-1 font-mono">
                        {t('vesting.progress', { current: (cumulative / 1000).toFixed(0) })}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )

            return (
              <li key={year}>
                {i > 0 && <hr className={!isLocked || (i > 0 && years[i - 1].released > 0) ? 'bg-primary' : ''} />}

                {isLeft && (
                  <div className="timeline-start mb-10 md:text-end">
                    {cardContent}
                  </div>
                )}

                <div className="timeline-middle">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${isLocked
                        ? 'bg-base-200 border-base-300 text-base-content/70'
                        : 'bg-gradient-to-br from-primary to-secondary border-primary text-white'
                      }`}
                  >
                    {isLocked ? '🔒' : '✅'}
                  </div>
                </div>

                {!isLeft && (
                  <div className="timeline-end mb-10">
                    {cardContent}
                  </div>
                )}

                {i < years.length - 1 && <hr className={!isLocked ? 'bg-primary' : ''} />}
              </li>
            )
          })}
        </ul>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-8 max-w-2xl mx-auto bg-base-100 border border-base-300 rounded-2xl p-6 text-center shadow-sm"
        >
          <div className="text-2xl mb-3">🛡️</div>
          <h4 className="text-sm font-bold mb-2">{t('vesting.trustTitle')}</h4>
          <p className="text-xs text-base-content/70 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('vesting.trustDesc') }}
          />
        </motion.div>
      </div>
    </section>
  )
}
