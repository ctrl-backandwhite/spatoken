import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function BurnCapJourney() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -30])
  const [burnPct, setBurnPct] = useState(0)
  const [animating, setAnimating] = useState(false)

  const capReached = burnPct >= 50
  const burnedTokens = (burnPct / 100) * 1_000_000_000_000
  const remaining = 1_000_000_000_000 - burnedTokens

  useEffect(() => {
    if (!animating) return
    if (burnPct >= 55) {
      setAnimating(false)
      return
    }
    const speed = burnPct < 48 ? 30 : 80
    const timer = setTimeout(() => {
      setBurnPct((p) => Math.min(p + 0.5, 55))
    }, speed)
    return () => clearTimeout(timer)
  }, [animating, burnPct])

  const handleAnimate = () => {
    setBurnPct(0)
    setAnimating(true)
  }

  return (
    <section className="py-28 bg-base-100 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ y: headerY }}
          className="text-center mb-12"
        >
          <span className="badge badge-primary badge-outline badge-sm uppercase tracking-[0.15em] mb-4">Capítulo 7</span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            ¿Qué pasa al llegar al <span className="gradient-text">50%</span>?
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            NX036 tiene un <strong className="text-base-content">tope de quema del 50%</strong> del supply (500 mil millones).
            Cuando se alcanza, la quema se detiene pero las comisiones siguen. Esos fondos se usan para{' '}
            <strong className="text-accent">recomprar tokens</strong> en el mercado y redistribuirlos, 90% a los holders 10% para la plataforma.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="card bg-base-100 shadow-sm border border-base-300 p-8 max-w-3xl mx-auto"
        >
          {/* Visual meter */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-base-content/70 mb-2">
              <span>Supply quemado</span>
              <span className={capReached ? 'text-rose-400 font-bold' : ''}>
                {burnPct > 50 ? '50.0' : burnPct.toFixed(1)}% {capReached ? '— TOPE ALCANZADO' : ''}
              </span>
            </div>
            <div className="h-8 bg-base-200 rounded-full overflow-hidden relative border border-base-300">
              {/* 50% marker */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-rose-400 z-10" />
              <div className="absolute left-1/2 -top-5 text-[0.6rem] text-rose-400 -translate-x-1/2 font-bold">
                50% CAP
              </div>

              <motion.div
                className={`h-full rounded-full transition-colors duration-300 ${
                  capReached
                    ? 'bg-gradient-to-r from-rose-300 to-rose-400'
                    : 'bg-gradient-to-r from-primary to-secondary'
                }`}
                animate={{ width: `${Math.min(burnPct, 50)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-base-200 border border-base-300 rounded-xl p-4 text-center">
              <div className="text-xs text-base-content/70 mb-1">Quemados</div>
              <div className="text-lg font-bold font-mono text-error">
                {burnedTokens > 500_000_000_000
                  ? '500B'
                  : (burnedTokens / 1_000_000_000).toFixed(0) + 'B'}
              </div>
            </div>
            <div className="bg-base-200 border border-base-300 rounded-xl p-4 text-center">
              <div className="text-xs text-base-content/70 mb-1">En circulación</div>
              <div className="text-lg font-bold font-mono text-success">
                {remaining < 500_000_000_000
                  ? '500B'
                  : (remaining / 1_000_000_000).toFixed(0) + 'B'}
              </div>
            </div>
            <div className="bg-base-200 border border-base-300 rounded-xl p-4 text-center">
              <div className="text-xs text-base-content/70 mb-1">Estado</div>
              <div className={`text-lg font-bold ${capReached ? 'text-warning' : 'text-primary'}`}>
                {capReached ? '🔄 Buyback' : '🔥 Quemando'}
              </div>
            </div>
          </div>

          {/* Manual slider */}
          <div className="mb-4">
            <input
              type="range"
              min={0}
              max={55}
              step={0.5}
              value={burnPct}
              onChange={(e) => {
                setBurnPct(Number(e.target.value))
                setAnimating(false)
              }}
              className="range range-primary range-sm w-full"
            />
            <div className="flex justify-between text-xs text-base-content/70 mt-1">
              <span>0% quemado</span>
              <span>Arrastra para explorar →</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnimate}
            className="btn btn-primary w-full"
          >
            ▶ Animar viaje completo
          </motion.button>

          {/* Phase explanations */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`card border transition-all ${!capReached ? 'border-primary bg-primary/5' : 'border-base-300 bg-base-200'}`}>
              <div className="card-body p-4">
                <h4 className="card-title text-sm">🔥 Fase de Quema (0-50%)</h4>
                <ul className="text-xs text-base-content/70 space-y-1.5">
                  <li>• Cada transferencia quema tokens</li>
                  <li>• Compras en e-commerce queman del pool</li>
                  <li>• Burns directos permitidos</li>
                  <li>• El supply se reduce activamente</li>
                </ul>
              </div>
            </div>
            <div className={`card border transition-all ${capReached ? 'border-accent bg-accent/5' : 'border-base-300 bg-base-200'}`}>
              <div className="card-body p-4">
                <h4 className="card-title text-sm">🔄 Fase de Recompra (post 50%)</h4>
                <ul className="text-xs text-base-content/70 space-y-1.5">
                  <li>• No se queman más tokens</li>
                  <li>• Comisiones DEX siguen activas</li>
                  <li>• Fondos se usan para recomprar NX036</li>
                  <li>• Buyback wallet visible públicamente</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
