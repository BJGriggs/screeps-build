import { CreepWorker } from '@worker'

type StructureType = StructureContainer | StructureSpawn | StructureExtension

interface EnergyStructure extends Structure {
  store: StoreDefinition
}

export class Storage {
  assigned: number
  success: number[]
  advance: number[]
  terminate: number[]
  structuresList: string[]

  constructor() {
    this.assigned = 1
    this.success = [OK]
    this.advance = [ERR_NOT_IN_RANGE]
    this.terminate = [ERR_INVALID_TARGET, ERR_FULL, ERR_NOT_ENOUGH_RESOURCES]
    this.structuresList = [
      STRUCTURE_CONTAINER,
      STRUCTURE_SPAWN,
      STRUCTURE_EXTENSION,
    ]
  }

  exe(creep: CreepWorker, target: StructureType): void {
    const result = creep.transfer(target, RESOURCE_ENERGY)

    if (this.success.includes(result)) {
      return
    } else if (this.advance.includes(result)) {
      this.move(creep, target)
    } else if (this.terminate.includes(result)) {
      this.reset(creep)
    }
  }

  targets(creep: CreepWorker): StructureType[] {
    // Define local variables
    let targets: StructureType[] = []

    // Find all build locations in the room
    const storageLocations: StructureType[] = _.filter(
      creep.room.find(FIND_MY_STRUCTURES),
      (structure: EnergyStructure) =>
        this.structuresList.includes(structure.structureType) &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
    )

    // Add locations that are not already being targeted
    storageLocations.forEach((location: StructureType) => {
      if (
        _.filter(
          Game.creeps,
          (creep: CreepWorker) => creep.memory.taskId == location.id,
        ).length < this.assigned
      ) {
        targets.push(location)
      }
    })
    return targets
  }

  move(creep: CreepWorker, target: StructureType): void {
    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
  }

  set(creep: CreepWorker, locations: StructureType[]): void {
    creep.memory.task = 'Storing'
    creep.say('⚡ Storing')
    const target = creep.pos.findClosestByRange(locations)
    creep.memory.taskId = target.id
  }

  reset(creep: CreepWorker): void {
    creep.memory.task = 'None'
    creep.memory.taskId = ''
  }
}
