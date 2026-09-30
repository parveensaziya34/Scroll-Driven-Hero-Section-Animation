import React, { useLayoutEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { value: '58%', label: 'Increase in pick up point use', tone: 'lime' },
  { value: '23%', label: 'Decreased in customer phone calls', tone: 'blue' },
  { value: '27%', label: 'Increase in pick up point use', tone: 'dark' },
  { value: '40%', label: 'Decreased in customer phone calls', tone: 'coral' },
]

function App() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .from('.topline', { y: 14, opacity: 0, duration: 0.6 })
        .from('.hero-title .title-line', { y: 52, opacity: 0, duration: 0.8, stagger: 0.12 }, '-=0.25')
        .from('.metric', { y: 20, opacity: 0, duration: 0.55, stagger: 0.1 }, '-=0.35')
        .from('.scroll-cue', { opacity: 0, duration: 0.4 }, '-=0.25')

      const car = document.querySelector('.car-image')
      const road = document.querySelector('.road')
      const scene = document.querySelector('.story')
      const getTravel = () => Math.max(0, road.clientWidth - car.getBoundingClientRect().width - 24)

      gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: () => `top+=${window.innerHeight} top`,
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
        .to('.car-image', { x: getTravel, ease: 'none', duration: 1 }, 0)
        .to('.road-trail', { scaleX: 1, ease: 'none', duration: 1 }, 0)
        .fromTo('.road-word span', { opacity: 0.2 }, { opacity: 1, stagger: 0.025, ease: 'none', duration: 0.72 }, 0.04)
        .fromTo('.scroll-stat', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, ease: 'power1.out', duration: 0.16 }, 0.18)
        .fromTo('.finish-note', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.15 }, 0.82)
    }, pageRef)

    return () => context.revert()
  }, [])

  return (
    <main ref={pageRef} className="min-h-screen">
      <section className="story" aria-label="ITZFIZZ delivery results">
        <div className="hero-frame">
          <header className="topline">
            <a className="brand" href="#home" aria-label="ITZFIZZ home">itz<span>fizz</span><i>.</i></a>
            <span className="topline-note">THE LAST MILE, MADE BETTER</span>
            <a className="contact-link" href="mailto:hello@itzfizz.com">LET’S TALK <span aria-hidden="true">↗</span></a>
          </header>

          <div className="hero-copy" id="home">
            <p className="kicker"><span className="kicker-dot" /> DELIVERY THAT MOVES PEOPLE</p>
            <h1 className="hero-title" aria-label="Welcome to ITZFIZZ">
              <span className="title-line">WELCOME</span>
              <span className="title-line title-second">TO <em>ITZFIZZ</em></span>
            </h1>
            <p className="hero-description">A small change in the journey.<br />A big difference at the doorstep.</p>
          </div>

          <div className="metrics" aria-label="Customer results">
            {metrics.map((metric, index) => (
              <div className={`metric metric-${metric.tone}`} key={metric.value}>
                <span className="metric-index">0{index + 1}</span>
                <strong>{metric.value}</strong>
                <span className="metric-label">{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="scroll-cue"><span className="cue-line" /> SCROLL TO FOLLOW THE CHANGE <span className="cue-arrow">↓</span></div>
          <div className="hero-coordinate">51°30'26.4"N&nbsp; 00°07'39.6"W</div>
        </div>

        <div className="journey-frame" aria-label="Scroll-driven delivery story">
          <div className="journey-heading">
            <p className="kicker"><span className="kicker-dot" /> THE COLLECTION EFFECT</p>
            <p className="journey-caption">One better handoff<br />changes the whole route.</p>
          </div>

          <div className="road" aria-hidden="true">
            <div className="road-grid" />
            <div className="road-word" aria-hidden="true">
              {'WELCOME ITZFIZZ'.split('').map((letter, index) => (
                <span key={`${letter}-${index}`} className={letter === ' ' ? 'word-gap' : ''}>{letter}</span>
              ))}
            </div>
            <div className="road-trail" />
            <img
              className="car-image"
              src="https://paraschaturvedi.github.io/car-scroll-animation/McLaren%20720S%202022%20top%20view.png"
              alt=""
              draggable="false"
            />
          </div>

          <div className="scroll-stats" aria-label="Delivery results">
            {metrics.map((metric, index) => (
              <div className={`scroll-stat scroll-stat-${index + 1} scroll-stat-${metric.tone}`} key={`scroll-${metric.value}-${index}`}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="journey-footer"><span>LESS WAITING. MORE LIVING.</span><span>ITZFIZZ® &nbsp; / &nbsp; 2026</span></div>
          <div className="finish-note">THAT’S THE ITZFIZZ EFFECT <span>↗</span></div>
        </div>
      </section>

      <footer className="page-footer flex items-center justify-between">
        <a className="brand footer-brand" href="#home">itz<span>fizz</span><i>.</i></a>
        <p>Good things are closer than you think.</p>
        <a href="mailto:hello@itzfizz.com">MAKE YOUR NEXT MOVE <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)