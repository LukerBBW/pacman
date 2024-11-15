import Pacman from "./Pacman.js"
import MovingDirection from "./MovingDirection.js";
import Enemy from "./Enemy.js"

export default class TileMap {
    constructor(tileSize, level) {

        this.tileSize = tileSize;

        this.yellowDot = new Image();
        this.yellowDot.src = "/images/yellowDot.png";

        this.wall = new Image();
        this.wall.src = "/images/bricks.png";

        this.level = level;

        this.wallUp = new Image();
        this.wallUp.src = "/images/wallUp.png";

        this.wallSide = new Image();
        this.wallSide.src = "/images/wallSide.png";

        this.wallRightUp = new Image();
        this.wallRightUp.src = "/images/wallRightUp.png";

        this.wallRight = new Image();
        this.wallRight.src = "/images/wallRight.png";

        this.wallLeftUp = new Image();
        this.wallLeftUp.src = "/images/wallLeftUp.png";

        this.wallLeft = new Image();
        this.wallLeft.src = "/images/wallLeft.png";

        this.wallBackUp = new Image();
        this.wallBackUp.src = "/images/wallBackUp.png";

        this.wallBackRight = new Image();
        this.wallBackRight.src = "/images/wallBackRight.png";

        this.wallBackLeft = new Image();
        this.wallBackLeft.src = "/images/wallBackLeft.png";

        this.wallBackDown = new Image();
        this.wallBackDown.src = "/images/wallBackDown.png"

        this.wallLeftDownRight = new Image();
        this.wallLeftDownRight.src = "/images/wallLeftDownRight.png"

        this.wallBlock = new Image();
        this.wallBlock.src = "/images/wallBlock.png"


        this.pinkDot = new Image();
        this.pinkDot.src = "/images/pinkDot.png"

        this.powerDot = this.pinkDot;
        this.powerDotAnimationTimerDefault = 30;
        this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;

        this.score = -10;

        this.redGhost = new Image();
        this.redGhost.src = "/images/redGhost.png"

        this.blueGhost = new Image();
        this.blueGhost.src = "/images/orangeGhost.png"

        this.pinkGhost = new Image();
        this.pinkGhost.src = "/images/pinkGhost.png"

        this.turkisGhost = new Image();
        this.turkisGhost.src = "/images/blueGhost.png"
    }

    // 0 - dot
    // 4 - pacman
    //5  empty space
    //6 enemy
    //7 - power dot

    //10 - wallUp
    //15 - WallSide
    //11 - wallRight
    //12 - WallLeft
    //13 - WallLeftUp
    //14 - WallRightUp
    //16 - WallBackDown
    //17 - WallBackUp
    //18 - WallBackRight
    //19 - WallBackLeft
    //20 - WallLeftDownRight
    level1 = [
        [

            [11, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 12],
            [10, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 10],
            [10, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 15, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 19, 0, 0, 0, 0, 0, 21, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 16, 0, 18, 15, 20, 15, 19, 0, 11, 15, 15, 19, 0, 0, 0, 0, 18, 15, 15, 12, 0, 11, 15, 15, 12, 0, 18, 15, 15, 12, 0, 18, 15, 15, 12, 0, 10],
            [10, 0, 10, 0, 0, 0, 10, 8, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 10, 5, 5, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 10],
            [10, 0, 10, 7, 0, 0, 10, 0, 0, 0, 10, 6, 0, 0, 0, 0, 0, 0, 0, 0, 8, 10, 0, 10, 5, 5, 10, 0, 7, 0, 0, 10, 0, 0, 0, 3, 10, 0, 10],
            [10, 0, 10, 0, 0, 0, 10, 0, 0, 0, 14, 15, 15, 12, 0, 18, 19, 0, 11, 15, 15, 13, 0, 10, 5, 5, 10, 0, 11, 15, 15, 13, 0, 11, 15, 15, 13, 0, 10],
            [10, 0, 10, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 5, 5, 10, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10],
            [10, 0, 10, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 5, 5, 10, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10],
            [10, 0, 17, 0, 0, 0, 17, 0, 0, 0, 18, 15, 15, 13, 0, 21, 0, 0, 14, 15, 15, 19, 0, 14, 15, 15, 13, 0, 14, 15, 15, 19, 0, 14, 15, 15, 19, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 0, 18, 15, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 0, 7, 2, 0, 0, 0, 0, 0, 0, 0, 3, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 13]

        ],
        [
            [11, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 12],
            [10, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 18, 15, 15, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 15, 15, 19, 0, 10],
            [10, 0, 0, 0, 7, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 0, 0, 0, 10],
            [10, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 15, 15, 15, 15, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 18, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 19, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 10],
            [10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10],
            [10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 11, 19, 0, 0, 18, 12, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10],
            [10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 3, 8, 6, 8, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10],
            [10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 2, 3, 2, 6, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10],
            [10, 0, 0, 16, 0, 10, 0, 0, 0, 0, 14, 15, 15, 15, 15, 13, 0, 0, 0, 0, 10, 0, 16, 0, 0, 10],
            [10, 0, 0, 10, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 10, 0, 0, 10],
            [10, 0, 0, 10, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 10, 0, 0, 10],
            [10, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 10],
            [10, 0, 7, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 0, 10],
            [10, 0, 18, 13, 0, 0, 0, 0, 0, 0, 18, 15, 20, 20, 15, 19, 0, 0, 0, 0, 0, 0, 14, 19, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 10, 10, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 10],
            [10, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 10],
            [10, 0, 0, 10, 7, 0, 0, 0, 0, 0, 0, 0, 14, 13, 0, 0, 0, 0, 0, 0, 0, 7, 10, 0, 0, 10],
            [10, 0, 0, 14, 15, 15, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 15, 15, 13, 0, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 13]
        ],
        [
            [11, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 12],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 8, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 2, 0, 10],
            [10, 0, 18, 13, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 14, 19, 0, 10],
            [10, 0, 0, 0, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0, 0, 10],
            [10, 0, 18, 15, 15, 13, 0, 10, 0, 10, 0, 10, 0, 10, 0, 14, 15, 15, 19, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 18, 15, 15, 15, 15, 13, 0, 10, 0, 10, 0, 14, 15, 15, 15, 15, 19, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 7, 10, 0, 10, 7, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 18, 15, 15, 15, 15, 15, 15, 13, 0, 14, 15, 15, 15, 15, 15, 15, 19, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 18, 15, 15, 15, 15, 15, 15, 12, 0, 11, 15, 15, 15, 15, 15, 15, 19, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 7, 10, 0, 10, 7, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 18, 15, 15, 15, 15, 12, 0, 10, 0, 10, 0, 11, 15, 15, 15, 15, 19, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 18, 15, 15, 12, 0, 10, 0, 10, 0, 10, 0, 10, 0, 11, 15, 15, 19, 0, 10],
            [10, 0, 0, 0, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0, 0, 10],
            [10, 0, 18, 12, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 11, 19, 0, 10],
            [10, 0, 6, 17, 0, 17, 0, 17, 0, 17, 0, 17, 0, 17, 0, 17, 0, 17, 3, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 13]


        ],
        [
            [11, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 12],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 11, 15, 15, 15, 15, 15, 15, 15, 15, 19, 0, 0, 0, 18, 15, 15, 12, 0, 10],
            [10, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 10],
            [10, 0, 10, 0, 11, 15, 15, 15, 15, 15, 15, 12, 0, 0, 0, 0, 0, 2, 10, 0, 10],
            [10, 0, 10, 0, 10, 5, 5, 5, 5, 5, 5, 10, 0, 0, 0, 18, 15, 15, 13, 0, 10],
            [10, 0, 10, 0, 14, 15, 15, 15, 15, 15, 15, 13, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 17, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 10],
            [10, 0, 4, 0, 11, 15, 15, 15, 15, 15, 15, 19, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 16, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 15, 15, 12, 0, 10],
            [10, 0, 10, 0, 10, 0, 11, 15, 15, 15, 19, 0, 0, 0, 0, 0, 0, 0, 10, 0, 10],
            [10, 0, 10, 0, 10, 0, 10, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 10, 0, 10],
            [10, 0, 10, 0, 10, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 18, 15, 15, 13, 0, 10],
            [10, 0, 10, 0, 10, 0, 14, 15, 15, 15, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 10, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 17, 0, 14, 15, 15, 15, 15, 15, 15, 15, 19, 0, 0, 0, 0, 0, 0, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 12, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 13, 0, 10],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
            [14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 13]
        ]
    ]

    setCanvasSize(canvas) {
        canvas.width = this.level1[this.level][0].length * this.tileSize;
        canvas.height = this.level1[this.level].length * this.tileSize;
    }

    draw(ctx) {

        for (let row = 0; row < this.level1[this.level].length; row++) {
            for (let column = 0; column < this.level1[this.level][row].length; column++) {
                let tile = this.level1[this.level][row][column];
                if (tile >= 10) {
                    //# = private method
                    this.#drawWall(ctx, column, row, this.tileSize, tile)
                } else if (tile === 0) {
                    this.#drawDot(ctx, column, row, this.tileSize)
                } else if (tile === 7) {
                    this.#drawPowerDot(ctx, column, row, this.tileSize);
                } else {
                    this.#drawBlank(ctx, column, row, this.tileSize)
                }
            }
        }

    }

    #drawWall(ctx, column, row, size, tile) {

        if (tile === 10) {
            ctx.drawImage(
                this.wallUp,
                column * this.tileSize,
                row * this.tileSize,
                size,
                size
            )
        } else if (tile === 11) {
            ctx.drawImage(
                this.wallRight,
                column * this.tileSize,
                row * this.tileSize,
                size,
                size
            )
        } else if (tile === 12) {
            ctx.drawImage(
                this.wallLeft,
                column * this.tileSize,
                row * this.tileSize,
                size,
                size
            )
        } else if (tile === 13) {
            ctx.drawImage(
                this.wallLeftUp,
                column * this.tileSize,
                row * this.tileSize,
                size,
                size
            )
        } else if (tile === 14) {
            ctx.drawImage(
                this.wallRightUp,
                column * this.tileSize,
                row * this.tileSize,
                size,
                size
            )
        } else if (tile === 15) {
            ctx.drawImage(
                this.wallSide,
                column * this.tileSize,
                row * this.tileSize,
                size,
                size
            )
        } else if (tile === 16) {
            ctx.drawImage(
                this.wallBackDown,
                column * this.tileSize,
                row * this.tileSize,
                size,
                size
            )
        } else if (tile === 17) {
            ctx.drawImage(
                this.wallBackUp,
                column * this.tileSize,
                row * this.tileSize,
                size,
                size
            )
        } else if (tile === 18) {
            ctx.drawImage(
                this.wallBackRight,
                column * this.tileSize,
                row * this.tileSize,
                size,
                size
            )
        } else if (tile === 19) {
            ctx.drawImage(
                this.wallBackLeft,
                column * this.tileSize,
                row * this.tileSize,
                size,
                size
            )
        } else if (tile === 20) {
            ctx.drawImage(
                this.wallLeftDownRight,
                column * this.tileSize,
                row * this.tileSize,
                size,
                size
            )
        } else if (tile === 21) {
            ctx.drawImage(
                this.wallBlock,
                column * this.tileSize,
                row * this.tileSize,
                size,
                size
            )
        }


    }

    #drawPowerDot(ctx, column, row) {
        this.powerDotAnimationTimer--;
        if (this.powerDotAnimationTimer === 0) {
            this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
            if (this.powerDot === this.pinkDot) {
                this.powerDot = this.yellowDot;
            } else {
                this.powerDot = this.pinkDot
            }
        }
        ctx.drawImage(
            this.powerDot,
            column * this.tileSize,
            row * this.tileSize,
        )
    }

    #drawBlank(ctx, column, row, size) {
        ctx.fillStyle = 'black'
        ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size)
    }

    #drawDot(ctx, column, row, size) {
        ctx.drawImage(
            this.yellowDot,
            column * this.tileSize,
            row * this.tileSize,
            size,
            size
        )
    }

    getPacman(velocity) {
        for (let row = 0; row < this.level1[this.level].length; row++) {
            for (let column = 0; column < this.level1[this.level][row].length; column++) {
                let tile = this.level1[this.level][row][column];
                if (tile === 4) {
                    this.level1[this.level][row][column] = 0
                    return new Pacman(column * this.tileSize,
                        row * this.tileSize,
                        this.tileSize,
                        velocity,
                        this);
                }
            }
        }
    }

    didColliedWithEnvironment(x, y, direction) {

        if (direction === null) {
            return;
        }

        if (Number.isInteger(x / this.tileSize) && Number.isInteger(y / this.tileSize)) {


            let column = 0;
            let row = 0;
            let nextColumn = 0;
            let nextRow = 0;

            switch (direction) {
                case MovingDirection.right:
                    nextColumn = x + this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize
                    break;
                case MovingDirection.left:
                    nextColumn = x - this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize
                    break;
                case MovingDirection.up:
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
                case MovingDirection.down:
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
            }
            const tile = this.level1[this.level][row][column];
            if (tile === 10 ||
                tile === 11 ||
                tile === 12 ||
                tile === 13 ||
                tile === 14 ||
                tile === 15 ||
                tile === 16 ||
                tile === 17 ||
                tile === 18 ||
                tile === 19 ||
                tile === 20 ||
                tile === 21) {
                return true;
            }

        }
        return false
    }

    eatDot(x, y) {
        const row = y / this.tileSize;
        const column = x / this.tileSize;

        if (Number.isInteger(row) && Number.isInteger(column)) {
            if (this.level1[this.level][row][column] === 0) {
                this.level1[this.level][row][column] = 5
                this.score = this.score + 10;
                localStorage.setItem("score", this.score.toString())
                return true;
            }
        }
        return false;
    }

    getEnemies(velocity) {
        const enemies = [];

        for (let row = 0; row < this.level1[this.level].length; row++) {
            for (let column = 0; column < this.level1[this.level][row].length; column++) {
                const tile = this.level1[this.level][row][column];
                if (tile === 6) {
                    this.level1[this.level][row][column] = 0;
                    enemies.push(new Enemy(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this, 0))
                } else if (tile === 2) {
                    this.level1[this.level][row][column] = 0;
                    enemies.push(new Enemy(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this, 1))
                } else if (tile === 3) {
                    this.level1[this.level][row][column] = 0;
                    enemies.push(new Enemy(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this, 2))
                } else if (tile === 8) {
                    this.level1[this.level][row][column] = 0;
                    enemies.push(new Enemy(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this, 3))
                }
            }

        }
        return enemies;
    }

    eatPowerDot(x, y) {
        const row = y / this.tileSize;
        const column = x / this.tileSize;

        if (Number.isInteger(row) && Number.isInteger(column)) {
            const tile = this.level1[this.level][row][column]
            if (tile === 7) {
                this.level1[this.level][row][column] = 5
                return true;
            }
        }
        return false;
    }

    #dotsLeft() {
        return this.level1[this.level].flat().filter((tile) => tile === 0).length
    }

    didWin() {
        return this.#dotsLeft() === 0;
    }
}