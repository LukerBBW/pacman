import MovingDirection from "/game/MovingDirection.js";

export default class Pacman {
    constructor(x, y, tileSize, velocity, tileMap) {

        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.currentMovingDirection = null;
        this.requestedMovingDirection = null

        this.pacmanRotation = this.Rotation.right;

        document.addEventListener("keydown", this.#keydown)

        this.#loadPacmanImages();

        this.pacmanAnimationTimerDefault = 10;
        this.pacmanAnimationTimer = null;

        this.madeFirstMove = false;

        this.wakaSound = new Audio("/sounds/waka.wav")
        this.powerDotSound = new Audio("/sounds/power_dot.wav")
        this.eatGhostSound = new Audio("/sounds/eat_ghost.wav")

        this.powerDotActive = false;
        this.powerDotAboutToExpire = false;

        this.timers = [];

        this.audioOff = false;
    }

    Rotation = {
        right: 0,
        down: 1,
        left: 2,
        up: 3
    }

    draw(ctx, pause, enemies) {
        if (!pause) {
            this.#animate()
            this.#move();
        }
        this.#eatDot();
        this.#eatPowerDot()
        this.#eatGhost(enemies);

        const size = this.tileSize / 2;

        ctx.save()
        ctx.translate(this.x + size, this.y + size);
        ctx.rotate((this.pacmanRotation * 90 * Math.PI) / 180);
        ctx.drawImage(this.pacmanImages[this.pacmanImagesIndex], -size, -size, this.tileSize, this.tileSize);
        ctx.restore();
    }

    #eatGhost(enemies) {

        if (this.powerDotActive){
            const collideEnemies = enemies.filter((enemy) => enemy.collideWith(this));
            collideEnemies.forEach((enemy) => {
                enemies.splice(enemies.indexOf(enemy), 1);
                let score = parseInt(localStorage.getItem("score")) + 100;
                localStorage.setItem("score", score.toString())

                setTimeout(() => {
                    enemies.push(enemy)
                }, 5000)
                if(!this.audioOff){
                    this.eatGhostSound.play()
                }
            })

        }
    }

    #loadPacmanImages() {
       const id= localStorage.getItem("skinId")
        const pacmanImage1 = new Image();
                pacmanImage1.src = "/images/skins/pacmanSkin"+id+"_0.png"

                const pacmanImage2 = new Image();
                pacmanImage2.src = "/images/skins/pacmanSkin"+id+"_1.png"

                const pacmanImage3 = new Image();
                pacmanImage3.src = "/images/skins/pacmanSkin"+id+"_2.png"

                const pacmanImage4 = new Image();
                pacmanImage4.src ="/images/skins/pacmanSkin"+id+"_1.png"
                this.pacmanImages = [pacmanImage1, pacmanImage2, pacmanImage3, pacmanImage4];



        this.pacmanImagesIndex = 0;
    }

    #keydown = (event) => {
        //Arrow up
        if (event.keyCode == 38) {
            if (this.currentMovingDirection === MovingDirection.down)
                this.currentMovingDirection = MovingDirection.up;
            this.requestedMovingDirection = MovingDirection.up;
            this.madeFirstMove = true;
        }
        //W
        if (event.keyCode == 87) {
            if (this.currentMovingDirection === MovingDirection.down)
                this.currentMovingDirection = MovingDirection.up;
            this.requestedMovingDirection = MovingDirection.up;
            this.madeFirstMove = true;
        }
        //Arrow down
        if (event.keyCode == 40) {
            if (this.currentMovingDirection === MovingDirection.up)
                this.currentMovingDirection = MovingDirection.down;
            this.requestedMovingDirection = MovingDirection.down;
            this.madeFirstMove = true;
        }
        //S
        if (event.keyCode == 83) {
            if (this.currentMovingDirection === MovingDirection.up)
                this.currentMovingDirection = MovingDirection.down;
            this.requestedMovingDirection = MovingDirection.down;
            this.madeFirstMove = true;
        }
        //Arrow left
        if (event.keyCode == 37) {
            if (this.currentMovingDirection === MovingDirection.right)
                this.currentMovingDirection = MovingDirection.left;
            this.requestedMovingDirection = MovingDirection.left;
            this.madeFirstMove = true;
        }
        //A
        if (event.keyCode == 65) {
            if (this.currentMovingDirection === MovingDirection.right)
                this.currentMovingDirection = MovingDirection.left;
            this.requestedMovingDirection = MovingDirection.left;
            this.madeFirstMove = true;
        }
        //Arrow right
        if (event.keyCode == 39) {
            if (this.currentMovingDirection === MovingDirection.left)
                this.currentMovingDirection = MovingDirection.right;
            this.requestedMovingDirection = MovingDirection.right;
            this.madeFirstMove = true;
        }
        //D
        if (event.keyCode == 68) {
            if (this.currentMovingDirection === MovingDirection.left)
                this.currentMovingDirection = MovingDirection.right;
            this.requestedMovingDirection = MovingDirection.right;
            this.madeFirstMove = true;
        }
    }

    #move() {
        if (Number.isInteger(this.x / this.tileSize) &&
            Number.isInteger(this.y / this.tileSize)) {

            if (!this.tileMap.didColliedWithEnvironment(
                this.x,
                this.y,
                this.requestedMovingDirection)) {
                this.currentMovingDirection = this.requestedMovingDirection;
            }
        }
        if (this.tileMap.didColliedWithEnvironment(
            this.x,
            this.y,
            this.currentMovingDirection)) {
            this.pacmanAnimationTimer = null;
            this.pacmanImagesIndex = 0;
            return;
        } else if (this.currentMovingDirection !== null && this.pacmanAnimationTimer === null) {
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
        }
        switch (this.currentMovingDirection) {
            case MovingDirection.up:
                this.y -= this.velocity;
                this.pacmanRotation = this.Rotation.up
                break;
            case MovingDirection.down:
                this.y += this.velocity;
                this.pacmanRotation = this.Rotation.down
                break;
            case MovingDirection.left:
                this.x -= this.velocity;
                this.pacmanRotation = this.Rotation.left
                break;

            case MovingDirection.right:
                this.x += this.velocity;
                this.pacmanRotation = this.Rotation.right
                break;
        }
    }

    #animate() {
        if (this.pacmanAnimationTimer === null) {
            return;
        }
        this.pacmanAnimationTimer--;
        if (this.pacmanAnimationTimer === 0) {
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault
            this.pacmanImagesIndex++;
            if (this.pacmanImagesIndex === this.pacmanImages.length) {
                this.pacmanImagesIndex = 0;
            }
        }
    }

    #eatDot() {

        if (this.tileMap.eatDot(this.x, this.y) && this.madeFirstMove) {
            if (!this.audioOff) {
                this.wakaSound.play()
            }
        }
    }

    #eatPowerDot() {
        if (this.tileMap.eatPowerDot(this.x, this.y)) {
            if (!this.audioOff) {
                this.powerDotSound.play()
            }
            this.powerDotActive = true;
            this.powerDotAboutToExpire = false;
            this.timers.forEach((timer) => clearTimeout(timer));
            this.timers = [];

            let powerDotTimer = setTimeout(() => {
                this.powerDotActive = false;
                this.powerDotAboutToExpire = false;
            }, 1000 * 6);

            this.timers.push(powerDotTimer);

            let powerDotAboutToExpireTimer = setTimeout(() => {
                this.powerDotAboutToExpire = true;
            }, 1000 * 3);

            this.timers.push(powerDotAboutToExpireTimer);
        }



    }
}