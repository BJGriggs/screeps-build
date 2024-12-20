function workerspawn(spawnname) {
    var newName = Game.time;
    console.log('Spawning new Worker: ' + newName);
    Game.spawns[spawnname].spawnCreep([WORK, CARRY, MOVE], newName,
        { memory: { role: 'Worker' } });
    return;
}
module.exports = workerspawn;