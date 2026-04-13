import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import CountUp from 'react-countup'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faCartShopping, faBolt } from '@fortawesome/free-solid-svg-icons'

export default function TokenIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useTranslation()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -40])
  const cardsY = useTransform(scrollYProgress, [0, 1], [40, -20])

  const stats = [
    { value: 1, suffix: ` ${t('tokenIntro.stats.supplyValue')}`, label: t('tokenIntro.stats.supply') },
    { value: 50, suffix: '%', label: t('tokenIntro.stats.maxBurn') },
    { value: 5, suffix: ` ${t('tokenIntro.stats.ecommerceValue')}`, label: t('tokenIntro.stats.ecommerce') },
    { value: 90, suffix: ` ${t('tokenIntro.stats.stakingValue')}`, label: t('tokenIntro.stats.staking') },
  ]

  const steps = [
    { step: '1', icon: faFire, iconClass: 'text-primary', titleKey: 'tokenIntro.steps.burn.title', descKey: 'tokenIntro.steps.burn.desc' },
    { step: '2', icon: faCartShopping, iconClass: 'text-secondary', titleKey: 'tokenIntro.steps.ecommerce.title', descKey: 'tokenIntro.steps.ecommerce.desc' },
    { step: '3', icon: faBolt, iconClass: 'text-accent', titleKey: 'tokenIntro.steps.staking.title', descKey: 'tokenIntro.steps.staking.desc' },
  ]

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
          <span className="badge badge-primary badge-outline badge-sm uppercase tracking-[0.15em] mb-4">{t('tokenIntro.badge')}</span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            {t('tokenIntro.title').split('<gradient>')[0]}
            <span className="gradient-text">{t('tokenIntro.title').replace(/.*<gradient>/, '').replace(/<\/gradient>.*/, '')}</span>
            {t('tokenIntro.title').split('</gradient>')[1]}
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('tokenIntro.description') }}
          />
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
          <h3 className="text-lg font-bold mb-6 text-center">{t('tokenIntro.howItWorks')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map(({ step, icon, titleKey, descKey }) => (
              <div key={step} className="relative p-5 rounded-xl bg-base-200 border border-base-300">
                <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[0.65rem] font-bold text-white">
                  {step}
                </div>
                <div className="text-2xl mb-3 mt-1"><FontAwesomeIcon icon={icon} className={iconClass} /></div>
                <h4 className="text-sm font-bold mb-2">{t(titleKey)}</h4>
                <p className="text-xs text-base-content/70 leading-relaxed">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
