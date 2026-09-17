import { CSSProperties, useEffect, useState } from 'react'
import { profile } from './data/profile'
import { entities, mapColumns, mapRows, startingPosition } from './game/map'
import { directionForKey, nextPosition } from './game/movement'
import { Direction, Entity, Position } from './game/types'

type Screen = 'title' | 'village'
type PanelId = 'skills' | 'xp' | 'about' | 'contact' | null
type DialogueId = 'mira' | 'notice' | null

const directionOffsets: Record<Direction, Position> = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } }
const directionSymbols: Record<Direction, string> = { up: '^', down: 'v', left: '<', right: '>' }

const getFrontEntity = (position: Position, direction: Direction): Entity | undefined => {
  const offset = directionOffsets[direction]
  const target = { x: position.x + offset.x, y: position.y + offset.y }
  return entities.find((entity) => entity.position.x === target.x && entity.position.y === target.y)
}

function App() {
  const [screen, setScreen] = useState<Screen>('title')
  const [position, setPosition] = useState<Position>(startingPosition)
  const [direction, setDirection] = useState<Direction>('up')
  const [panel, setPanel] = useState<PanelId>(null)
  const [dialogue, setDialogue] = useState<DialogueId>(null)
  const [titleReady, setTitleReady] = useState(false)

  useEffect(() => {
    const promptTimer = window.setTimeout(() => setTitleReady(true), 2600)
    const startTimer = window.setTimeout(() => setScreen('village'), 5200)
    return () => {
      window.clearTimeout(promptTimer)
      window.clearTimeout(startTimer)
    }
  }, [])

  useEffect(() => {
    const begin = () => {
      setScreen('village')
      setTitleReady(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (screen === 'title') {
        if (event.key === 'Enter') { event.preventDefault(); begin() }
        return
      }
      if (event.key === 'Escape') { setPanel(null); setDialogue(null); return }
      if (panel || dialogue) return
      const movement = directionForKey(event.key)
      if (movement && !event.repeat) {
        event.preventDefault()
        setDirection(movement)
        setPosition((currentPosition) => nextPosition(currentPosition, movement))
        return
      }
      if (event.code === 'Space') {
        event.preventDefault()
        const entity = getFrontEntity(position, direction)
        if (!entity) return
        if (entity.kind === 'npc' || entity.kind === 'sign') setDialogue(entity.interactionId as DialogueId)
        if (entity.kind === 'building') setPanel(entity.interactionId as PanelId)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [direction, dialogue, panel, position, screen])

  const move = (movement: Direction) => {
    if (panel || dialogue) return
    setDirection(movement)
    setPosition((currentPosition) => nextPosition(currentPosition, movement))
  }

  if (screen === 'title') return <main className="title-screen" onClick={() => setScreen('village')}>
    <div className="title-sky" aria-hidden="true"><span className="title-moon" /><span className="title-cloud cloud-one" /><span className="title-cloud cloud-two" /></div>
    <div className="title-copy"><p className="title-overline">A personal quest by Joakim Månsson</p><h1>THE<br /><span>WORKING</span><br />VILLAGE</h1><p className="title-subtitle">A small world of useful skills, hard-earned XP, and good conversations.</p><button className={`start-prompt ${titleReady ? 'is-ready' : ''}`} type="button" onClick={() => setScreen('village')}>[ ENTER ] <span>{titleReady ? 'or wait' : 'to begin'}</span></button></div>
    <p className="title-foot">PRESS ENTER TO START <span>•</span> VERSION 01.00</p>
  </main>

  return <main className="game-shell">
    <header className="game-header"><div><span className="brand-mark">JM</span><span className="header-divider" />THE WORKING VILLAGE</div><div className="header-status"><span className="status-light" /> QUEST LOG <strong>01</strong></div></header>
    <section className="game-layout"><div className="game-column"><div className="scene-frame"><div className="scene" role="application" aria-label="The Working Village. Use W, A, S, D to move and Space to interact." tabIndex={0}>
      <div className="map-grid" style={{ '--columns': mapColumns, '--rows': mapRows } as CSSProperties}>
        {Array.from({ length: mapColumns * mapRows }, (_, index) => { const x = index % mapColumns; const y = Math.floor(index / mapColumns); const isPath = (x >= 6 && x <= 9) || (y >= 4 && y <= 5); const isWater = x === 15 || (x === 14 && y > 2 && y < 8); return <span className={`map-tile ${isPath ? 'is-path' : ''} ${isWater ? 'is-water' : ''}`} key={`${x}-${y}`} /> })}
        <span className="map-road-mark road-horizontal" /><span className="map-road-mark road-vertical" />
        {entities.map((entity) => <div className={`map-entity entity-${entity.kind} accent-${entity.accent}`} key={entity.id} style={{ '--x': entity.position.x, '--y': entity.position.y } as CSSProperties}>{entity.kind === 'building' && <><span className="building-roof" /><span className="building-door" /><strong>{entity.label}</strong></>}{entity.kind === 'npc' && <><span className="npc-hat" /><span className="npc-body" /><strong>{entity.label}</strong></>}{entity.kind === 'sign' && <><span className="sign-post" /><span className="sign-board" /><strong>{entity.label}</strong></>}</div>)}
        <div className={`player facing-${direction}`} style={{ '--x': position.x, '--y': position.y } as CSSProperties} aria-label="Player character"><span className="player-shadow" /><span className="player-body" /><span className="player-face">{directionSymbols[direction]}</span></div>
      </div>
    </div><div className="scene-caption"><span>WASD MOVE</span><span>SPACE SELECT</span><span>ESC CLOSE</span></div></div>
    <div className="mobile-controls" aria-label="Movement controls"><button type="button" aria-label="Move up" onClick={() => move('up')}>▲</button><div><button type="button" aria-label="Move left" onClick={() => move('left')}>◀</button><button type="button" aria-label="Interact" onClick={() => { const entity = getFrontEntity(position, direction); if (entity?.kind === 'building') setPanel(entity.interactionId as PanelId); if (entity && entity.kind !== 'building') setDialogue(entity.interactionId as DialogueId) }}>●</button><button type="button" aria-label="Move right" onClick={() => move('right')}>▶</button></div><button type="button" aria-label="Move down" onClick={() => move('down')}>▼</button></div></div>
    <aside className="quest-panel"><div className="quest-heading"><span>FIELD NOTES</span><span>JMN / 01</span></div><h2>Explore the<br /><em>village.</em></h2><p className="quest-copy">Four doors. One curious mind. Walk up to a sign, villager, or building and press Space.</p><div className="quest-list">{entities.filter((entity) => entity.kind === 'building').map((entity, index) => <div className="quest-item" key={entity.id}><span className={`quest-dot accent-${entity.accent}`} /><span>{String(index + 1).padStart(2, '0')}</span><strong>{entity.label}</strong><small>LOCKED IN PLAIN SIGHT</small></div>)}</div><div className="quest-footer"><span>LOCATION</span><strong>SWEDEN / HOME BASE</strong></div></aside></section>
    {(panel || dialogue) && <div className="overlay" role="dialog" aria-modal="true" onClick={() => { setPanel(null); setDialogue(null) }}><div className="info-window" onClick={(event) => event.stopPropagation()}><button className="close-window" type="button" onClick={() => { setPanel(null); setDialogue(null) }} aria-label="Close window">×</button>{panel && <PanelContent panel={panel} />}{dialogue && <DialogueContent dialogue={dialogue} />}</div></div>}
  </main>
}

function PanelContent({ panel }: { panel: Exclude<PanelId, null> }) {
  if (panel === 'skills') return <><p className="window-kicker">SKILLS ARCHIVE / 01</p><h2>What I bring<br /><em>to the party.</em></h2><div className="skill-grid">{profile.skills.map((skill, index) => <div className="skill-card" key={skill}><span>0{index + 1}</span><strong>{skill}</strong><i>{['CORE', 'CORE', 'TOOLS', 'QUEST', 'PARTY', 'CORE'][index]}</i></div>)}</div></>
  if (panel === 'xp') return <><p className="window-kicker">EXPERIENCE POINTS / 02</p><h2>The journey<br /><em>so far.</em></h2><div className="xp-list">{profile.experience.map((item) => <article key={item.role}><span>{item.period}</span><div><h3>{item.role}</h3><strong>{item.company}</strong><p>{item.description}</p></div></article>)}{profile.education.map((item) => <article key={item.course}><span>{item.period}</span><div><h3>{item.course}</h3><strong>{item.school}</strong><p>Every chapter adds another useful tool to the inventory.</p></div></article>)}</div></>
  if (panel === 'about') return <><p className="window-kicker">VILLAGE ARCHIVES / 03</p><h2>Meet<br /><em>Joakim.</em></h2><p className="window-lead">{profile.summary}</p><div className="about-stats"><span><small>HOME BASE</small><strong>{profile.location}</strong></span><span><small>CLASS</small><strong>{profile.title}</strong></span></div></>
  return <><p className="window-kicker">SIGNAL FIRE / 04</p><h2>Say<br /><em>hello.</em></h2><p className="window-lead">A project, a question, or simply a good conversation. The gate is open.</p><div className="window-actions"><a href={profile.linkedinUrl} target="_blank" rel="noreferrer">OPEN LINKEDIN ↗</a><a href={profile.cvUrl} download>DOWNLOAD CV ↓</a></div></>
}

function DialogueContent({ dialogue }: { dialogue: Exclude<DialogueId, null> }) {
  if (dialogue === 'notice') return <><p className="window-kicker">A WEATHERED SIGN</p><h2>Welcome to<br /><em>the village.</em></h2><p className="window-lead">The paths are short, but there is plenty to discover. Every door opens onto a different chapter.</p><p className="dialogue-tip">TIP: WALK UP TO THE COLOURED BUILDINGS TO INSPECT THEM.</p></>
  return <><p className="window-kicker">MIRA / VILLAGE GUIDE</p><h2>“Keep asking<br /><em>better questions.”</em></h2><p className="window-lead">That is Joakim's favourite tool. It turns a foggy problem into a path forward, one thoughtful step at a time.</p><p className="dialogue-tip">MIRA GIVES YOU 10 XP FOR LISTENING.</p></>
}

export default App
