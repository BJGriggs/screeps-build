import { Worker } from 'role.worker'
import { SpawnControl } from 'main.spawn'
import { roomData } from 'room.sources'
import { roomPlan } from 'room.plan'
import { OwnedRoom } from '@room'
import { CreepWorker } from '@worker'
import _ from 'lodash'

const worker = new Worker()
const spawnControl = new SpawnControl()

module.exports.loop = function () {
  for (const name in Game.rooms) {
    const mySpawns = Game.rooms[name].find(FIND_MY_SPAWNS)
    const currentRoom: OwnedRoom = Game.rooms[name] as OwnedRoom

    if (currentRoom.memory.sources === undefined) {
      roomData(currentRoom)
    }

    mySpawns.forEach((mySpawn) => {
      spawnControl.weights(currentRoom, mySpawn.name)
      roomPlan.findExtension(currentRoom, mySpawn.name)

      // Frequency to execute worker logic
      if (worker.run()) {
        const units = _.filter(
          Game.creeps,
          (creep: any) => creep.memory.role == 'Worker',
        )
        for (const unit of units) {
          worker.exe(unit)
        }
      }
    })
  }
}
