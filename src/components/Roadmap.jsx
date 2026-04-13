import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faRocket, faCartShopping, faMobileScreen, faLandmark, faGlobe, faGem, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

const phaseStaticData = [
  { quarter: 'Q4 2026', key: 'q42026', icon: faWrench, status: 'active' },
  { quarter: 'Q1 2027', key: 'q12027', icon: faRocket, status: 'upcoming' },
  { quarter: 'Q2 2027', key: 'q22027', icon: faCartShopping, status: 'upcoming' },
  { quarter: 'Q3 2027', key: 'q32027', icon: faMobileScreen, status: 'upcoming' },
  { quarter: 'Q4 2027', key: 'q42027', icon: faLandmark, status: 'upcoming' },
  { quarter: 'Q1 2028', key: 'q12028', icon: faGlobe, status: 'upcoming' },
  { quarter: 'Q2 2028', key: 'q22028', icon: faGem, status: 'upcoming' },
]

export default function Roadmap() {
  const { t } = useTranslation()
  const ref = useRef(null)

  const phases = phaseStaticData.map(({ quarter, key, icon, status }) => ({
    quarter,
    key,
    icon,
    status,
    period: t(`roadmap.phases.${key}.period`),
    title: t(`roadmap.phases.${key}.title`),
    items: t(`roadmap.phases.${key}.items`, { returnObjects: true }),
  }))
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -30])

  return (
    <section id="roadmap" className="py-28 bg-base-100 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ y: headerY }}
          className="text-center mb-14"
        >
          <span className="badge badge-primary badge-outline badge-sm uppercase tracking-[0.15em] mb-4">
            {t('roadmap.badge')}
          </span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            {t('roadmap.title').split('<gradient>')[0]}<span className="gradient-text">{t('roadmap.title').split('<gradient>')[1]?.split('</gradient>')[0]}</span>{t('roadmap.title').split('</gradient>')[1]}
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            {t('roadmap.description')}
          </p>
        </motion.div>

        {/* Timeline */}
        <ul className="timeline timeline-snap-icon timeline-vertical max-md:timeline-compact">
          {phases.map(({ quarter, key, period, title, icon, status, items }, i) => {
            const isLeft = i % 2 === 0
            const isActive = status === 'active'
            const prevActive = i > 0 && phases[i - 1].status === 'active'

            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div
                  className={`card border transition-all ${isActive
                    ? 'bg-base-100 border-primary/30 shadow-md'
                    : 'bg-base-100 border-base-300 shadow-sm'
                    }`}
                >
                  <div className="card-body p-6">
                    {/* Quarter badge */}
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`badge badge-sm ${isActive
                          ? 'badge-primary'
                          : 'badge-ghost'
                          }`}
                      >
                        {quarter} {isActive && t('roadmap.active')}
                      </span>
                      <span className="text-[0.6rem] text-base-content/70">{period}</span>
                    </div>

                    <h3 className="card-title text-base">{title}</h3>

                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-base-content/70 flex items-start gap-2 leading-relaxed"
                        >
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-accent' : 'bg-base-300'
                              }`}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )

            return (
              <li key={key}>
                {i > 0 && <hr className={prevActive || isActive ? 'bg-primary' : ''} />}

                {isLeft && (
                  <div className="timeline-start mb-10 md:text-end">
                    {cardContent}
                  </div>
                )}

                <div className="timeline-middle">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 shadow-sm ${isActive
                      ? 'bg-gradient-to-br from-primary to-secondary border-primary text-white'
                      : 'bg-base-100 border-base-300 text-base-content/50'
                      }`}
                  >
                    <FontAwesomeIcon icon={icon} />
                  </div>
                </div>

                {!isLeft && (
                  <div className="timeline-end mb-10">
                    {cardContent}
                  </div>
                )}

                {i < phases.length - 1 && <hr className={isActive ? 'bg-primary' : ''} />}
              </li>
            )
          })}
        </ul>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-4 max-w-2xl mx-auto bg-base-100 border border-base-300 rounded-2xl p-6 text-center shadow-sm"
        >
          <div className="text-2xl mb-3 text-primary/50"><FontAwesomeIcon icon={faCalendarDays} /></div>
          <h4 className="text-sm font-bold mb-2">{t('roadmap.updateTitle')}</h4>
          <p className="text-xs text-base-content/70 leading-relaxed">
            {t('roadmap.updateDesc')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
