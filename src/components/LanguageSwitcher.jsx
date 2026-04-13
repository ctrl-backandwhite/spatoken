import { useTranslation } from 'react-i18next'

const LANGS = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'pt-BR', label: 'BR', flag: '🇧🇷' },
    { code: 'pt-PT', label: 'PT', flag: '🇵🇹' },
]

export default function LanguageSwitcher() {
    const { i18n } = useTranslation()
    const current = LANGS.find((l) => l.code === i18n.language) || LANGS[0]

    const handleChange = (code) => {
        i18n.changeLanguage(code)
        document.documentElement.lang = code
        localStorage.setItem('nx036-lang', code)
    }

    return (
        <div className="dropdown dropdown-end">
            <button
                tabIndex={0}
                className="btn btn-ghost btn-sm gap-1.5 text-base-content/70 hover:text-primary"
                aria-label="Change language"
            >
                <span>{current.flag}</span>
                <span className="text-xs font-semibold">{current.label}</span>
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-100 border border-base-300 rounded-xl shadow-lg w-32 mt-1 z-[100]">
                {LANGS.map(({ code, label, flag }) => (
                    <li key={code}>
                        <button
                            onClick={() => handleChange(code)}
                            className={`flex items-center gap-2 text-sm ${i18n.language === code ? 'text-primary font-bold' : 'text-base-content'}`}
                        >
                            <span>{flag}</span>
                            <span>{label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
