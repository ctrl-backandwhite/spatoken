import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import CountUp from 'react-countup'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal, faTrophy, faGem, faCrown, faHeadphones, faClock, faKeyboard, faDesktop, faCircleCheck, faFire, faArrowTrendDown, faStar } from '@fortawesome/free-solid-svg-icons'

const tiers = [
  { name: 'Basic', multiplier: 1, color: '#b8b8d0', icon: faMedal },
  { name: 'Silver', multiplier: 2, color: '#94a3b8', icon: faMedal },
  { name: 'Gold', multiplier: 3, color: '#d97706', icon: faTrophy },
  { name: 'Platinum', multiplier: 4, color: '#8b5cf6', icon: faGem },
  { name: 'Diamond', multiplier: 5, color: '#0ea5e9', icon: faCrown },
]

export default function EcommerceExperience() {
  const { t } = useTranslation()

  const products = [
    { key: 'bluetooth', name: t('ecommerce.products.bluetooth'), price: 3500, icon: faHeadphones },
    { key: 'smartwatch', name: t('ecommerce.products.smartwatch'), price: 8900, icon: faClock },
    { key: 'keyboard', name: t('ecommerce.products.keyboard'), price: 12500, icon: faKeyboard },
    { key: 'monitor', name: t('ecommerce.products.monitor'), price: 45000, icon: faDesktop },
  ]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -30])
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -130])
  const [selectedTier, setSelectedTier] = useState(0)
  const [cart, setCart] = useState(null)
  const [purchased, setPurchased] = useState(false)
  const [simKey, setSimKey] = useState(0)

  const tier = tiers[selectedTier]

  const handleBuy = (product) => {
    setCart(product)
    setPurchased(false)
  }

  const handleCheckout = () => {
    setSimKey((k) => k + 1)
    setPurchased(true)
  }

  const tokensBurned = cart ? (cart.price / 100) * tier.multiplier : 0
  const loyaltyPoints = tokensBurned

  return (
    <section className="py-16 md:py-28 relative overflow-hidden">
      {/* Parallax decorative orb */}
      <motion.div
        style={{ y: decorY }}
        className="absolute -right-16 top-20 w-72 h-72 rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, oklch(0.76 0.10 170 / 0.04), transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ y: headerY }}
          className="text-center mb-14"
        >
          <span className="badge badge-primary badge-outline badge-sm uppercase tracking-[0.15em] mb-4">{t('ecommerce.badge')}</span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            {t('ecommerce.title').split('<gradient>')[0]}<span className="gradient-text">{t('ecommerce.title').split('<gradient>')[1]?.split('</gradient>')[0]}</span>{t('ecommerce.title').split('</gradient>')[1]}
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('ecommerce.description') }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Tier selector */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-base-content/70 mb-4">{t('ecommerce.tierLabel')}</h3>
            <div className="space-y-2">
              {tiers.map((tierItem, i) => (
                <button
                  key={tierItem.name}
                  onClick={() => {
                    setSelectedTier(i)
                    setPurchased(false)
                  }}
                  className={`btn btn-block justify-between text-sm ${selectedTier === i
                    ? 'btn-primary btn-outline'
                    : 'btn-ghost'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={tierItem.icon} style={{ color: tierItem.color }} className="text-base w-4" />
                    <span className="font-bold">{tierItem.name}</span>
                  </span>
                  <span className="font-mono text-xs" style={{ color: tierItem.color }}>
                    {tierItem.multiplier}x
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4 p-3 bg-base-200 rounded-xl text-center">
              <div className="text-xs text-base-content/70 mb-1">{t('ecommerce.tokensPerDollar')}</div>
              <div className="text-2xl font-bold font-mono" style={{ color: tier.color }}>
                {tier.multiplier}
              </div>
            </div>
          </motion.div>

          {/* Center: Products */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-base-content/70 mb-4">
              {t('ecommerce.shopTitle')}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {products.map((p) => (
                <motion.button
                  key={p.name}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleBuy(p)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${cart?.name === p.name
                    ? 'border-primary bg-primary/5'
                    : 'border-base-300 bg-base-200 hover:border-base-content/50'
                    }`}
                >
                  <div className="text-3xl mb-2 text-primary/50"><FontAwesomeIcon icon={p.icon} /></div>
                  <div className="text-xs font-bold leading-tight">{p.name}</div>
                  <div className="text-sm font-mono text-primary mt-1">
                    ${(p.price / 100).toFixed(2)}
                  </div>
                </motion.button>
              ))}
            </div>

            {cart && !purchased && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="btn btn-primary w-full mt-4"
              >
                {t('ecommerce.buyBtn', { name: cart.name })}
              </motion.button>
            )}
          </motion.div>

          {/* Right: Result */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-base-content/70 mb-4">
              {t('ecommerce.resultTitle')}
            </h3>

            <AnimatePresence mode="wait">
              {!cart ? (
                <motion.div key="empty" className="flex items-center justify-center h-64 text-base-content/70 text-sm text-center">
                  <p>{t('ecommerce.selectProduct')}</p>
                </motion.div>
              ) : !purchased ? (
                <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="text-center p-4 bg-base-200 rounded-xl">
                    <div className="text-4xl mb-2 text-primary/50"><FontAwesomeIcon icon={cart.icon} /></div>
                    <div className="font-bold">{cart.name}</div>
                    <div className="text-lg font-mono text-primary">${(cart.price / 100).toFixed(2)}</div>
                  </div>
                  <div className="text-center p-4 bg-base-200 rounded-xl">
                    <div className="text-xs text-base-content/70 mb-1">{t('ecommerce.willBurn')}</div>
                    <div className="text-2xl font-bold font-mono text-error">
                      {tokensBurned.toLocaleString()} NX036
                    </div>
                    <div className="text-xs text-base-content/70 mt-1 flex items-center gap-1.5">
                      <FontAwesomeIcon icon={tier.icon} style={{ color: tier.color }} className="text-xs" />
                      {t('ecommerce.tierInfo', { name: tier.name, multiplier: tier.multiplier })}
                    </div>
                  </div>
                  <div className="text-xs text-base-content/70 text-center">
                    {t('ecommerce.clickToBuy')}
                  </div>
                </motion.div>
              ) : (
                <motion.div key={simKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {/* Animated steps */}
                  {[
                    { label: t('ecommerce.resultSteps.registered'), icon: faCircleCheck, iconClass: 'text-success', delay: 0 },
                    { label: t('ecommerce.resultSteps.burned', { count: tokensBurned.toLocaleString() }), icon: faFire, iconClass: 'text-error', delay: 0.3 },
                    { label: t('ecommerce.resultSteps.supplyReduced'), icon: faArrowTrendDown, iconClass: 'text-warning', delay: 0.6 },
                    { label: t('ecommerce.resultSteps.loyaltyAdded', { count: loyaltyPoints.toLocaleString() }), icon: faStar, iconClass: 'text-accent', delay: 0.9 },
                  ].map(({ label, icon, iconClass, delay }) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay }}
                      className="flex items-center gap-3 p-3 bg-base-200 rounded-xl text-sm"
                    >
                      <FontAwesomeIcon icon={icon} className={`text-base shrink-0 ${iconClass}`} />
                      <span>{label}</span>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className="p-4 bg-success/10 border border-success/30 rounded-xl text-center"
                  >
                    <div className="text-xs text-success mb-1">{t('ecommerce.loyaltyPoints')}</div>
                    <div className="text-3xl font-bold font-mono text-success">
                      <CountUp end={loyaltyPoints} duration={2} separator="," key={simKey + 'lp'} />
                    </div>
                    <div className="text-xs text-base-content/70 mt-1">
                      {t('ecommerce.loyaltyRedeemable')}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-10 bg-base-100 border border-base-300 rounded-2xl p-6 max-w-3xl mx-auto shadow-sm"
        >
          <h4 className="text-sm font-bold mb-3">{t('ecommerce.howTitle')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-base-content/70">
            <div className="flex gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>{t('ecommerce.howSteps.1')}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>{t('ecommerce.howSteps.2')}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>{t('ecommerce.howSteps.3')}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold">4.</span>
              <span>{t('ecommerce.howSteps.4')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
