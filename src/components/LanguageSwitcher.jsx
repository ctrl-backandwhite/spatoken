import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faChevronDown } from '@fortawesome/free-solid-svg-icons'

const LANGS = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt-BR', label: 'Português BR' },
    { code: 'pt-PT', label: 'Português PT' },
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
                className="btn btn-ghost btn-sm gap-2 text-base-content hover:text-primary px-3"
                aria-label="Change language"
            >
                <FontAwesomeIcon icon={faGlobe} className="text-primary/70" />
                <span className="text-xs font-semibold tracking-wider uppercase">{current.code.slice(0, 2)}</span>
                <FontAwesomeIcon icon={faChevronDown} className="text-[10px] opacity-60" />
            </button>
            <ul tabIndex={0} className="dropdown-content bg-base-100 border border-base-300 rounded-xl shadow-lg w-48 mt-2 z-[100] p-1">
                {LANGS.map(({ code, label }) => (
                    <li key={code}>
                        <button
                            onClick={() => handleChange(code)}
                            className={`w-full flex items-center gap-3 text-sm px-3 py-2.5 rounded-lg transition-colors text-left ${i18n.language === code ? 'text-primary font-semibold bg-primary/10' : 'text-base-content hover:bg-base-200'}`}
                        >
                            <span className="text-[10px] font-mono font-bold text-primary/60 w-6 uppercase shrink-0">{code.slice(0, 2)}</span>
                            <span>{label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
