import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const phases = [
  {
    quarter: 'Q4 2026',
    period: 'Oct – Dic 2026',
    title: 'Fundación y Preparación',
    icon: '🔧',
    status: 'active',
    items: [
      'Desarrollo y auditoría de contratos inteligentes',
      'Lanzamiento del sitio web oficial',
      'Apertura de canales de comunidad (Telegram, X)',
      'Campañas de marketing y awareness',
    ],
  },
  {
    quarter: 'Q1 2027',
    period: 'Ene – Mar 2027',
    title: 'Lanzamiento del Token',
    icon: '🚀',
    status: 'upcoming',
    items: [
      'Deploy en BNB Chain (mainnet)',
      'Creación de liquidez en PancakeSwap',
      'Distribución inicial de allocations',
      'Activación del pool de staking (90 días)',
      'Inicio de distribución diaria de airdrops',
      'Listado en CoinGecko y CoinMarketCap',
    ],
  },
  {
    quarter: 'Q2 2027',
    period: 'Abr – Jun 2027',
    title: 'E-Commerce MVP',
    icon: '🛒',
    status: 'upcoming',
    items: [
      'Lanzamiento de plataforma e-commerce (MVP)',
      'Sistema de niveles de fidelidad (5 tiers)',
      'Integración de quema automática por compras',
      'Puntos de lealtad canjeables',
      'Onboarding de primeros merchants',
    ],
  },
  {
    quarter: 'Q3 2027',
    period: 'Jul – Sep 2027',
    title: 'Escalamiento',
    icon: '📱',
    status: 'upcoming',
    items: [
      'Expansión de catálogo y merchants',
      'App móvil para e-commerce NX036',
      'Programa de referidos',
      'Integración con pasarelas de pago fiat',
    ],
  },
  {
    quarter: 'Q4 2027',
    period: 'Oct – Dic 2027',
    title: 'Ecosistema Avanzado',
    icon: '🏛️',
    status: 'upcoming',
    items: [
      'Gobernanza DAO (propuestas y votaciones)',
      'Programa de recompra (buyback) post burn-cap',
      'Dashboard de transparencia on-chain',
      'Partnerships con marcas internacionales',
    ],
  },
  {
    quarter: 'Q1 2028',
    period: 'Ene – Mar 2028',
    title: 'Expansión CEX',
    icon: '🌐',
    status: 'upcoming',
    items: [
      'Listado en exchanges centralizados (CEX)',
      'Bridge a otras blockchains',
      'Programa de embajadores NX036',
      'Presencia en eventos y conferencias crypto',
      'Reportes trimestrales de quema y buyback',
    ],
  },
  {
    quarter: 'Q2 2028',
    period: 'Abr – Jun 2028',
    title: 'Consolidación',
    icon: '💎',
    status: 'upcoming',
    items: [
      'NX036 Marketplace V2 con funciones avanzadas',
      'Sistema de gobernanza mejorado',
      'Expansión internacional de e-commerce',
      'Preview del primer tramo de vesting (Año 3)',
      'Publicación de la hoja de ruta 2028–2030',
    ],
  },
]

export default function Roadmap() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -30])

  return (
    <section id="roadmap" className="py-28 bg-base-200 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ y: headerY }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center text-xs font-semibold text-primary bg-primary/5 border border-primary/15 rounded-full px-3 py-1 uppercase tracking-[0.15em] mb-4">
            Hoja de Ruta
          </span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Roadmap</span> del proyecto
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Plan de ejecución desde el lanzamiento hasta la consolidación del ecosistema.
            Cada fase tiene hitos concretos y verificables.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-base-300" />

          {phases.map(({ quarter, period, title, icon, status, items }, i) => {
            const isLeft = i % 2 === 0
            const isActive = status === 'active'

            return (
              <motion.div
                key={quarter}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex items-start mb-12 md:mb-16 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node on the line */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 shadow-sm ${
                      isActive
                        ? 'bg-gradient-to-br from-primary to-secondary border-primary text-white'
                        : 'bg-base-100 border-base-300'
                    }`}
                  >
                    {icon}
                  </div>
                </div>

                {/* Card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-56px)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}>
                  <div
                    className={`p-6 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-base-100 border-primary/30 shadow-md'
                        : 'bg-base-100 border-base-300 shadow-sm'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-t-2xl" />
                    )}

                    {/* Quarter badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'bg-base-200 text-base-content/70'
                        }`}
                      >
                        {quarter} {isActive && '• Activa'}
                      </span>
                      <span className="text-[0.6rem] text-base-content/70">{period}</span>
                    </div>

                    <h3 className="text-base font-bold mb-3">{title}</h3>

                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-base-content/70 flex items-start gap-2 leading-relaxed"
                        >
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                              isActive ? 'bg-accent' : 'bg-base-300'
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
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-4 max-w-2xl mx-auto bg-base-100 border border-base-300 rounded-2xl p-6 text-center shadow-sm"
        >
          <div className="text-2xl mb-3">🗓️</div>
          <h4 className="text-sm font-bold mb-2">Actualización continua</h4>
          <p className="text-xs text-base-content/70 leading-relaxed">
            Este roadmap se actualiza trimestralmente según el progreso real del proyecto.
            Todos los hitos completados serán verificables on-chain o mediante anuncios públicos.
            Transparencia total — sin promesas vacías.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
