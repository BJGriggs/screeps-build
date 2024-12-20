import { OwnedRoom } from "@room"
import _ from 'lodash'

export function roomData(roomObject: any): void {
  const locations = roomObject.find(FIND_SOURCES)

  roomObject.memory.sources = {}
  locations.forEach((location: Source) => {
    const openSlots = _.filter(
      roomObject.lookForAtArea(
        LOOK_TERRAIN,
        location.pos.y - 1,
        location.pos.x - 1,
        location.pos.y + 1,
        location.pos.x + 1,
        true,
      ),
      (result) => result.terrain == 'plain',
    ).length
    console.log(`${openSlots}`)
    roomObject.memory.sources[location.id] = openSlots
    console.log(JSON.stringify(roomObject.memory.sources))
  })
}
