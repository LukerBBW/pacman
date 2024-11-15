import MovingDirection from "game/pages/game/MovingDirection.js";

export default class Enemy {
    constructor(x, y, tileSize, velocity, tileMap, imageCount) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap
        this.ghosts = []
        this.ghostCount = imageCount
        this.#loadImages();

        this.imageGhost = this.ghosts[this.ghostCount]

        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);

        this.directionTimerDefault = this.#random(1, 5)
        this.directionTimer = this.directionTimerDefault;

        this.scaredAboutToExpireTiemerDefault = 10;
        this.scaredAboutToExpireTiemer = this.scaredAboutToExpireTiemerDefault;

    }

    draw(ctx, pause, pacman, imageGhost) {

        if (!pause) {
            this.#move();
            this.#changeDirection();
        }

        this.#setImage(pacman, ctx, imageGhost);

    }

    #setImage(pacman, ctx) {
        if (pacman.powerDotActive) {
            this.#setImageWhenPowerDotIsActive(pacman);
        } else {
            this.imageGhost = this.ghosts[this.ghostCount];
        }
        ctx.drawImage(this.imageGhost, this.x, this.y, this.tileSize, this.tileSize)
    }

    #setImageWhenPowerDotIsActive(pacman) {
        if (pacman.powerDotAboutToExpire) {
            this.scaredAboutToExpireTiemer--;
            if (this.scaredAboutToExpireTiemer === 0) {
                this.scaredAboutToExpireTiemer = this.scaredAboutToExpireTiemerDefault;
                if (this.imageGhost === this.scaredGhost) {
                    this.imageGhost = this.scaredGhost2;

                } else {
                    this.imageGhost = this.scaredGhost
                }
            }
        } else  {
            this.imageGhost = this.scaredGhost
        }

    }

    #changeDirection() {
        this.directionTimer--;
        let newMoveDirection = null;

        if (this.directionTimer === 0) {
            this.directionTimer = this.directionTimerDefault;
            newMoveDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
        }

        if (newMoveDirection !== null && this.movingDirection !== newMoveDirection) {
            if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
                if (!this.tileMap.didColliedWithEnvironment(this.x, this.y, newMoveDirection)) {
                    this.movingDirection = newMoveDirection;
                }
            }
        }
    }

    #loadImages() {
        this.blueGhost = new Image();
        this.blueGhost.src = "../../images/orangeGhost.png"

        this.turkisGhost = new Image();
        this.turkisGhost.src = "../../images/blueGhost.png"

        this.pinkGhost = new Image();
        this.pinkGhost.src = "../../images/pinkGhost.png"

        this.redGhost = new Image();
        this.redGhost.src = "../../images/redGhost.png"

        this.ghosts.push(this.blueGhost)
        this.ghosts.push(this.turkisGhost)
        this.ghosts.push(this.pinkGhost)
        this.ghosts.push(this.redGhost)


        this.scaredGhost = new Image();
        this.scaredGhost.src = "../../images/scaredGhost.png"

        this.scaredGhost2 = new Image();
        this.scaredGhost2.src = "../../images/scaredGhost2.png"

    }

    #random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    #move() {
        if (!this.tileMap.didColliedWithEnvironment(this.x, this.y, this.movingDirection)) {
            switch (this.movingDirection) {
                case MovingDirection.up:
                    this.y -= this.velocity;
                    break;
                case MovingDirection.down:
                    this.y += this.velocity;
                    break;
                case MovingDirection.left:
                    this.x -= this.velocity;
                    break;
                case MovingDirection.right:
                    this.x += this.velocity;
                    break;

            }
        }
    }

    collideWith(pacman) {
        const size = this.tileSize / 2;
        if (
            this.x < pacman.x + size &&
            this.x + size > pacman.x &&
            this.y < pacman.y + size &&
            this.y + size > pacman.y
        ) {
            return true;
        } else {
            return false;
        }
    }
}