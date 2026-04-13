import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faCartShopping, faLock, faShieldHalved, faChartBar, faLink } from '@fortawesome/free-solid-svg-icons'

export default function Features() {
  const { t } = useTranslation()

  const features = [
    { key: 'staking', icon: faBolt, gradient: 'from-primary/15 to-secondary/15' },
    { key: 'ecommerce', icon: faCartShopping, gradient: 'from-accent/15 to-primary/15' },
    { key: 'vesting', icon: faLock, gradient: 'from-secondary/15 to-rose-300/15' },
    { key: 'burnCap', icon: faShieldHalved, gradient: 'from-amber-200/20 to-orange-200/20' },
    { key: 'buyback', icon: faChartBar, gradient: 'from-violet-300/15 to-pink-200/15' },
    { key: 'bnbChain', icon: faLink, gradient: 'from-amber-200/20 to-accent/15' },
  ]

  return (
    <section id="features" className="py-14 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="fade-in text-4xl mb-3 text-center">
          <span className="gradient-text">{t('features.heading')}</span>
        </h2>
        <p className="fade-in text-center text-base-content/70 max-w-lg mx-auto mb-14">
          {t('features.subheading')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map(({ key, icon, gradient }) => (
            <div key={key}
              className={`card fade-in bg-gradient-to-br ${gradient} border border-base-300 hover:-translate-y-1 hover:border-primary transition-all cursor-default`}>
              <div className="card-body p-8">
                <div className="text-2xl text-primary/70"><FontAwesomeIcon icon={icon} /></div>
                <h3 className="card-title text-lg">{t(`features.${key}.title`)}</h3>
                <p className="text-sm text-base-content/70 leading-relaxed">{t(`features.${key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
