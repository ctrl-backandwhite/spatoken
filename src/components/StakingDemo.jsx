import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import CountUp from 'react-countup'

export default function StakingDemo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -30])
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const [stakeAmount, setStakeAmount] = useState(10000)
  const [totalPool, setTotalPool] = useState(5000000)
  const [simulating, setSimulating] = useState(false)
  const [day, setDay] = useState(0)
  const [accumulated, setAccumulated] = useState(0)
  const [simKey, setSimKey] = useState(0)

  const dailyPool = 50_000_000_000 / 90 // ~555,555,555 tokens per day
  const myShare = stakeAmount / (totalPool + stakeAmount)
  const dailyReward = dailyPool * myShare
  const totalReward90 = dailyReward * 90

  useEffect(() => {
    if (!simulating) return
    if (day >= 90) {
      setSimulating(false)
      return
    }
    const timer = setTimeout(() => {
      setDay((d) => d + 1)
      setAccumulated((a) => a + dailyReward)
    }, 50)
    return () => clearTimeout(timer)
  }, [simulating, day, dailyReward])

  const handleStartSim = () => {
    setDay(0)
    setAccumulated(0)
    setSimulating(true)
    setSimKey((k) => k + 1)
  }

  return (
    <section className="py-28 bg-base-200 relative overflow-hidden">
      {/* Parallax decorative orb */}
      <motion.div
        style={{ y: decorY }}
        className="absolute -left-20 bottom-1/3 w-80 h-80 rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, oklch(0.72 0.10 290 / 0.03), transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ y: headerY }}
          className="text-center mb-12"
        >
          <span className="badge badge-primary badge-outline badge-sm uppercase tracking-[0.15em] mb-4">Capítulo 5</span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Gana mientras <span className="gradient-text">holdeas</span>
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Stakea tus NX036 y recibe recompensas diarias durante <strong className="text-base-content">90 días</strong>.
            50 mil millones de tokens se reparten proporcionalmente entre todos los stakers.
            Necesitas mantener tu stake <strong className="text-primary">24 horas</strong> como mínimo para empezar a ganar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="card bg-base-100 shadow-sm border border-base-300 p-8 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Inputs */}
            <div>
              <div className="mb-6">
                <label className="text-xs text-base-content/70 uppercase tracking-wider block mb-2">
                  Tu Stake
                </label>
                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="range range-primary range-sm w-full"
                />
                <div className="text-center text-lg font-bold font-mono gradient-text mt-2">
                  {stakeAmount.toLocaleString()} NX036
                </div>
              </div>

              <div className="mb-6">
                <label className="text-xs text-base-content/70 uppercase tracking-wider block mb-2">
                  Pool total stakeado (otros usuarios)
                </label>
                <input
                  type="range"
                  min={100000}
                  max={50000000}
                  step={100000}
                  value={totalPool}
                  onChange={(e) => setTotalPool(Number(e.target.value))}
                  className="range range-secondary range-sm w-full"
                />
                <div className="text-center text-sm font-mono text-base-content/70 mt-2">
                  {totalPool.toLocaleString()} NX036
                </div>
              </div>

              {/* Your share */}
              <div className="bg-base-200 border border-base-300 rounded-xl p-4 mb-4">
                <div className="text-xs text-base-content/70 mb-1">Tu participación del pool</div>
                <div className="text-2xl font-bold font-mono gradient-text">
                  {(myShare * 100).toFixed(4)}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-base-200 border border-base-300 rounded-xl p-3 text-center">
                  <div className="text-xs text-base-content/70 mb-1">Diario</div>
                  <div className="text-sm font-bold font-mono text-success">
                    {dailyReward.toFixed(2)}
                  </div>
                </div>
                <div className="bg-base-200 border border-base-300 rounded-xl p-3 text-center">
                  <div className="text-xs text-base-content/70 mb-1">Total 90 días</div>
                  <div className="text-sm font-bold font-mono text-success">
                    {totalReward90.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Simulation */}
            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartSim}
                disabled={simulating}
                className="btn btn-primary w-full mb-6"
              >
                ⚡ {simulating ? 'Simulando...' : 'Simular 90 días'}
              </motion.button>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-base-content/70 mb-1">
                  <span>Día {day}/90</span>
                  <span>{((day / 90) * 100).toFixed(0)}%</span>
                </div>
                <div className="h-3 bg-base-300 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    animate={{ width: `${(day / 90) * 100}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Accumulated */}
              <div className="bg-base-200 border border-success/30 rounded-xl p-5 text-center mb-4">
                <div className="text-xs text-base-content/70 mb-2">Tokens acumulados</div>
                <div className="text-3xl font-bold font-mono text-success">
                  {day > 0 ? (
                    <CountUp end={accumulated} duration={0.3} separator="," decimals={0} key={simKey + '-' + day} preserveValue />
                  ) : (
                    '0'
                  )}
                </div>
                <div className="text-xs text-base-content/70 mt-1">NX036</div>
              </div>

              {/* Timeline markers */}
              <div className="flex justify-between text-[0.6rem] text-base-content/70">
                {[0, 1, 24, 30, 60, 90].map((d) => (
                  <span key={d} className={day >= d ? 'text-primary font-bold' : ''}>
                    {d === 0 ? 'Stake' : d === 1 ? '24h' : `D${d}`}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="mt-8 p-4 bg-base-200 border border-base-300 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-base-content/70">
              <div className="flex gap-2">
                <span className="text-primary font-bold shrink-0">Hora 0:</span>
                <span>Depositas tus tokens. Entran como "pendientes" — aún no ganas recompensas.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary font-bold shrink-0">Hora 24:</span>
                <span>Tu stake se activa. Empiezas a recibir tu parte proporcional en cada distribución.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary font-bold shrink-0">Día 90:</span>
                <span>El programa de staking termina. Puedes retirar tus tokens + todas las recompensas.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
