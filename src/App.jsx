import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import ParallaxBackground from './components/ParallaxBackground.jsx'
import HeroStory from './components/HeroStory.jsx'
import EcommerceBurnScale from './components/EcommerceBurnScale.jsx'
import TokenIntro from './components/TokenIntro.jsx'
import BurnSimulator from './components/BurnSimulator.jsx'
import DexDemo from './components/DexDemo.jsx'
import EcommerceExperience from './components/EcommerceExperience.jsx'
import StakingDemo from './components/StakingDemo.jsx'
import VestingTimeline from './components/VestingTimeline.jsx'
import BurnCapJourney from './components/BurnCapJourney.jsx'
import TokenDistribution from './components/TokenDistribution.jsx'
import Roadmap from './components/Roadmap.jsx'
import CallToAction from './components/CallToAction.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const splash = document.getElementById('splash')
      if (splash) splash.classList.add('hide')
      setReady(true)
      setTimeout(() => splash?.remove(), 700)
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ParallaxBackground />
      <Navbar />
      <HeroStory />
      <TokenIntro />
      <div id="burn"><BurnSimulator /></div>
      <EcommerceBurnScale />
      <div id="dex"><DexDemo /></div>
      <div id="ecommerce"><EcommerceExperience /></div>
      <div id="staking"><StakingDemo /></div>
      <div id="vesting"><VestingTimeline /></div>
      <BurnCapJourney />
      <TokenDistribution />
      <div id="roadmap"><Roadmap /></div>
      <div id="cta"><CallToAction /></div>
      <Footer />
    </>
  )
}

export default App
