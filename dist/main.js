const { Worker } = require('role.worker');
const { SpawnControl } = require('main.spawn');
const { roomData } = require('room.sources');
const { roomPlan } = require('room.plan');
const filter = require('lodash');
const worker = new Worker();
const spawnControl = new SpawnControl();
module.exports.loop = function () {
    for (const name in Game.rooms) {
        const mySpawns = Game.rooms[name].find(FIND_MY_SPAWNS);
        const currentRoom = Game.rooms[name];
        if (currentRoom.memory.sources === undefined) {
            roomData(currentRoom);
        }
        mySpawns.forEach((mySpawn) => {
            spawnControl.weights(currentRoom, mySpawn.name);
            roomPlan.findExtension(currentRoom, mySpawn.name);
            // Frequency to execute worker logic
            if (worker.run()) {
                const units = filter(Game.creeps, (creep) => creep.memory.role == 'Worker');
                for (const unit of units) {
                    worker.exe(unit);
                }
            }
        });
    }
};
export {};
