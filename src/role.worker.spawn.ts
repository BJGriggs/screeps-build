export function workerSpawn(spawnname: string): void {
    const newName = String(Game.time)
    console.log('Spawning new Worker: ' + newName)
    Game.spawns[spawnname].spawnCreep([WORK, CARRY, MOVE], newName, {
        memory: { role: 'Worker' },
    })
    return
}
