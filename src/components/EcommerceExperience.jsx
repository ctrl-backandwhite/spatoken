import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import CountUp from 'react-countup'

const tiers = [
  { name: 'Basic', multiplier: 1, color: '#8888a0', emoji: '🥉' },
  { name: 'Silver', multiplier: 2, color: '#c0c0c0', emoji: '🥈' },
  { name: 'Gold', multiplier: 3, color: '#ffd700', emoji: '🥇' },
  { name: 'Platinum', multiplier: 4, color: '#e5e4e2', emoji: '💎' },
  { name: 'Diamond', multiplier: 5, color: '#b9f2ff', emoji: '👑' },
]

const products = [
  { name: 'Auriculares Bluetooth', price: 3500, img: '🎧' },
  { name: 'Smartwatch Fitness', price: 8900, img: '⌚' },
  { name: 'Teclado Mecánico', price: 12500, img: '⌨️' },
  { name: 'Monitor 27" 4K', price: 45000, img: '🖥️' },
]

export default function EcommerceExperience() {
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
    <section className="py-28 bg-base-200 relative overflow-hidden">
      {/* Parallax decorative orb */}
      <motion.div
        style={{ y: decorY }}
        className="absolute -right-16 top-20 w-72 h-72 rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, oklch(0.52 0.12 175 / 0.025), transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ y: headerY }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center text-xs font-semibold text-primary bg-primary/5 border border-primary/15 rounded-full px-3 py-1 uppercase tracking-[0.15em] mb-4">Capítulo 4</span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Compra en <span className="gradient-text">NX036 E-Commerce</span>
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Nuestra plataforma de e-commerce integra el token directamente. Cada compra que realizas
            <strong className="text-rose-300"> quema tokens del pool inmediatamente</strong>. El cliente recibe{' '}
            <strong className="text-accent">puntos de lealtad</strong> canjeables.
            Cuanto más alto sea su nivel, más tokens se quemarán (Esto es un ejemplo para que se entienda).
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Tier selector */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-base-content/70 mb-4">Tu Nivel</h3>
            <div className="space-y-2">
              {tiers.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => {
                    setSelectedTier(i)
                    setPurchased(false)
                  }}
                  className={`btn btn-block justify-between text-sm ${
                    selectedTier === i
                      ? 'btn-primary btn-outline'
                      : 'btn-ghost'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{t.emoji}</span>
                    <span className="font-bold">{t.name}</span>
                  </span>
                  <span className="font-mono text-xs" style={{ color: t.color }}>
                    {t.multiplier}x
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4 p-3 bg-base-200 rounded-xl text-center">
              <div className="text-xs text-base-content/70 mb-1">Tokens por $1</div>
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
              🛒 Tienda NX036
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {products.map((p) => (
                <motion.button
                  key={p.name}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleBuy(p)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    cart?.name === p.name
                      ? 'border-primary bg-primary/5'
                      : 'border-base-300 bg-base-200 hover:border-base-content/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{p.img}</div>
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
                Comprar {cart.name}
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
              📊 Resultado
            </h3>

            <AnimatePresence mode="wait">
              {!cart ? (
                <motion.div key="empty" className="flex items-center justify-center h-64 text-base-content/70 text-sm text-center">
                  <p>Selecciona un producto para ver qué pasa con los tokens</p>
                </motion.div>
              ) : !purchased ? (
                <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="text-center p-4 bg-base-200 rounded-xl">
                    <div className="text-4xl mb-2">{cart.img}</div>
                    <div className="font-bold">{cart.name}</div>
                    <div className="text-lg font-mono text-primary">${(cart.price / 100).toFixed(2)}</div>
                  </div>
                  <div className="text-center p-4 bg-base-200 rounded-xl">
                    <div className="text-xs text-base-content/70 mb-1">Se quemarán</div>
                    <div className="text-2xl font-bold font-mono text-error">
                      {tokensBurned.toLocaleString()} NX036
                    </div>
                    <div className="text-xs text-base-content/70 mt-1">
                      {tier.emoji} Nivel {tier.name} ({tier.multiplier}x)
                    </div>
                  </div>
                  <div className="text-xs text-base-content/70 text-center">
                    Haz click en "Comprar" para ver la animación
                  </div>
                </motion.div>
              ) : (
                <motion.div key={simKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {/* Animated steps */}
                  {[
                    { label: 'Compra registrada', icon: '✅', delay: 0 },
                    { label: `${tokensBurned.toLocaleString()} tokens quemados del pool`, icon: '🔥', delay: 0.3 },
                    { label: 'Supply total reducido', icon: '📉', delay: 0.6 },
                    { label: `${loyaltyPoints.toLocaleString()} puntos de lealtad acreditados`, icon: '⭐', delay: 0.9 },
                  ].map(({ label, icon, delay }) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay }}
                      className="flex items-center gap-3 p-3 bg-base-200 rounded-xl text-sm"
                    >
                      <span className="text-lg">{icon}</span>
                      <span>{label}</span>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className="p-4 bg-success/10 border border-success/30 rounded-xl text-center"
                  >
                    <div className="text-xs text-success mb-1">Tus puntos de lealtad</div>
                    <div className="text-3xl font-bold font-mono text-success">
                      <CountUp end={loyaltyPoints} duration={2} separator="," key={simKey + 'lp'} />
                    </div>
                    <div className="text-xs text-base-content/70 mt-1">
                      Canjeables según la política de la plataforma
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
          <h4 className="text-sm font-bold mb-3">¿Cómo funciona exactamente?</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-base-content/70">
            <div className="flex gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>Compraran un producto en la tienda NX036 con su método de pago habitual.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>El backend registra tu compra en el contrato inteligente con el monto en USD.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>El contrato calcula tus tokens según tu nivel y los quema inmediatamente del pool.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold">4.</span>
              <span>Recibes puntos de lealtad equivalentes. El supply total de NX036 se redujo.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

