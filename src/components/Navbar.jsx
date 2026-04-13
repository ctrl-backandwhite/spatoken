import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 })

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { key: 'burn', href: '#burn' },
    { key: 'dex', href: '#dex' },
    { key: 'ecommerce', href: '#ecommerce' },
    { key: 'staking', href: '#staking' },
    { key: 'vesting', href: '#vesting' },
    { key: 'roadmap', href: '#roadmap' },
  ]

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? 'py-3 bg-base-100/95 backdrop-blur-xl shadow-sm border-b border-base-300'
          : 'py-5'
        }`}
    >
      <div className="navbar max-w-7xl mx-auto px-8">
        <div className="navbar-start">
          <a href="#hero" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white text-xs font-bold">NX</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-base-content">NX036</span>
          </a>
        </div>

        <div className="navbar-center hidden md:flex gap-1">
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-sm text-base-content/70 hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/10 transition-all"
            >
              {t(`navbar.${key}`)}
            </a>
          ))}
        </div>

        <div className="navbar-end gap-2">
          <LanguageSwitcher />
          <a
            href="#cta"
            className="btn btn-primary btn-sm text-sm font-semibold rounded-lg"
          >
            {t('navbar.buyToken')}
          </a>
        </div>
      </div>
    </nav>
  )
}
