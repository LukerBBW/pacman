const thisScore = localStorage.getItem("score");
const username = localStorage.getItem("username");
const optionsDiv = document.getElementById("gameOver");
const buttons = optionsDiv.querySelectorAll("div h2");
let totalscore = 0;
const gameOverSound = new Audio("/sounds/gameOver.wav");
const gameWinSound = new Audio("/sounds/gameWin.wav")


let user;

let selected = 1;

const pic = document.getElementById("pic")
pic.setAttribute("src", localStorage.getItem("imgPath"))

if (localStorage.getItem("imgPath") === "/images/winnerEnd.png") {
    //play win sound
    gameWinSound.play()
} else {
    //play lose sound
    gameOverSound.play();

}

getUsers();

async function getUsers() {

    const totalScoreFromStorage = localStorage.getItem("totalScore")


    localStorage.setItem("totalScore", Number(totalScoreFromStorage) + Number(thisScore))
    updateScore();

}

async function updateScore() {
    const existingData = JSON.parse(localStorage.getItem("ScoreBoardData")); // Bestehendes Array holen, oder leeres Array falls keins vorhanden ist

    // Den richtigen Benutzer im Array finden und den Score aktualisieren
    existingData.forEach(user => {
        if (user.username === username) {
            user.score += Number(thisScore); // Score des richtigen Benutzers aktualisieren
        }
    });

    localStorage.setItem("ScoreBoardData", JSON.stringify(existingData)); // Aktualisiertes Array mit dem neuen Score im localStorage speichern
}

document.getElementById("scoreId").innerHTML += thisScore;

document.getElementById("totalScoreId").innerHTML += localStorage.getItem("totalScore");

const updateButtonStyle = () => {
    buttons.forEach((button, index) => {
        if (index + 1 === selected) {
            button.classList.add("selected-text");
        } else {
            button.classList.remove("selected-text");
        }
    });
};

updateButtonStyle();
const inputHandler = (key) => {
    if (key === "s" || key === "ArrowDown") {
        selected = Math.min(selected + 1, 2);
    } else if (key === "w" || key === "ArrowUp") {
        selected = Math.max(selected - 1, 1);
    } else if (key === "Enter" || key === " " || key === "e" || key === "r") {
        // Überprüfen, welche Option ausgewählt wurde
        if (selected === 1) {
            window.location.href = "/game/index.html";
        } else if (selected === 2) {
            window.location.href = "/";
        }
    }
    // Nach der Verarbeitung des Tastendrucks aktualisiere den Style der ausgewählten Option
    updateButtonStyle();
};

document.addEventListener("keydown", (e) => {
    inputHandler(e.key);
}, true);
