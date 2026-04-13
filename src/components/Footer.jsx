export default function Footer() {
  return (
    <div className="bg-neutral text-neutral-content">
      <footer className="footer sm:footer-horizontal max-w-7xl mx-auto px-8 py-16">
        {/* Brand */}
        <aside>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white text-xs font-bold">NX</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-neutral-content">NX036</span>
          </div>
          <p className="text-sm text-neutral-content/50 leading-relaxed max-w-xs">
            Ecosistema deflacionario en BNB Chain con e-commerce integrado y transparencia total on-chain.
          </p>
        </aside>

        {/* Ecosystem */}
        <nav>
          <h6 className="footer-title">Ecosistema</h6>
          {['Token NX036', 'E-Commerce', 'Staking Airdrop', 'Vesting'].map((item) => (
            <a key={item} href="#" className="link link-hover">{item}</a>
          ))}
        </nav>

        {/* Resources */}
        <nav>
          <h6 className="footer-title">Recursos</h6>
          {['Whitepaper', 'Documentación', 'Auditoría', 'GitHub'].map((item) => (
            <a key={item} href="#" className="link link-hover">{item}</a>
          ))}
        </nav>

        {/* Community */}
        <nav>
          <h6 className="footer-title">Comunidad</h6>
          {[
            { label: 'BscScan', href: '#' },
            { label: 'PancakeSwap', href: '#' },
            { label: 'Telegram', href: '#' },
            { label: 'Twitter / X', href: '#' },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="link link-hover">{label}</a>
          ))}
        </nav>
      </footer>

      {/* Bottom bar */}
      <footer className="footer sm:footer-horizontal max-w-7xl mx-auto px-8 py-6 border-t border-neutral-content/10">
        <aside>
          <p className="text-xs text-neutral-content/40">© 2026 NX036. Todos los derechos reservados.</p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="flex gap-6">
            {['Términos', 'Privacidad', 'Cookies'].map((item) => (
              <a key={item} href="#" className="link link-hover text-xs text-neutral-content/40">{item}</a>
            ))}
          </div>
        </nav>
      </footer>
    </div>
  )
}
