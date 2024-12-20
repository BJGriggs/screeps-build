const Worker = require('role.worker');
const worker = new Worker();
const SpawnControll = require('main.spawn');
const spawnControll = new SpawnControll();
const roomData = require('room.sources');
var roomPlan = require('room.plan');

module.exports.loop = function () {

    for (const name in Game.rooms) {
        const mySpawns = Game.rooms[name].find(FIND_MY_SPAWNS);
        const currentRoom = Game.rooms[name];


        if (currentRoom.memory.sources === undefined) {
            roomData(currentRoom);
        }

        mySpawns.forEach((mySpawn) => {
            spawnControll.weights(currentRoom, mySpawn.name);
            roomPlan.findExtension(currentRoom, mySpawn.name);

            // Frequency to excute worker logic
            if (worker.run()) {
                const units = _.filter(Game.creeps, (creep) => creep.memory.role == 'Worker');
                for (const unit of units) {
                    worker.exe(unit);
                }
            }

        });
    }
}