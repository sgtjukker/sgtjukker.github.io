import { CSSProperties, useEffect, useState } from 'react'
import { profile } from './data/profile'

const navigation = [
  { label: 'Overview', href: '#overview' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.14 },
    )
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))
    return () => revealObserver.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#overview" onClick={closeMenu} aria-label="Joakim Månsson home">JM<span>.</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen((isOpen) => !isOpen)}><span /><span /></button>
        <nav id="main-navigation" className={`main-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navigation.map((item) => <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}</a>)}
          <a className="nav-cta" href={profile.cvUrl} download onClick={closeMenu}>Download CV <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
        <section className="hero section-pad" id="overview">
          <div className="hero-grid" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="status-dot" /> Available for a good conversation</p>
            <h1>Ideas in.<br /><em>Momentum</em> out.</h1>
            <p className="hero-summary">{profile.summary}</p>
            <div className="hero-actions"><a className="button button-primary" href="#contact">Let’s connect <span aria-hidden="true">↗</span></a><a className="text-link" href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn profile <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="hero-note reveal" style={{ '--delay': '180ms' } as CSSProperties}><span className="note-index">01 / 04</span><span>Based in<br /><strong>{profile.location}</strong></span></div>
          <div className="scroll-cue" aria-hidden="true">Scroll to explore <span>↓</span></div>
        </section>

        <section className="intro section-pad reveal"><p className="section-kicker">A little about me</p><div className="intro-layout"><h2>Useful work is<br /><span>beautiful work.</span></h2><p>I care about the space between a sharp idea and the moment it becomes real. That means asking better questions, making complexity feel lighter, and staying close to the people a solution is for.</p></div></section>

        <section className="skills-section section-pad" id="skills"><div className="section-heading reveal"><p className="section-kicker">02 / What I bring</p><h2>Skills that move<br /><span>things forward.</span></h2></div><div className="skills-list reveal" style={{ '--delay': '140ms' } as CSSProperties}>{profile.skills.map((skill, index) => <div className="skill-row" key={skill}><span>0{index + 1}</span><strong>{skill}</strong><i aria-hidden="true">↗</i></div>)}</div></section>

        <section className="experience-section section-pad" id="experience"><div className="section-heading reveal"><p className="section-kicker">03 / The journey</p><h2>Experience with<br /><span>room to grow.</span></h2></div><div className="timeline">{profile.experience.map((item) => <article className="timeline-item reveal" key={item.role}><p className="timeline-period">{item.period}</p><div><h3>{item.role}</h3><p className="timeline-company">{item.company}</p><p>{item.description}</p></div></article>)}</div><div className="education-row reveal"><p className="timeline-period">Education</p><div>{profile.education.map((item) => <div key={item.course}><h3>{item.course}</h3><p>{item.school}</p></div>)}</div></div></section>

        <section className="contact-section section-pad" id="contact"><div className="contact-card reveal"><p className="section-kicker">04 / Let’s talk</p><h2>Have something<br /><em>in mind?</em></h2><p>Whether it is a project, a question, or a hello, I would love to hear from you.</p><a className="button button-light" href={profile.linkedinUrl} target="_blank" rel="noreferrer">Say hello on LinkedIn <span aria-hidden="true">↗</span></a></div></section>
      </main>

      <footer className="site-footer"><span>© {new Date().getFullYear()} {profile.name}</span><a href="#overview">Back to top ↑</a><span>Made with intent.</span></footer>
    </div>
  )
}

export default App