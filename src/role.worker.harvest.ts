// Type imports
import { CreepWorker, WorkerIDs } from '@worker'

export class Harvest {
    assigned: number
    success: number[]
    advance: number[]
    failedMove: number[]
    failedMovesAllowed: number

    constructor() {
        this.assigned = 2
        this.success = [OK]
        this.advance = [ERR_NOT_IN_RANGE]
        this.failedMove = [ERR_NO_PATH]
        this.failedMovesAllowed = 2
    }

    exe(creep: CreepWorker, target: WorkerIDs): void {
        if (
            creep.store.getUsedCapacity(RESOURCE_ENERGY) >=
            creep.store.getCapacity(RESOURCE_ENERGY)
        ) {
            this.reset(creep)
            return
        }

        const result = creep.harvest(target)

        if (this.success.includes(result)) {
            return
        } else if (this.advance.includes(result)) {
            this.move(creep, target)
        }
    }

    targets(creep: CreepWorker): Source[] {
        // Define local variables
        let targets: Source[] = []

        // If the creep has more than 25% Energy ignore harvesting
        if (
            creep.store.getUsedCapacity(RESOURCE_ENERGY) >
            creep.store.getCapacity(RESOURCE_ENERGY) * 0.25
        ) {
            return targets
        }

        // Find all energy locations in the room
        const energyLocations = creep.room.find(FIND_SOURCES)

        // Add locations that are not already being targeted
        energyLocations.forEach((location: Source) => {
            // Check for hostiles
            if (
                _.filter(location.pos.findInRange(FIND_HOSTILE_CREEPS, 4)).length != 0
            ) {
                return
            }
            // Check to see if a failed target is the current location
            if (creep.memory.failedTarget === location.id) {
                return
            }
            // Check to make sure there are no more than two workers
            //if (_.filter(Game.creeps, (creep) =>
            //    creep.memory.taskId == location.id).length < this.assigned) {
            //    targets.push(location);
            if (
                _.filter(
                    Game.creeps,
                    (creep: CreepWorker) => creep.memory.taskId == location.id,
                ).length < creep.room.memory.sources[location.id]
            ) {
                targets.push(location)
            }
        })

        return targets
    }

    move(creep: CreepWorker, target: Source): void {
        const moveResult = creep.moveTo(target, {
            visualizePathStyle: { stroke: '#ffffff' },
        })

        // Check for if move failed or not
        if (this.failedMove.includes(moveResult)) {
            creep.memory.failedMoves++
        }

        if (creep.memory.failedMoves == this.failedMovesAllowed) {
            creep.memory.failedTarget = creep.memory.taskId
            this.reset(creep)
        }
    }

    set(creep: CreepWorker, locations: Source[]): void {
        creep.memory.task = 'Harvest'
        creep.say('🔄 Harvest')
        const target = creep.pos.findClosestByRange(locations)
        creep.memory.taskId = target.id
        creep.memory.failedMoves = 0
        creep.memory.failedTarget = ''
    }

    reset(creep: CreepWorker): void {
        creep.memory.task = 'None'
        creep.memory.taskId = ''
    }
}
