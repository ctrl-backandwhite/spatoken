import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import CountUp from 'react-countup'

export default function BurnSimulator() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -30])
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const [amount, setAmount] = useState(1000)
  const [burnRate, setBurnRate] = useState(1)
  const [showResult, setShowResult] = useState(false)
  const [key, setKey] = useState(0)

  const burned = (amount * burnRate) / 100
  const received = amount - burned

  const handleSimulate = () => {
    setKey((k) => k + 1)
    setShowResult(true)
  }

  return (
    <section className="py-28 bg-base-100 relative overflow-hidden">
      {/* Parallax decorative orb */}
      <motion.div
        style={{ y: decorY }}
        className="absolute -right-20 top-1/4 w-80 h-80 rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, oklch(0.68 0.12 265 / 0.04), transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ y: headerY }}
          className="text-center mb-12"
        >
          <span className="badge badge-primary badge-outline badge-sm uppercase tracking-[0.15em] mb-4">Capítulo 2</span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Un token que <span className="gradient-text">se quema</span>
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Cada vez que envías NX036 a otra persona, un porcentaje se destruye permanentemente.
            No va a ninguna wallet — <strong className="text-base-content">desaparece del supply total</strong>.
            Puedes simularlo:
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="card bg-base-100 shadow-sm border border-base-300 p-8 max-w-2xl mx-auto"
        >
          {/* Input */}
          <div className="mb-6">
            <label className="text-xs text-base-content/70 uppercase tracking-wider block mb-2">
              Tokens a enviar
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
              className="range range-primary range-sm w-full"
            />
            <div className="flex justify-between text-sm mt-2">
              <span className="text-base-content/70">100</span>
              <span className="text-xl font-bold font-mono gradient-text">{amount.toLocaleString()} NX036</span>
              <span className="text-base-content/70">10,000</span>
            </div>
          </div>

          {/* Burn rate */}
          <div className="mb-8">
            <label className="text-xs text-base-content/70 uppercase tracking-wider block mb-2">
              Tasa de quema: <span className="text-primary font-bold">{burnRate}%</span>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              step={0.5}
              value={burnRate}
              onChange={(e) => {
                setBurnRate(Number(e.target.value))
                setShowResult(false)
              }}
              className="range range-secondary range-sm w-full"
            />
            <div className="flex justify-between text-xs text-base-content/70 mt-1">
              <span>1% (actual)</span>
              <span>5%</span>
              <span>10% (máximo)</span>
            </div>
          </div>

          {/* Simulate button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSimulate}
            className="btn btn-primary w-full"
          >
            🔥 Simular Transferencia
          </motion.button>

          {/* Animated result */}
          <AnimatePresence mode="wait">
            {showResult && (
              <motion.div
                key={key}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mt-8 overflow-hidden"
              >
                {/* Flow animation */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex-1 bg-base-200 border border-base-300 rounded-xl p-4 text-center">
                    <div className="text-xs text-base-content/70 mb-1">Envías</div>
                    <div className="text-lg font-bold font-mono">{amount.toLocaleString()}</div>
                  </div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <svg width="40" height="24" viewBox="0 0 40 24" className="text-primary">
                      <path d="M2 12h32M28 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>

                  <div className="flex-1 flex flex-col gap-2">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-error/10 border border-error/30 rounded-xl p-3 text-center"
                    >
                      <div className="text-xs text-error mb-1">🔥 Quemados</div>
                      <div className="text-lg font-bold font-mono text-error">
                        <CountUp end={burned} decimals={burned % 1 !== 0 ? 2 : 0} duration={1.5} separator="," key={key + 'b'} />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-success/10 border border-success/30 rounded-xl p-3 text-center"
                    >
                      <div className="text-xs text-success mb-1">✅ Recibidos</div>
                      <div className="text-lg font-bold font-mono text-success">
                        <CountUp end={received} decimals={received % 1 !== 0 ? 2 : 0} duration={1.5} separator="," key={key + 'r'} />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Supply impact */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-base-200 border border-base-300 rounded-xl p-4 text-center"
                >
                  <p className="text-sm text-base-content/70">
                    Con esta transferencia, el supply total se redujo en{' '}
                    <strong className="text-primary">{burned.toLocaleString()} tokens</strong>{' '}
                    — para siempre. Nadie los puede recuperar.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Explanation note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center text-xs text-base-content/70 mt-8 max-w-lg mx-auto"
        >
          💡 La tasa actual es 1% pero el owner puede ajustarla entre 1% y 10%.
          El tope global es 500 mil millones de tokens quemados (50% del supply).
          Después de eso, las transferencias siguen sin quema y el dinero recolectado se usa para distribuir tokens a los holders.
        </motion.p>
      </div>
    </section>
  )
}
