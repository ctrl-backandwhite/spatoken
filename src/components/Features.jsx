const features = [
  {
    title: 'Staking + Airdrop',
    desc: '5% del supply se distribuye diariamente entre stakers elegibles durante 90 días. Requiere 24h mínimas para calificar.',
    icon: '⚡',
    gradient: 'from-primary/15 to-secondary/15',
  },
  {
    title: 'E-Commerce Rewards',
    desc: '5 niveles de fidelidad (Basic a Diamond). Cada compra quema tokens del pool inmediatamente, reflejados como puntos de lealtad.',
    icon: '🛒',
    gradient: 'from-accent/15 to-primary/15',
  },
  {
    title: 'Vesting Escalonado',
    desc: 'Tokens del equipo bloqueados 3-5 años. Verificable on-chain. Los holders pueden auditar los grants del contrato.',
    icon: '🔐',
    gradient: 'from-secondary/15 to-rose-300/15',
  },
  {
    title: 'Burn Cap Inteligente',
    desc: 'El 50% del supply es el máximo de quema. Aplica a todas las fuentes: transferencias, burns directos y e-commerce.',
    icon: '🛡️',
    gradient: 'from-amber-200/20 to-orange-200/20',
  },
  {
    title: 'Buyback Transparente',
    desc: 'Post burn-cap, las comisiones se usan para recomprar NX036. Wallet pública con saldo visible en tiempo real.',
    icon: '📊',
    gradient: 'from-violet-300/15 to-pink-200/15',
  },
  {
    title: 'BNB Chain',
    desc: 'Desplegado en BSC para transacciones rápidas y baratas. Compatible con PancakeSwap y todo el ecosistema BNB.',
    icon: '⛓️',
    gradient: 'from-amber-200/20 to-accent/15',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="fade-in text-4xl mb-3 text-center">
          <span className="gradient-text">Ecosistema</span>
        </h2>
        <p className="fade-in text-center text-base-content/70 max-w-lg mx-auto mb-14">
          Un ecosistema completo diseñado para alinear incentivos entre holders, equipo y plataforma.
        </p>

        <div className="grid grid-cols-3 gap-6">
          {features.map(({ title, desc, icon, gradient }) => (
            <div key={title}
              className={`fade-in p-8 rounded-2xl bg-gradient-to-br ${gradient} border border-base-300 hover:-translate-y-1 hover:border-primary transition-all cursor-default`}>
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="text-lg mb-2.5">{title}</h3>
              <p className="text-sm text-base-content/70 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
