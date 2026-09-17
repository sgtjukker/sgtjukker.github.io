import { blockedTiles, isInsideMap, tileKey } from './map'
import { Direction, Position } from './types'

const offsets: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

export const nextPosition = (position: Position, direction: Direction): Position => {
  const offset = offsets[direction]
  const candidate = { x: position.x + offset.x, y: position.y + offset.y }
  return isInsideMap(candidate) && !blockedTiles.has(tileKey(candidate)) ? candidate : position
}

export const directionForKey = (key: string): Direction | null => {
  const directions: Record<string, Direction> = {
    w: 'up',
    a: 'left',
    s: 'down',
    d: 'right',
  }
  return directions[key.toLowerCase()] ?? null
}
