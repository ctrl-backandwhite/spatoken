import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(titleRef.current, { opacity: 0, y: 80, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.2 })
      .fromTo(subtitleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(statsRef.current.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, '-=0.3')
  }, [])

  const stats = [
    { value: '1T', label: 'Total Supply' },
    { value: '50%', label: 'Max Burn' },
    { value: '90', label: 'Staking Days' },
    { value: '5', label: 'Reward Tiers' },
  ]

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden text-center">
      {/* Background glow */}
      <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, oklch(0.76 0.10 240 / 0.10) 0%, oklch(0.72 0.10 290 / 0.06) 50%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h1 ref={titleRef} className="text-[clamp(3rem,8vw,6rem)] font-black tracking-tighter mb-6">
          <span className="gradient-text glow">NX036</span>
          <br />
          <span className="text-[0.4em] text-base-content/70 font-medium">
            Ecosistema Deflacionario en BNB Chain
          </span>
        </h1>

        <p ref={subtitleRef} className="text-lg text-base-content/70 max-w-xl mx-auto mb-10">
          Token con quema automática, comisiones DEX, staking con airdrop diario,
          recompensas e-commerce y vesting escalonado para el equipo.
        </p>

        <div ref={ctaRef} className="flex gap-4 justify-center flex-wrap">
          <a href="#tokenomics"
            className="px-9 py-3.5 rounded-xl font-bold bg-gradient-to-br from-primary to-secondary text-white hover:-translate-y-0.5 hover:shadow-[0_8px_30px_oklch(0.68_0.12_265/0.25)] transition-all">
            Explorar Tokenomics
          </a>
          <a href="#"
            className="px-9 py-3.5 rounded-xl font-bold border border-base-300 text-base-content bg-transparent hover:border-primary transition-colors">
            Whitepaper
          </a>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-14 sm:mt-20 max-w-[700px] mx-auto">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-extrabold font-mono">
                <span className="gradient-text">{value}</span>
              </div>
              <div className="text-xs text-base-content/70 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
