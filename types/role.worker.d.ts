import { Creep } from '@screep-types'

// All valid worker roles
export type WorkerRole = 'Worker' | 'Harvester' | 'Builder' | 'Upgrader'

// All valid worker tasks
export type WorkerTask =
  | 'None'
  | 'Harvest'
  | 'Storing'
  | 'Building'
  | 'Upgrading'

// All valid worker IDs
export type WorkerIDs =
  | Building.id
  | Source.id
  | Structure.id
  | ConstructionSite.id
  | Controller.id
  | Mineral.id
  | Deposit.id
  | ''

// Worker Memory
export interface WorkerMemory {
  role: WorkerRole
  task: WorkerTask
  taskId: WorkerIDs
  failedMoves: number
  failedTarget: WorkerIDs
}

// Worker Creep
export interface CreepWorker extends Creep {
  memory: WorkerMemory
  store: Creep.store
  room: Creep.room
  harvest: Creep.harvest
  move: Creep.move
  moveTo: Creep.moveTo
  transfer: Creep.transfer
  withdraw: Creep.withdraw
  build: Creep.build
  upgradeController: Creep.upgradeController
  repair: Creep.repair
  say: Creep.say
  pos: Creep.pos
}
