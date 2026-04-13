import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { useTranslation } from 'react-i18next'

export default function HeroStory() {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const scrollRef = useRef(null)
  const sectionRef = useRef(null)
  const { t } = useTranslation()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const subtitleY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(titleRef.current, { opacity: 0, y: 80, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.2 })
      .fromTo(subtitleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2')

    gsap.to(scrollRef.current, { y: 10, repeat: -1, yoyo: true, duration: 1.2, ease: 'sine.inOut' })
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden text-center">
      {/* Animated NX036 watermark */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <motion.span
          className="text-[clamp(14rem,28vw,22rem)] font-black tracking-tighter whitespace-nowrap"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1.5px oklch(0.68 0.12 265 / 0.08)',
            lineHeight: 1,
          }}
          animate={{ x: ['-3%', '3%', '-3%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        >
          NX036
        </motion.span>
      </motion.div>

      <motion.div
        style={{ y: bgY }}
        className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(0.68 0.12 265 / 0.06) 0%, oklch(0.72 0.10 290 / 0.03) 50%, transparent 70%)' }} />
      </motion.div>

      <motion.div style={{ y: textY, opacity, scale }} className="relative z-10 max-w-4xl mx-auto px-8">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/5 border border-primary/15 rounded-full px-4 py-1.5 uppercase tracking-widest">
            {t('hero.badge')}
          </span>
        </div>

        <h1 ref={titleRef} className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mb-6 leading-[1.15]">
          <span className="text-base-content">{t('hero.title1')}</span>
          <br />
          <span className="gradient-text">{t('hero.title2')}</span>
          <br />
          <span className="text-base-content/70 font-normal text-[0.5em] block mt-4">
            {t('hero.subtitle')}
          </span>
        </h1>

        <motion.p ref={subtitleRef} style={{ y: subtitleY }} className="text-lg text-base-content/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t('hero.description') }}
        />

        <div className="flex gap-4 justify-center flex-wrap mb-16">
          <a href="#burn" className="btn btn-primary btn-lg rounded-lg font-semibold">
            {t('hero.exploreCta')}
          </a>
          <a href="#cta" className="btn btn-outline btn-lg rounded-lg font-semibold">
            {t('hero.whitepaper')}
          </a>
        </div>

        <div ref={scrollRef} className="flex flex-col items-center gap-2 text-base-content/70">
          <span className="text-xs uppercase tracking-widest font-medium">{t('hero.scrollHint')}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
