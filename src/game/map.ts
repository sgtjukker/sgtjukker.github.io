import { Entity, Position } from './types'

export const mapColumns = 16
export const mapRows = 10

export const blockedTiles = new Set([
  '0,0', '1,0', '2,0', '3,0', '4,0', '11,0', '12,0', '13,0', '14,0', '15,0',
  '0,1', '1,1', '2,1', '3,1', '12,1', '13,1', '14,1', '15,1',
  '0,2', '1,2', '2,2', '13,2', '14,2', '15,2',
  '0,3', '1,3', '14,3', '15,3',
  '0,4', '1,4', '14,4', '15,4',
  '0,5', '1,5', '14,5', '15,5',
  '0,6', '1,6', '14,6', '15,6',
  '0,7', '1,7', '14,7', '15,7',
  '0,8', '1,8', '2,8', '3,8', '12,8', '13,8', '14,8', '15,8',
  '0,9', '1,9', '2,9', '3,9', '4,9', '11,9', '12,9', '13,9', '14,9', '15,9',
  '5,1', '6,1', '7,1', '8,1', '9,1', '10,1',
  '4,3', '5,3', '10,3', '11,3',
  '4,4', '5,4', '10,4', '11,4',
  '4,5', '5,5', '10,5', '11,5',
  '4,6', '5,6', '10,6', '11,6',
  '4,7', '5,7', '10,7', '11,7',
])

export const entities: Entity[] = [
  { id: 'skills', kind: 'building', label: 'SKILLS', position: { x: 2, y: 3 }, interactionId: 'skills', accent: 'gold' },
  { id: 'xp', kind: 'building', label: 'XP', position: { x: 13, y: 3 }, interactionId: 'xp', accent: 'cyan' },
  { id: 'about', kind: 'building', label: 'ABOUT', position: { x: 2, y: 6 }, interactionId: 'about', accent: 'coral' },
  { id: 'contact', kind: 'building', label: 'CONTACT', position: { x: 13, y: 6 }, interactionId: 'contact', accent: 'cream' },
  { id: 'mira', kind: 'npc', label: 'MIRA', position: { x: 8, y: 4 }, interactionId: 'mira', accent: 'gold' },
  { id: 'notice', kind: 'sign', label: 'NOTICE', position: { x: 8, y: 6 }, interactionId: 'notice', accent: 'cyan' },
]

export const startingPosition: Position = { x: 8, y: 8 }

export const tileKey = (position: Position) => `${position.x},${position.y}`

export const isInsideMap = (position: Position) => (
  position.x >= 0 && position.x < mapColumns && position.y >= 0 && position.y < mapRows
)
