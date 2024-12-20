import { CreepWorker, WorkerIDs } from '@worker'
const filter = require('lodash')

class Build {
  assigned: number
  success: number[]
  advance: number[]
  terminate: number[]

  constructor() {
    this.assigned = 1
    this.success = [OK]
    this.advance = [ERR_NOT_IN_RANGE]
    this.terminate = [ERR_INVALID_TARGET, ERR_NOT_ENOUGH_RESOURCES]
  }

  exe(creep: CreepWorker, target: WorkerIDs): void {
    const result = creep.build(target)

    if (this.success.includes(result)) {
      return
    } else if (this.advance.includes(result)) {
      this.move(creep, target)
    } else if (this.terminate.includes(result)) {
      this.reset(creep)
    }
  }

  targets(creep: CreepWorker): ConstructionSite[] {
    // Define local variables
    let targets: ConstructionSite[] = []

    // Find all build locations in the room
    const buildLocations = creep.room.find(FIND_CONSTRUCTION_SITES)

    // Add locations that are not already being targeted
    buildLocations.forEach((location: ConstructionSite) => {
      if (
        filter(
          Game.creeps,
          (creep: any) => creep.memory.taskId == location.id,
        ).length < this.assigned
      ) {
        targets.push(location)
      }
    })

    return targets
  }

  move(creep: CreepWorker, target: ConstructionSite): void {
    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
  }

  set(creep: CreepWorker, locations: ConstructionSite[]): void {
    creep.memory.task = 'Building'
    creep.say('🚧 Building')
    const target = creep.pos.findClosestByRange(locations)
    creep.memory.taskId = target.id
  }

  reset(creep: CreepWorker): void {
    creep.memory.task = 'None'
    creep.memory.taskId = ''
  }
}

module.exports = { Build }
