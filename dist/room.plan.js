export class roomPlan {
    static getxspawnloc(roomSpawn) {
        return Game.spawns[roomSpawn].pos.x;
    }
    static getyspawnloc(roomSpawn) {
        return Game.spawns[roomSpawn].pos.y;
    }
    static placeextension(roomName, x, y) {
        Game.rooms[roomName.name].createConstructionSite(x, y, STRUCTURE_EXTENSION);
    }
    static findExtension(roomName, roomSpawn) {
        var x = roomPlan.getxspawnloc(roomSpawn);
        var y = roomPlan.getyspawnloc(roomSpawn);
        if (roomName['controller'] === undefined) {
            return;
        }
        if (roomName.controller.level >= 2) {
            for (var i = 2; 10 >= i; i = i + 2) {
                roomPlan.placeextension(roomName, x, y + i);
            }
        }
        if (roomName.controller.level >= 3) {
            for (var i = 2; 10 >= i; i = i + 2) {
                roomPlan.placeextension(roomName, x, y - i);
            }
        }
        if (roomName.controller.level >= 4) {
            for (var i = 2; 10 >= i; i = i + 2) {
                roomPlan.placeextension(roomName, x + i, y);
                roomPlan.placeextension(roomName, x - i, y);
            }
        }
    }
}
