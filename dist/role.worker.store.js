const filter = require('lodash');
export class Storage {
    constructor() {
        this.assigned = 1;
        this.success = [OK];
        this.advance = [ERR_NOT_IN_RANGE];
        this.terminate = [ERR_INVALID_TARGET, ERR_FULL, ERR_NOT_ENOUGH_RESOURCES];
        this.structuresList = [
            STRUCTURE_CONTAINER,
            STRUCTURE_SPAWN,
            STRUCTURE_EXTENSION,
        ];
    }
    exe(creep, target) {
        const result = creep.transfer(target, RESOURCE_ENERGY);
        if (this.success.includes(result)) {
            return;
        }
        else if (this.advance.includes(result)) {
            this.move(creep, target);
        }
        else if (this.terminate.includes(result)) {
            this.reset(creep);
        }
    }
    targets(creep) {
        // Define local variables
        let targets = [];
        // Find all build locations in the room
        const storageLocations = filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => this.structuresList.includes(structure.structureType) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        // Add locations that are not already being targeted
        storageLocations.forEach((location) => {
            if (filter(Game.creeps, (creep) => creep.memory.taskId == location.id).length < this.assigned) {
                targets.push(location);
            }
        });
        return targets;
    }
    move(creep, target) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
    }
    set(creep, locations) {
        creep.memory.task = 'Storing';
        creep.say('⚡ Storing');
        const target = creep.pos.findClosestByRange(locations);
        creep.memory.taskId = target.id;
    }
    reset(creep) {
        creep.memory.task = 'None';
        creep.memory.taskId = '';
    }
}
