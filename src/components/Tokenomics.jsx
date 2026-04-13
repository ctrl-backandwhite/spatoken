import { useTranslation } from 'react-i18next'

const allocationData = [
  { key: 'reserve', category: 'Reserve / Listings', pct: 25, color: '#fcd34d' },
  { key: 'dao', category: 'DAO Treasury', pct: 20, color: '#93c5fd' },
  { key: 'liquidity', category: 'Liquidity', pct: 20, color: '#fdba74' },
  { key: 'community', category: 'Community', pct: 15, color: '#a5b4fc' },
  { key: 'team', category: null, pct: 9, color: '#fca5a5' },
  { key: 'ecosystem', category: 'Ecosystem', pct: 6, color: '#99f6e4' },
  { key: 'staking', category: 'Staking Airdrop', pct: 5, color: '#c4b5fd' },
]

const mechanicsData = [
  { key: 'burn', icon: '🔥' },
  { key: 'dex', icon: '💱' },
  { key: 'buyback', icon: '🔄' },
  { key: 'teamLocked', icon: '🔒' },
]

function Bar({ category, pct, color }) {
  return (
    <div className="fade-in flex items-center gap-4 mb-3.5">
      <span className="w-36 text-sm text-base-content/70 shrink-0">{category}</span>
      <div className="flex-1 h-7 bg-base-300 rounded-md overflow-hidden relative">
        <div className="h-full rounded-md transition-[width] duration-[1.2s] ease-out" style={{ width: `${pct}%`, background: color }} />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold font-mono">{pct}%</span>
      </div>
    </div>
  )
}

export default function Tokenomics() {
  const { t } = useTranslation()
  return (
    <section id="tokenomics" className="bg-base-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="fade-in text-4xl mb-3 text-center">
          <span className="gradient-text">{t('tokenomics.heading')}</span>
        </h2>
        <p className="fade-in text-center text-base-content/70 max-w-xl mx-auto mb-12">
          {t('tokenomics.description')}
        </p>

        <div className="grid grid-cols-2 gap-12 items-start">
          {/* Distribution chart */}
          <div>
            <h3 className="fade-in text-base mb-5 text-base-content/70">{t('tokenomics.distributionTitle')}</h3>
            {allocationData.map((a) => (
              <Bar key={a.key} category={a.category ?? t('tokenomics.allocations.team')} pct={a.pct} color={a.color} />
            ))}
          </div>

          {/* Key mechanics */}
          <div>
            <h3 className="fade-in text-base mb-5 text-base-content/70">{t('tokenomics.mechanicsTitle')}</h3>
            <div className="flex flex-col gap-4">
              {mechanicsData.map(({ key, icon }) => (
                <div key={key} className="card fade-in border border-base-300 bg-base-200">
                  <div className="card-body p-5">
                    <div className="text-xl">{icon}</div>
                    <h4 className="card-title text-[0.95rem]">{t(`tokenomics.mechanics.${key}.title`)}</h4>
                    <p className="text-sm text-base-content/70 leading-relaxed">{t(`tokenomics.mechanics.${key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
