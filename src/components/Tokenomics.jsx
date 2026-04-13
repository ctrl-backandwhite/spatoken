const allocations = [
  { category: 'Reserve / Listings', pct: 25, color: '#fcd34d' },
  { category: 'DAO Treasury', pct: 20, color: '#93c5fd' },
  { category: 'Liquidity', pct: 20, color: '#fdba74' },
  { category: 'Community', pct: 15, color: '#a5b4fc' },
  { category: 'Equipo', pct: 9, color: '#fca5a5' },
  { category: 'Ecosystem', pct: 6, color: '#99f6e4' },
  { category: 'Staking Airdrop', pct: 5, color: '#c4b5fd' },
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
  return (
    <section id="tokenomics" className="bg-base-200 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="fade-in text-4xl mb-3 text-center">
          <span className="gradient-text">Tokenomics</span>
        </h2>
        <p className="fade-in text-center text-base-content/70 max-w-xl mx-auto mb-12">
          Supply fijo de 1,000,000,000,000 NX036 — sin mint adicional. Distribución diseñada para sostener el ecosistema a largo plazo.
        </p>

        <div className="grid grid-cols-2 gap-12 items-start">
          {/* Distribution chart */}
          <div>
            <h3 className="fade-in text-base mb-5 text-base-content/70">Distribución del Supply</h3>
            {allocations.map((a, i) => (
              <Bar key={a.category} {...a} />
            ))}
          </div>

          {/* Key mechanics */}
          <div>
            <h3 className="fade-in text-base mb-5 text-base-content/70">Mecánicas Clave</h3>
            <div className="flex flex-col gap-4">
              {[
                { title: 'Quema Deflacionaria', desc: 'Cada transferencia quema un 1% (configurable hasta 10%). Tope global: 50% del supply.', icon: '🔥' },
                { title: 'Comisiones DEX', desc: 'Compra: 2.5% desarrollo + 1% promoción + 1% quema. Venta: 2.5% desarrollo + 1% quema. Fijas e inmutables.', icon: '💱' },
                { title: 'Recompra Post-Burn', desc: 'Al alcanzar el tope de quema, los fondos de comisiones se destinan a recompra de NX036.', icon: '🔄' },
                { title: 'Equipo Bloqueado 3-5 años', desc: '9% del supply liberado en 3 tramos: 3% al año 3, 3% al año 4, 3% al año 5.', icon: '🔒' },
              ].map(({ title, desc, icon }) => (
                <div key={title} className="card fade-in border border-base-300 bg-base-200">
                  <div className="card-body p-5">
                    <div className="text-xl">{icon}</div>
                    <h4 className="card-title text-[0.95rem]">{title}</h4>
                    <p className="text-sm text-base-content/70 leading-relaxed">{desc}</p>
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
