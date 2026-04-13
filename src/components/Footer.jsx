export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white text-xs font-bold">NX</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-neutral-content">NX036</span>
            </div>
            <p className="text-sm text-neutral-content/50 leading-relaxed">
              Ecosistema deflacionario en BNB Chain con e-commerce integrado y transparencia total on-chain.
            </p>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-content/40 mb-4">Ecosistema</h4>
            <div className="space-y-3">
              {['Token NX036', 'E-Commerce', 'Staking Airdrop', 'Vesting'].map((item) => (
                <a key={item} href="#" className="block text-sm text-neutral-content/60 hover:text-neutral-content transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-content/40 mb-4">Recursos</h4>
            <div className="space-y-3">
              {['Whitepaper', 'Documentación', 'Auditoría', 'GitHub'].map((item) => (
                <a key={item} href="#" className="block text-sm text-neutral-content/60 hover:text-neutral-content transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-content/40 mb-4">Comunidad</h4>
            <div className="space-y-3">
              {[
                { label: 'BscScan', href: '#' },
                { label: 'PancakeSwap', href: '#' },
                { label: 'Telegram', href: '#' },
                { label: 'Twitter / X', href: '#' },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="block text-sm text-neutral-content/60 hover:text-neutral-content transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-neutral-content/10 flex justify-between items-center flex-wrap gap-4">
          <div className="text-xs text-neutral-content/40">
            © 2026 NX036. Todos los derechos reservados.
          </div>
          <div className="flex gap-6">
            {['Términos', 'Privacidad', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-xs text-neutral-content/40 hover:text-neutral-content/70 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
