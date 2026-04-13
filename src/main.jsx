import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/index.js'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    // Force-dismiss splash so user isn't stuck on loading screen
    const splash = document.getElementById('splash')
    if (splash) { splash.classList.add('hide'); setTimeout(() => splash.remove(), 700) }
    console.error('[ErrorBoundary]', error, info.componentStack)
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', color: '#c0392b', background: '#fdf2f2', minHeight: '100vh' }}>
          <h2>Runtime error — check browser console</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 14 }}>{String(this.state.error)}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
