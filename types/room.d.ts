import { inherits } from 'node:util'

type RoomMemory = {
  sources: Source[]
}

export interface OwnedRoom extends Room {
  controller: StructureController
  find: Find
  memory: RoomMemory
  name: string
  storage: StructureStorage
  terminal: StructureTerminal
  visual: RoomVisual
}
