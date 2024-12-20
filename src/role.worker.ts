// Local imports
import { Harvest } from 'role.worker.harvest'
import { Storage } from 'role.worker.store'
import { Build } from 'role.worker.build'
import { Upgrade } from 'role.worker.upgrade'

// Type imports
import { CreepWorker } from '@worker'

export class Worker {
  frequency: number
  harvest: Harvest
  store: Storage
  build: Build
  upgrade: Upgrade

  constructor() {
    this.frequency = 1
    this.harvest = new Harvest()
    this.store = new Storage()
    this.build = new Build()
    this.upgrade = new Upgrade()
  }

  run(): boolean {
    if (Game.time % this.frequency === 0) {
      return true
    } else {
      return false
    }
  }

  exe(creep: CreepWorker): void {
    const task = creep.memory.task
    const target = Game.getObjectById(creep.memory.taskId)

    switch (task) {
      case 'None':
        this.logic(creep)
        break
      case 'Harvest':
        this.harvest.exe(creep, target)
        break
      case 'Storing':
        this.store.exe(creep, target)
        break
      case 'Building':
        this.build.exe(creep, target)
        break
      case 'Upgrading':
        this.upgrade.exe(creep, target)
        break
      default:
        creep.memory.task = 'None'
        creep.memory.taskId = ''
        this.logic(creep)
    }
  }

  logic(creep: CreepWorker): void {
    const energyTargets = this.harvest.targets(creep)
    if (energyTargets.length > 0) {
      this.harvest.set(creep, energyTargets)
      return
    }

    const storageTargets = this.store.targets(creep)
    if (storageTargets.length > 0) {
      this.store.set(creep, storageTargets)
      return
    }

    const buildTargets = this.build.targets(creep)
    if (buildTargets.length > 0) {
      this.build.set(creep, buildTargets)
      return
    }

    const upgradeTargets = this.upgrade.targets(creep)
    if (upgradeTargets.length > 0) {
      this.upgrade.set(creep, upgradeTargets)
      return
    }
  }
}
