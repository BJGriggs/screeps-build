export class roomPlan {
  static getxspawnloc(roomSpawn: string): number {
    return Game.spawns[roomSpawn].pos.x
  }

  static getyspawnloc(roomSpawn: string): number {
    return Game.spawns[roomSpawn].pos.y
  }

  static placeextension(roomName: Room, x: number, y: number): void {
    Game.rooms[roomName.name].createConstructionSite(x, y, STRUCTURE_EXTENSION)
  }

  static findExtension(roomName: Room, roomSpawn: string): void {
    var x = roomPlan.getxspawnloc(roomSpawn)
    var y = roomPlan.getyspawnloc(roomSpawn)

    if (roomName['controller'] === undefined) {
      return
    }

    if (roomName.controller.level >= 2) {
      for (var i = 2; 10 >= i; i = i + 2) {
        roomPlan.placeextension(roomName, x, y + i)
      }
    }

    if (roomName.controller.level >= 3) {
      for (var i = 2; 10 >= i; i = i + 2) {
        roomPlan.placeextension(roomName, x, y - i)
      }
    }

    if (roomName.controller.level >= 4) {
      for (var i = 2; 10 >= i; i = i + 2) {
        roomPlan.placeextension(roomName, x + i, y)
        roomPlan.placeextension(roomName, x - i, y)
      }
    }
  }
}
