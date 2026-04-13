import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import CountUp from 'react-countup'
import { useTranslation } from 'react-i18next'

export default function DexDemo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useTranslation()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -30])
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const [mode, setMode] = useState('buy')
  const [amount, setAmount] = useState(1000)
  const [simKey, setSimKey] = useState(0)
  const [showResult, setShowResult] = useState(false)

  // Buy: 2.5% dev + 1% promo + 1% burn
  // Sell: 2.5% dev + 1% burn
  const devFee = (amount * 2.5) / 100
  const promoFee = mode === 'buy' ? (amount * 1) / 100 : 0
  const dexBurn = (amount * 1) / 100
  const userReceives = amount - devFee - promoFee - dexBurn
  const totalFees = mode === 'buy' ? 4.5 : 3.5

  const handleSimulate = () => {
    setSimKey((k) => k + 1)
    setShowResult(true)
  }

  const steps =
    mode === 'buy'
      ? [
        { label: t('dex.steps.buyPancake'), amount, color: 'text-base-content', icon: '💱' },
        { label: t('dex.steps.devFee'), amount: devFee, color: 'text-warning', icon: '🏗️' },
        { label: t('dex.steps.promoFee'), amount: promoFee, color: 'text-warning', icon: '📢' },
        { label: t('dex.steps.dexBurn'), amount: dexBurn, color: 'text-error', icon: '🔥' },
        { label: t('dex.steps.receiveWallet'), amount: userReceives, color: 'text-success', icon: '✅' },
      ]
      : [
        { label: t('dex.steps.sellPancake'), amount, color: 'text-base-content', icon: '💱' },
        { label: t('dex.steps.devFee'), amount: devFee, color: 'text-warning', icon: '🏗️' },
        { label: t('dex.steps.dexBurn'), amount: dexBurn, color: 'text-error', icon: '🔥' },
        { label: t('dex.steps.buyerReceives'), amount: userReceives, color: 'text-success', icon: '✅' },
      ]

  return (
    <section className="py-28 bg-base-100 relative overflow-hidden">
      {/* Parallax decorative orb */}
      <motion.div
        style={{ y: decorY }}
        className="absolute -left-24 top-1/3 w-72 h-72 rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, oklch(0.72 0.10 290 / 0.04), transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ y: headerY }}
          className="text-center mb-12"
        >
          <span className="badge badge-primary badge-outline badge-sm uppercase tracking-[0.15em] mb-4">{t('dex.badge')}</span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            {t('dex.title').split('<gradient>')[0]}
            <span className="gradient-text">{t('dex.title').replace(/.*<gradient>/, '').replace(/<\/gradient>.*/, '')}</span>
            {t('dex.title').split('</gradient>')[1]}
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('dex.description') }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="card bg-base-100 shadow-sm border border-base-300 p-8 max-w-2xl mx-auto"
        >
          {/* Buy / Sell toggle */}
          <div className="flex gap-2 mb-6 bg-base-200 rounded-xl p-1">
            {['buy', 'sell'].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m)
                  setShowResult(false)
                }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${mode === m
                  ? 'btn btn-primary btn-sm'
                  : 'btn btn-ghost btn-sm text-base-content/70'
                  }`}
              >
                {m === 'buy' ? t('dex.tabBuy') : t('dex.tabSell')}
              </button>
            ))}
          </div>

          {/* Amount slider */}
          <div className="mb-6">
            <label className="text-xs text-base-content/70 uppercase tracking-wider block mb-2">
              {t('dex.amountLabel')}
            </label>
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value))
                setShowResult(false)
              }}
              className="w-full"
            />
            <div className="text-center text-xl font-bold font-mono gradient-text mt-2">
              {amount.toLocaleString()} NX036
            </div>
          </div>

          {/* Fee summary bar */}
          <div className="flex gap-0.5 h-3 rounded-full overflow-hidden mb-4">
            <div className="bg-warning" style={{ width: '2.5%' }} title="Desarrollo" />
            {mode === 'buy' && <div className="bg-warning/70" style={{ width: '1%' }} title="Promoción" />}
            <div className="bg-error" style={{ width: '1%' }} title="Quema" />
            <div className="bg-success flex-1" title="Recibes" />
          </div>
          <div className="flex justify-between text-[0.65rem] text-base-content/70 mb-6">
            <span>{t('dex.totalFees', { pct: totalFees })}</span>
            <span>{t('dex.burnPerTrade')}</span>
            <span>{t('dex.youReceive', { pct: ((userReceives / amount) * 100).toFixed(1) })}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSimulate}
            className="btn btn-primary w-full"
          >
            {mode === 'buy' ? t('dex.simulateBuyBtn') : t('dex.simulateSellBtn')}
          </motion.button>

          <AnimatePresence mode="wait">
            {showResult && (
              <motion.div
                key={simKey}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 space-y-3 overflow-hidden"
              >
                {steps.map(({ label, amount: amt, color, icon }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center justify-between bg-base-200 border border-base-300 rounded-xl px-4 py-3"
                  >
                    <span className="text-sm flex items-center gap-2">
                      <span>{icon}</span> {label}
                    </span>
                    <span className={`font-mono font-bold ${color}`}>
                      <CountUp end={amt} decimals={2} duration={1} separator="," key={simKey + label} />
                    </span>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: steps.length * 0.15 + 0.2 }}
                  className="bg-base-200 border border-primary/30 rounded-xl p-4 text-center mt-4"
                >
                  <p className="text-sm text-base-content/70"
                    dangerouslySetInnerHTML={{
                      __html: t('dex.resultNote', {
                        amount: amount.toLocaleString(),
                        devFee: devFee.toFixed(0),
                        promoNote: mode === 'buy'
                          ? t('dex.promoNote', { promoFee: promoFee.toFixed(0), interpolation: { escapeValue: false } })
                          : '',
                        interpolation: { escapeValue: false },
                      })
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
