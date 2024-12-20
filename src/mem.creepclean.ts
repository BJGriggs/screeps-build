function memCreepClean() {
  for (var i in Memory.creeps) {
    if (!Game.creeps[i]) {
      delete Memory.creeps[i]
    }
  }

  console.log('Creep Memory Cleaning...')
}

module.exports = { memCreepClean }
