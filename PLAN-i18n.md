# Plan de Internacionalización (i18n) — NX036 Website

## Objetivo

Traducir el sitio a **4 idiomas** manteniendo coherencia terminológica y corrección gramatical:

| Código | Idioma | Ejemplo |
|--------|--------|---------|
| `es` | Español (predeterminado) | "Un token que se quema" |
| `en` | Inglés | "A token that burns" |
| `pt-BR` | Portugués brasileño | "Um token que queima" |
| `pt-PT` | Portugués de Portugal | "Um token que é queimado" |

---

## Auditoría actual

- **~317 strings** distribuidas en **17 componentes + index.html**
- **Sin infraestructura i18n** (no hay librería, ni archivos de locale, ni contexto)
- Idioma actual: Español hardcodeado en JSX
- Algunos términos técnicos se mantienen en inglés: *Staking, DEX, Whitepaper, Roadmap, Supply, Airdrop, Buyback*

### Strings por componente

| Componente | Strings | Complejidad |
|---|---:|---|
| `Roadmap.jsx` | 42 | Alta — muchos bullets + fases |
| `EcommerceExperience.jsx` | 33 | Alta — productos, flujos, pasos |
| `BurnCapJourney.jsx` | 25 | Media — fases, estados |
| `DexDemo.jsx` | 24 | Media — tabs, pasos, cálculos |
| `StakingDemo.jsx` | 20 | Media — labels, timeline |
| `BurnSimulator.jsx` | 18 | Media — form, resultados |
| `Footer.jsx` | 18 | Baja — links, legal |
| `Tokenomics.jsx` | 17 | Baja — categorías, mecánicas |
| `TokenDistribution.jsx` | 17 | Baja — categorías, resumen |
| `VestingTimeline.jsx` | 16 | Media — timeline, años |
| `EcommerceBurnScale.jsx` | 16 | Baja — plataformas, stats |
| `TokenIntro.jsx` | 16 | Baja — stats, pasos |
| `Features.jsx` | 15 | Baja — feature cards |
| `Hero.jsx` | 10 | Baja — (componente no usado) |
| `Navbar.jsx` | 9 | Baja — links, botón |
| `CallToAction.jsx` | 9 | Baja — CTA, badges |
| `HeroStory.jsx` | 8 | Baja — hero principal |
| `index.html` | 4 | Baja — meta, splash |

---

## Stack técnico elegido

### `react-i18next` + `i18next`

**Razones:**
- Estándar de facto en React para i18n
- Soporte nativo para interpolación (`{{count}} tokens quemados`)
- Soporte para JSX embebido con `<Trans>` (necesario en párrafos con `<strong>`, `<code>`)
- Detección automática de idioma del navegador
- Cambio de idioma sin recarga
- Archivos JSON planos por idioma (fácil mantener)
- ~12KB gzip — ligero

---

## Glosario de términos técnicos (NO se traducen)

Estos términos se mantienen idénticos en los 4 idiomas por coherencia con el ecosistema crypto:

| Término | Decisión |
|---------|----------|
| NX036 | Nombre propio — nunca se traduce |
| Supply | Se mantiene en inglés en todos los idiomas |
| Staking | Término estándar crypto |
| Airdrop | Término estándar crypto |
| DEX | Acrónimo universal |
| Whitepaper | Término estándar |
| Roadmap | Término estándar tech |
| PancakeSwap | Nombre propio |
| BNB Chain / BSC | Nombre propio |
| Buyback | Se mantiene en inglés |
| Pool | Se mantiene en inglés |
| Holders | Se mantiene en inglés |
| Vesting | Término estándar crypto |
| Wallet | Se mantiene en inglés |
| Token / Tokens | Se mantiene en inglés |
| Burn / Burn Cap | Se mantiene en inglés |
| BscScan | Nombre propio |
| Market Making | Se mantiene en inglés |

### Términos que SÍ se traducen según idioma

| Español | Inglés | pt-BR | pt-PT |
|---------|--------|-------|-------|
| Quema (acción) | Burn | Queima | Queima |
| Quemados | Burned | Queimados | Queimados |
| Tasa de quema | Burn rate | Taxa de queima | Taxa de queima |
| Comisiones | Fees | Taxas | Comissões |
| Compra | Buy | Compra | Compra |
| Venta | Sell | Venda | Venda |
| Puntos de lealtad | Loyalty points | Pontos de fidelidade | Pontos de fidelidade |
| Recompensas | Rewards | Recompensas | Recompensas |
| Equipo | Team | Equipe | Equipa |
| Hoja de Ruta | Roadmap | Roadmap | Roadmap |
| Bloqueado | Locked | Bloqueado | Bloqueado |
| Nivel | Tier / Level | Nível | Nível |
| Verificable on-chain | Verifiable on-chain | Verificável on-chain | Verificável on-chain |

---

## Estructura de archivos propuesta

```
src/
  i18n/
    index.js              ← Configuración i18next
    locales/
      es.json             ← Español (fuente de verdad)
      en.json             ← Inglés
      pt-BR.json          ← Portugués brasileño
      pt-PT.json          ← Portugués de Portugal
  components/
    LanguageSwitcher.jsx  ← Selector de idioma (navbar)
    ...
```

### Estructura de claves en JSON

Organización por namespace (componente):

```json
{
  "navbar": {
    "burn": "Quema",
    "dex": "DEX",
    "ecommerce": "E-Commerce",
    "staking": "Staking",
    "vesting": "Vesting",
    "roadmap": "Roadmap",
    "buyToken": "Comprar Token"
  },
  "hero": {
    "badge": "Ecosistema BNB Chain",
    "title1": "La plataforma comunitaria que",
    "title2": "puede cambiar tu futuro",
    "subtitle": "E-commerce integrado, staking y deflación verificable on-chain",
    "description": "NX036 es un token deflacionario con una plataforma de e-commerce integrada...",
    "exploreCta": "Explorar Ecosistema",
    "whitepaper": "Whitepaper",
    "scrollHint": "Scroll para descubrir"
  },
  "burnSimulator": { ... },
  "dex": { ... },
  "ecommerce": { ... },
  "staking": { ... },
  "vesting": { ... },
  "burnCap": { ... },
  "burnScale": { ... },
  "tokenDistribution": { ... },
  "tokenomics": { ... },
  "roadmap": { ... },
  "cta": { ... },
  "footer": { ... },
  "features": { ... },
  "tokenIntro": { ... },
  "common": {
    "nx036": "NX036",
    "tokens": "tokens",
    "loading": "Cargando NX036"
  }
}
```

---

## Plan de ejecución — 7 fases

### Fase 1: Infraestructura i18n
> **Archivos afectados:** `package.json`, `src/i18n/index.js`

1. Instalar dependencias: `react-i18next`, `i18next`, `i18next-browser-languagedetector`
2. Crear `src/i18n/index.js` con configuración:
   - Idioma por defecto: `es`
   - Fallback: `es`
   - Detección por navegador (localStorage > navigator.language)
   - Interpolación: `{{variable}}`
3. Importar `i18n` en `main.jsx`

---

### Fase 2: Archivo de traducciones base (Español)
> **Archivos afectados:** `src/i18n/locales/es.json`

1. Extraer TODAS las ~317 strings del código fuente
2. Organizarlas por namespace de componente
3. Usar claves descriptivas en inglés (ej: `burnSimulator.burnRateLabel`)
4. Mantener interpolaciones: `"burnedTokens": "{{count}} tokens quemados del pool"`
5. Para JSX con markup usar `<Trans>` keys donde aplique

---

### Fase 3: Traducciones EN, pt-BR, pt-PT
> **Archivos afectados:** `src/i18n/locales/en.json`, `pt-BR.json`, `pt-PT.json`

1. Traducir respetando el glosario técnico (sección anterior)
2. **pt-BR vs pt-PT** — diferencias clave a respetar:
   - "Equipe" (BR) vs "Equipa" (PT)
   - "Você" (BR) vs "Tu/Você" formal (PT)
   - Gerúndios: "queimando" (BR) vs "a queimar" (PT)
   - "Celular" (BR) vs "Telemóvel" (PT) — si aplica
   - Colocación de pronombres: "se quema" → "queima-se" (PT) vs "se queima" (BR)
3. Verificar coherencia: mismo término crypto = misma traducción en todo el archivo
4. Revisión gramatical completa por idioma

---

### Fase 4: Migrar componentes a `useTranslation()`
> **Archivos afectados:** Todos los 17 componentes con strings

Orden de migración (de menos a más complejo):

| Orden | Componente | Strings | Notas |
|-------|-----------|---------|-------|
| 1 | `Navbar.jsx` | 9 | Simple — links y botón |
| 2 | `HeroStory.jsx` | 8 | Simple — textos planos |
| 3 | `CallToAction.jsx` | 9 | Simple — CTA + badges |
| 4 | `Footer.jsx` | 18 | Simple — links y legal |
| 5 | `Features.jsx` | 15 | Simple — cards |
| 6 | `TokenIntro.jsx` | 16 | Pasos + stats |
| 7 | `BurnSimulator.jsx` | 18 | Interpolación de números |
| 8 | `DexDemo.jsx` | 24 | Tabs + interpolación |
| 9 | `StakingDemo.jsx` | 20 | Labels + timeline |
| 10 | `VestingTimeline.jsx` | 16 | Timeline + `<Trans>` |
| 11 | `EcommerceExperience.jsx` | 33 | Productos + flujos + `<Trans>` |
| 12 | `BurnCapJourney.jsx` | 25 | Fases + estados |
| 13 | `EcommerceBurnScale.jsx` | 16 | Plataformas + stats |
| 14 | `TokenDistribution.jsx` | 17 | Categorías |
| 15 | `Tokenomics.jsx` | 17 | Mecánicas |
| 16 | `Roadmap.jsx` | 42 | El más extenso |
| 17 | `index.html` | 4 | Meta tags + splash |

**Patrón de migración por componente:**
```jsx
// Antes
<h2>Un token que se quema</h2>

// Después
import { useTranslation } from 'react-i18next'

const { t } = useTranslation()
<h2>{t('burnSimulator.title')}</h2>

// Para JSX con markup
<Trans i18nKey="burnSimulator.description">
  No va a ninguna wallet — <strong>desaparece del supply total</strong>
</Trans>
```

---

### Fase 5: Selector de idioma en Navbar
> **Archivos afectados:** `src/components/LanguageSwitcher.jsx`, `Navbar.jsx`

1. Crear componente `LanguageSwitcher.jsx`:
   - 4 opciones con banderas/códigos: 🇪🇸 ES | 🇺🇸 EN | 🇧🇷 BR | 🇵🇹 PT
   - Dropdown compacto (DaisyUI `dropdown`)
   - Persiste selección en `localStorage`
   - Actualiza `document.documentElement.lang`
2. Integrar en `Navbar.jsx` junto al botón "Comprar Token"

---

### Fase 6: Manejo de index.html dinámico
> **Archivos afectados:** `index.html`, `main.jsx`

1. Actualizar `<html lang="">` dinámicamente al cambiar idioma
2. Actualizar `<meta name="description">` según idioma activo
3. Actualizar `<title>` si es necesario
4. Splash screen: texto "Cargando NX036" traducido vía JS inline (antes de que React monte)

---

### Fase 7: QA y validación
> **Sin archivos nuevos — revisión transversal**

1. Navegar cada sección en los 4 idiomas
2. Verificar que NO queden strings hardcodeadas sin traducir
3. Verificar interpolaciones con números (formatos: 1,000 vs 1.000)
4. Verificar que el layout no se rompa con textos más largos (DE/PT suelen ser ~20% más largos que ES)
5. Verificar que el `LanguageSwitcher` persiste tras recarga
6. Verificar `<html lang="">` correcto en cada idioma
7. Verificar meta tags para SEO en cada idioma

---

## Consideraciones adicionales

### Formato de números
- ES: `1.000.000` (punto como separador de miles)
- EN: `1,000,000` (coma como separador de miles)
- pt-BR: `1.000.000` (punto como separador de miles)
- pt-PT: `1.000.000` (punto como separador de miles)
- Usar `Intl.NumberFormat` con el locale activo

### SEO
- Cada idioma debe tener `<html lang="xx">` correcto
- Meta description traducida
- Considerar en el futuro: rutas con prefijo `/en/`, `/pt-br/` (fuera de alcance inicial)

### Hero.jsx
- Componente no utilizado actualmente (no se importa en `App.jsx`)
- Se traduce igualmente por completitud, marcado como baja prioridad

---

## Estimación de volumen

| Tarea | Cantidad |
|-------|----------|
| Strings a extraer | ~317 |
| Archivos de traducción | 4 (es, en, pt-BR, pt-PT) |
| Componentes a migrar | 17 |
| Componente nuevo | 1 (`LanguageSwitcher`) |
| Archivos a crear | 6 (`i18n/index.js` + 4 JSONs + `LanguageSwitcher.jsx`) |
| Archivos a modificar | 18 (17 componentes + `main.jsx`) |
