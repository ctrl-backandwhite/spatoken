import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import CountUp from 'react-countup'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore, faBagShopping, faHandshake, faCartShopping, faShirt, faTag, faBox, faGlobe, faFire } from '@fortawesome/free-solid-svg-icons'

const platforms = [
  {
    name: 'Etsy',
    icon: faStore,
    dailyTx: 2_000_000,
    avgOrder: 100,
    color: 'oklch(0.80 0.08 30)',
    accent: 'oklch(0.80 0.08 30 / 0.15)',
  },
  {
    name: 'eBay',
    icon: faBagShopping,
    dailyTx: 5_000_000,
    avgOrder: 100,
    color: 'oklch(0.78 0.08 260)',
    accent: 'oklch(0.78 0.08 260 / 0.15)',
  },
  {
    name: 'MercadoLibre',
    icon: faHandshake,
    dailyTx: 12_000_000,
    avgOrder: 100,
    color: 'oklch(0.82 0.08 90)',
    accent: 'oklch(0.82 0.08 90 / 0.15)',
  },
  {
    name: 'Shopify (merchants)',
    icon: faCartShopping,
    dailyTx: 18_000_000,
    avgOrder: 100,
    color: 'oklch(0.80 0.08 150)',
    accent: 'oklch(0.80 0.08 150 / 0.15)',
  },
  {
    name: 'Shein',
    icon: faShirt,
    dailyTx: 30_000_000,
    avgOrder: 100,
    color: 'oklch(0.78 0.07 0)',
    accent: 'oklch(0.78 0.07 0 / 0.15)',
  },
  {
    name: 'Temu',
    icon: faTag,
    dailyTx: 40_000_000,
    avgOrder: 100,
    color: 'oklch(0.80 0.08 35)',
    accent: 'oklch(0.80 0.08 35 / 0.15)',
  },
  {
    name: 'Amazon',
    icon: faBox,
    dailyTx: 50_000_000,
    avgOrder: 100,
    color: 'oklch(0.82 0.08 60)',
    accent: 'oklch(0.82 0.08 60 / 0.15)',
  },
  {
    name: 'Alibaba Group',
    icon: faGlobe,
    dailyTx: 90_000_000,
    avgOrder: 100,
    color: 'oklch(0.78 0.07 25)',
    accent: 'oklch(0.78 0.07 25 / 0.15)',
  },
]

const avgDailyTx = Math.round(
  platforms.reduce((sum, p) => sum + p.dailyTx, 0) / platforms.length
)

const maxTx = platforms[platforms.length - 1].dailyTx
const BURN_RATE = 0.01

function PlatformRow({ platform, index, isInView, activeIndex, highlight }) {
  const { t } = useTranslation()
  const isActive = isInView && index <= activeIndex
  const burnDaily = highlight ? platform.dailyTx * platform.avgOrder * BURN_RATE : 0
  const barWidth = (platform.dailyTx / maxTx) * 100

  return (
    <motion.div
      initial={{ opacity: 0, x: highlight ? 0 : -40, scale: highlight ? 0.95 : 1 }}
      animate={isActive
        ? { opacity: 1, x: 0, scale: 1 }
        : { opacity: 0, x: highlight ? 0 : -40, scale: highlight ? 0.95 : 1 }}
      transition={{ duration: highlight ? 0.7 : 0.4, delay: 0.05, ease: 'easeOut' }}
      className={highlight
        ? 'relative rounded-2xl border-2 border-primary/30 bg-primary/[0.03] p-4 -mx-4'
        : 'group'}
    >
      {highlight && (
        <motion.div
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {t('burnScale.ourProjection')}
        </motion.div>
      )}
      <div className="flex items-center gap-3">
        <div className={`${highlight ? 'w-10 h-10' : 'w-8 h-8'} rounded-lg flex items-center justify-center ${highlight ? 'text-xl' : 'text-base'} shrink-0 ${highlight ? 'ring-2 ring-primary/30' : ''}`}
          style={{ background: platform.accent }}>
          <FontAwesomeIcon icon={platform.icon} style={{ color: platform.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between mb-1">
            <span className={`font-semibold ${highlight ? 'text-sm text-primary' : 'text-xs'}`}>
              {platform.name}
              {highlight && <span className="text-xs font-normal text-base-content/70 ml-2">{t('burnScale.industryAvg')}</span>}
            </span>
            <span className="text-[11px] text-base-content/70 font-mono">
              {isActive && (
                <CountUp end={platform.dailyTx} duration={1.8} separator="," suffix={t('burnScale.txPerDay')} />
              )}
            </span>
          </div>
          {/* Bar */}
          <div className={`${highlight ? 'h-7' : 'h-2.5'} rounded-full bg-base-200 overflow-hidden relative`}>
            <motion.div
              initial={{ width: 0 }}
              animate={isActive ? { width: `${barWidth}%` } : { width: 0 }}
              transition={{ duration: 1.0, delay: 0.15, ease: 'easeOut' }}
              className="h-full rounded-full relative overflow-hidden"
              style={{
                background: highlight
                  ? 'linear-gradient(90deg, oklch(0.68 0.12 265), oklch(0.76 0.10 170))'
                  : `linear-gradient(90deg, ${platform.color}88, ${platform.color})`,
              }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                }}
                animate={isActive ? { x: ['-100%', '200%'] } : {}}
                transition={{ duration: 2, delay: 0.6, ease: 'easeInOut', repeat: highlight ? Infinity : 0, repeatDelay: 3 }}
              />
            </motion.div>
            {/* Burn label only for NX036 */}
            <AnimatePresence>
              {isActive && highlight && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="absolute inset-0 flex items-center justify-end pr-3"
                >
                  <span className="text-xs font-bold font-mono flex items-center gap-1 text-white">
                    <FontAwesomeIcon icon={faFire} /> <CountUp end={burnDaily} duration={2} separator="," suffix=" NX036" />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function EcommerceBurnScale() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState(-1)

  // +1 for the NX036 entry at the end
  const totalEntries = platforms.length + 1

  useEffect(() => {
    if (!isInView) return
    let i = 0
    const interval = setInterval(() => {
      if (i < totalEntries) {
        setActiveIndex(i)
        i++
      } else {
        clearInterval(interval)
      }
    }, 600)
    return () => clearInterval(interval)
  }, [isInView])

  const nx036Platform = {
    name: 'NX036',
    icon: faFire,
    dailyTx: avgDailyTx,
    avgOrder: 100,
    color: 'oklch(0.68 0.12 265)',
    accent: 'oklch(0.68 0.12 265 / 0.18)',
  }

  const nx036BurnDaily = nx036Platform.dailyTx * nx036Platform.avgOrder * BURN_RATE
  const nx036BurnYearly = nx036BurnDaily * 365

  const allVisible = activeIndex >= totalEntries - 1

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="badge badge-primary badge-outline badge-sm uppercase tracking-[0.15em] mb-4">
            {t('burnScale.badge')}
          </span>
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            {t('burnScale.title').split('<gradient>')[0]}<span className="gradient-text">{t('burnScale.title').split('<gradient>')[1]?.split('</gradient>')[0]}</span>{t('burnScale.title').split('</gradient>')[1]}
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('burnScale.p1') }}
          />
          <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed mt-4"
            dangerouslySetInnerHTML={{ __html: t('burnScale.p2') }}
          />
          <p className="text-sm text-base-content/70/80 mt-4"
            dangerouslySetInnerHTML={{ __html: t('burnScale.p3') }}
          />
        </motion.div>

        {/* Reference platform rows */}
        <div className="space-y-4">
          {platforms.map((platform, i) => (
            <PlatformRow
              key={platform.name}
              platform={platform}
              index={i}
              isInView={isInView}
              activeIndex={activeIndex}
            />
          ))}
        </div>

        {/* NX036 highlighted entry */}
        <div className="mt-8">
          <PlatformRow
            platform={nx036Platform}
            index={platforms.length}
            isInView={isInView}
            activeIndex={activeIndex}
            highlight
          />
        </div>

        {/* Summary cards — NX036 projection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={allVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="card bg-base-100 shadow-sm border border-base-300 p-6 text-center">
            <div className="text-2xl font-extrabold font-mono gradient-text mb-1">
              {allVisible && (
                <CountUp end={nx036BurnDaily} duration={2.5} separator="," />
              )}
            </div>
            <div className="text-xs text-base-content/70">{t('burnScale.burnPerDay')}</div>
          </div>
          <div className="card bg-base-100 shadow-sm border border-base-300 p-6 text-center">
            <div className="text-2xl font-extrabold font-mono gradient-text mb-1">
              {allVisible && (
                <CountUp end={nx036BurnYearly} duration={2.5} separator="," />
              )}
            </div>
            <div className="text-xs text-base-content/70">{t('burnScale.burnPerYear')}</div>
          </div>
          <div className="card bg-primary/5 border border-primary/20 p-6 text-center">
            <div className="text-2xl font-extrabold font-mono text-primary mb-1">
              {allVisible && (
                <CountUp
                  end={+(nx036BurnYearly / 1_000_000_000_000 * 100).toFixed(2)}
                  duration={2.5}
                  decimals={2}
                  suffix="%"
                />
              )}
            </div>
            <div className="text-xs text-base-content/70">{t('burnScale.supplyPerYear')}</div>
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={allVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center text-xs text-base-content/70 mt-6 max-w-xl mx-auto"
        >
          {t('burnScale.footnote')}
        </motion.p>
      </div>
    </section>
  )
}
