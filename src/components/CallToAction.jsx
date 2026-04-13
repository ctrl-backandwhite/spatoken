import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLink, faFire, faShieldHalved } from '@fortawesome/free-solid-svg-icons'

export default function CallToAction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useTranslation()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const glowY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9])

  const trustItems = [
    { icon: faShieldHalved, key: 'audited' },
    { icon: faLink, key: 'bnbChain' },
    { icon: faLock, key: 'teamLocked' },
    { icon: faFire, key: 'maxBurn' },
  ]

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
            {t('cta.title')}
            <br />
            <span className="gradient-text">{t('cta.titleHighlight')}</span>?
          </h2>
          <p className="text-base-content/70 text-lg mb-10 max-w-xl mx-auto">
            {t('cta.description')}
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary btn-lg"
            >
              {t('cta.buyBtn')}
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline btn-lg"
            >
              {t('cta.whitepaperBtn')}
            </motion.a>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-14 flex justify-center gap-8 flex-wrap"
          >
            {trustItems.map(({ icon, key }) => (
              <div key={key} className="flex items-center gap-2 text-sm text-base-content/70">
                <FontAwesomeIcon icon={icon} className="text-primary/60" />
                <span>{t(`cta.trust.${key}`)}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
