import '@room'
const _ = require('lodash')

export class Extension {
    topRange: number
    botRange: number
    leftRange: number
    rightRange: number

    constructor() {
        this.topRange = 3
        this.botRange = 3
        this.leftRange = 3
        this.rightRange = 3
    }

    place(roomObject: Room, x: number, y: number) {
        roomObject.createConstructionSite(x, y, STRUCTURE_EXTENSION)
    }

    findLocation(roomObject: RoomObject) {
        const yTopValues = [roomObject.pos.y]
        const yBotValues = [roomObject.pos.y]
        const xLeftValues = [roomObject.pos.x]
        const xRightValues = [roomObject.pos.x]

        //while (0 < yTopValues.slice(-1)) {
        //    for (let i = 1, i <= yTopValues.length, i++) {
        //
        //   }
        //    yTopValues.push(yTopValues.slice(-1) - 3);
        //}
        //cordCheck = check(roomObject, xLeftValues.slice(-1), yTopValues.slice(-1));
        //yBotValues.push(yMinValues.slice(-1) + 3);
        //xLeftValues.push(xLeftValues.slice(-1) - 3);
        //xRightValues.push(xRightValues.slice(-1) + 3);
    }

    check(roomObject: Room, x: number, y: number) {
        const yMax = y + this.topRange
        const yMin = y - this.botRange
        const xMax = x + this.rightRange
        const xMin = x - this.leftRange

        const structureResults = roomObject.lookForAtArea(
            LOOK_STRUCTURES,
            y + this.topRange,
            x - this.leftRange,
            y - this.botRange,
            x + this.rightRange,
            true,
        )
        if (structureResults.length) {
            return false
        }

        const terrainResults = _.filter(
            roomObject.lookForAtArea(LOOK_TERRAIN, yMax, xMin, yMin, xMax, true),
            (result: { terrain: string }) => result.terrain != 'plain',
        )
        if (terrainResults.length) {
            return false
        }

        return true
    }
}
