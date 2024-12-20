var roomPlan = new Object;

roomPlan.getxspawnloc = function (roomSpawn) {
    return Game.spawns[roomSpawn].pos.x;
}

roomPlan.getyspawnloc = function (roomSpawn) {
    return Game.spawns[roomSpawn].pos.y;
}

roomPlan.placeextension = function (roomName, x, y) {
    Game.rooms[roomName.name].createConstructionSite(x, y, STRUCTURE_EXTENSION);
}

roomPlan.findExtension = function (roomName, roomSpawn) {
    var x = roomPlan.getxspawnloc(roomSpawn);
    var y = roomPlan.getyspawnloc(roomSpawn);

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

module.exports = roomPlan;