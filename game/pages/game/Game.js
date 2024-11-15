import TileMap from "game/pages/game/TileMap.js";

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize, localStorage.getItem("selectedLvl"));
const unclockedLvls = localStorage.getItem("levels")
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);
const username = localStorage.getItem("username")

let gameOver = false;
let gameWin = false;

const nav = (path) => window.location.href = path;

function gameLoop() {
    tileMap.draw(ctx);
    drawGameEnd();
    pacman.draw(ctx, pause(), enemies);
    enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman, enemy.imageCount));
    checkGameOver();
    checkGameWin();
    document.getElementById("actualScore").innerHTML = "Your Score: " + localStorage.getItem("score")
}

function checkGameWin() {
    if (!gameWin) {
        gameWin = tileMap.didWin();
        if (gameWin) {

        }
    }
}

function checkGameOver() {
    if (!gameOver) {
        gameOver = isGameOver();
    }
}

function isGameOver() {
    return enemies.some(
        (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman)
    );
}

function pause() {
    return !pacman.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd() {
    if (gameOver) {
        if (!pacman.audioOff) {

        }
        localStorage.setItem("imgPath", "../../images/gameOver.png")
        nav("./endPage.html");

    } else if (gameWin) {
        if (!pacman.audioOff) {

            localStorage.setItem("imgPath", "../../images/winnerEnd.png")
            nav("./endPage.html");
        }

        localStorage.setItem("imgPath", "../../images/winnerEnd.png")

        if (Number(localStorage.getItem("selectedLvl")) === Number(unclockedLvls)) {
            localStorage.setItem("levels", Number(unclockedLvls) + 1)
            const response = fetch("http://localhost:8080/user");
            const data = response.json();
            user = data.find((userData) => userData.name === username);

            if (!user) {

                user = {
                    name: username,
                    totalHighscore: 0
                };
            }
            totalscore = user.totalHighscore;
            updateUser(user);


        }


    }

    function updateUser(user) {
        user.unlockedLevels = localStorage.getItem("levels")
        fetch("http://localhost:8080/user" + user.name, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(() => {
                nav("./endPage.html");
            })
    }
}


tileMap.setCanvasSize(canvas);

setInterval(gameLoop, 1000 / 75);

// import TileMap from "./TileMap.js";
//
// const tileSize = 32;
// const velocity = 2;
//
// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");
// const tileMap = new TileMap(tileSize, localStorage.getItem("selectedLvl"));
// const pacman = tileMap.getPacman(velocity);
// const enemies = tileMap.getEnemies(velocity);
//
// let gameOver = false;
// let gameWin = false;
// const gameOverSound = new Audio("../sound/gameOver.wav");
// const gameWinSound = new Audio("../sound/gameWin.wav");
//
// const nav = (path) => window.location.href = path;
//
// function gameLoop() {
//     tileMap.draw(ctx);
//     drawGameEnd();
//     pacman.draw(ctx, pause(), enemies);
//     enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman, enemy.imageCount));
//     checkGameOver();
//     checkGameWin();
//     document.getElementById("actualScore").innerHTML = "Your Score: " + localStorage.getItem("score")
// }
//
// function checkGameWin() {
//     if (!gameWin) {
//         gameWin = tileMap.didWin();
//         if (gameWin) {
//             if (!pacman.audioOff) {
//                 gameWinSound.play();
//             }
//
//         }
//     }
// }
//
// function checkGameOver() {
//     if (!gameOver) {
//         gameOver = isGameOver();
//     }
// }
//
// function isGameOver() {
//     return enemies.some(
//         (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman)
//     );
// }
//
// function pause() {
//     return !pacman.madeFirstMove || gameOver || gameWin;
// }

// function drawGameEnd() {
//     if (gameOver || gameWin) {
//         if (!pacman.audioOff) {
//             gameOverSound.play()
//         }
//         nav("./endPage.html");
//     }
// }
//
//
// tileMap.setCanvasSize(canvas);
// setInterval(gameLoop, 1000 / 75);