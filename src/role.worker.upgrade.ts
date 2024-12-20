import { CreepWorker } from '@worker'

export class Upgrade {
  success: number[]
  advance: number[]
  terminate: number[]

  constructor() {
    this.success = [OK]
    this.advance = [ERR_NOT_IN_RANGE]
    this.terminate = [ERR_INVALID_TARGET, ERR_NOT_ENOUGH_RESOURCES]
  }

  exe(creep: CreepWorker, target: StructureController): void {
    const result = creep.upgradeController(target)

    if (this.success.includes(result)) {
      return
    } else if (this.advance.includes(result)) {
      this.move(creep, target)
    } else if (this.terminate.includes(result)) {
      this.reset(creep)
    }
  }

  targets(creep: CreepWorker): StructureController[] {
    return [creep.room.controller]
  }

  move(creep: CreepWorker, target: StructureController): void {
    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
  }

  set(creep: CreepWorker, locations: StructureController[]): void {
    creep.memory.task = 'Upgrading'
    creep.say('⚡ Upgrade')
    const target = creep.pos.findClosestByRange(locations)
    creep.memory.taskId = target.id
  }

  reset(creep: CreepWorker): void {
    creep.memory.task = 'None'
    creep.memory.taskId = ''
  }
}

module.exports = { Upgrade }
