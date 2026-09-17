export type Direction = 'up' | 'down' | 'left' | 'right'

export type Position = {
  x: number
  y: number
}

export type EntityKind = 'building' | 'npc' | 'sign'

export type Entity = {
  id: string
  kind: EntityKind
  label: string
  position: Position
  interactionId: string
  accent: 'gold' | 'cyan' | 'coral' | 'cream'
}
